use std::collections::HashMap;
use regex::Regex;
use chrono::NaiveDate;
use diesel::prelude::*;
use diesel::sql_query;
use diesel::sql_types::BigInt;
use crate::establish_connection;

pub struct Validation {
    pub key: &'static str,
    pub rules: Vec<&'static str>,
    pub messages: Option<&'static [(&'static str, &'static str)]>,
}

pub fn validate(data: &HashMap<String, String>, rules: &[Validation]) -> Result<(), HashMap<String, String>> {
    let mut errors = HashMap::new();

    for rule in rules {
        let value = data.get(rule.key);

        if value.is_none() && !rule.rules.contains(&"nullable") {
            errors.insert(rule.key.to_string(), get_message(rule.messages, "required", "Field is required"));
            continue;
        }

        if let Some(value) = value {
            for &r in &rule.rules {
                if let Some(error) = apply_rule(value, r, rule.messages) {
                    errors.insert(rule.key.to_string(), error);
                    break;
                }
            }
        }
    }

    if errors.is_empty() {
        Ok(())
    } else {
        Err(errors)
    }
}

fn apply_rule(value: &str, rule: &str, messages: Option<&[(&str, &str)]>) -> Option<String> {
    match rule {
        "string" if !value.chars().all(|c| c.is_alphabetic() || c.is_whitespace()) => {
            Some(get_message(messages, "string", "Must be a valid string"))
        }
        "email" if !Regex::new(r"^[\w\.-]+@[\w\.-]+\.\w+$").unwrap().is_match(value) => {
            Some(get_message(messages, "email", "Invalid email format"))
        }
        "date" if NaiveDate::parse_from_str(value, "%Y-%m-%d").is_err() => {
            Some(get_message(messages, "date", "Invalid date format (YYYY-MM-DD)"))
        }
        "integer" if value.parse::<i32>().is_err() => {
            Some(get_message(messages, "integer", "Must be an integer"))
        }
        "required" if value.trim().is_empty() => {
            Some(get_message(messages, "required", "Field cannot be empty"))
        }
        r if r.starts_with("max:") => apply_max_rule(value, r, messages),
        r if r.starts_with("min:") => apply_min_rule(value, r, messages),
        r if r.starts_with("unique:") => {
            r.strip_prefix("unique:").map_or(None, |column| {
                (!is_unique("users", column, value)).then(|| get_message(messages, "unique", "Already taken"))
            })
        }
        r if r.starts_with("enum:") => {
            let allowed_values: Vec<&str> = r["enum:".len()..].split(',').collect();
            (!allowed_values.contains(&value)).then(|| get_message(messages, "enum", "Invalid value for enum"))
        }
        _ => None,
    }
}

fn apply_max_rule(value: &str, rule: &str, messages: Option<&[(&str, &str)]>) -> Option<String> {
    rule.strip_prefix("max:").and_then(|max| max.parse::<usize>().ok()).and_then(|max| {
        if let Ok(num) = value.parse::<i32>() {
            (num > max as i32).then(|| get_message(messages, "max", &format!("Value must not exceed {}", max)))
        } else {
            (value.len() > max).then(|| get_message(messages, "max", &format!("Exceeds maximum length of {}", max)))
        }
    })
}

fn apply_min_rule(value: &str, rule: &str, messages: Option<&[(&str, &str)]>) -> Option<String> {
    rule.strip_prefix("min:").and_then(|min| min.parse::<usize>().ok()).and_then(|min| {
        if let Ok(num) = value.parse::<i32>() {
            (num < min as i32).then(|| get_message(messages, "min", &format!("Value must be at least {}", min)))
        } else {
            (value.len() < min).then(|| get_message(messages, "min", &format!("Must be at least {} characters", min)))
        }
    })
}

fn get_message(messages: Option<&[(&str, &str)]>, key: &str, default: &str) -> String {
    messages
        .and_then(|m| m.iter().find_map(|&(k, v)| (k == key).then_some(v)))
        .unwrap_or(default)
        .to_string()
}

#[derive(QueryableByName)]
struct CountResult {
    #[diesel(sql_type = BigInt)]
    count: i64,
}

pub fn is_unique(table: &str, column: &str, value: &str) -> bool {
    let mut conn = establish_connection();
    let query = format!("SELECT COUNT(*) as count FROM `{}` WHERE `{}` = ?", table, column);

    sql_query(query)
        .bind::<diesel::sql_types::Text, _>(value)
        .get_result::<CountResult>(&mut conn)
        .map_or(true, |row| row.count == 0)
}
