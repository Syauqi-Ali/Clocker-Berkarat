use warp::{Filter, Rejection, Reply};
use diesel::prelude::*;
use serde_json::{json, Value};
use std::collections::HashMap;
use crate::models::users::{NewUser, User};
use crate::repository::users::{create_user, get_user_by_id, update_user, get_all_users};
use crate::establish_connection;
use crate::validation::{validate, Validation};

pub async fn add_user(new_user: NewUser) -> Result<impl Reply, Rejection> {
    let validation_rules = [
        Validation {
            key: "first_name",
            rules: vec!["string", "max:50", "required"],
            messages: None,
        },
        Validation {
            key: "email",
            rules: vec!["email", "required", "unique:email"],
            messages: None,
        },
        Validation {
            key: "gender",
            rules: vec!["required", "enum:male,female"],
            messages: Some(&[
                ("enum", "Gender must be male or female"),
            ]),
        },
    ];

    let json_value = serde_json::to_value(&new_user).unwrap_or_else(|_| json!({}));
    let json_object = match json_value.as_object() {
        Some(obj) => obj,
        None => return Ok(warp::reply::json(&json!({ "error": "Invalid JSON structure" }))),
    };

    let data: HashMap<String, String> = json_object
        .iter()
        .map(|(k, v)| (k.clone(), v.as_str().unwrap_or("").to_string()))
        .collect();

    match validate(&data, &validation_rules) {
        Ok(_) => {
            let mut conn = establish_connection();
            match create_user(&mut conn, new_user) {
                Ok(user) => Ok(warp::reply::json(&user)),
                Err(_) => Ok(warp::reply::json(&json!({"error": "Gagal menambahkan user"}))),
            }
        }
        Err(errors) => Ok(warp::reply::json(&json!({"errors": errors}))),
    }
}


pub async fn update_user_handler(user_id: i32, updated_user: NewUser) -> Result<impl Reply, Rejection> {
    let validation_rules = [
        Validation {
            key: "first_name",
            rules: vec!["string", "max:50", "required"],
            messages: None,
        },
        Validation {
            key: "email",
            rules: vec!["email", "required", "unique:email"],
            messages: None,
        },
        Validation {
            key: "gender",
            rules: vec!["required", "enum:male,female"],
            messages: Some(&[
                ("enum", "Gender must be male or female"),
            ]),
        },
    ];

    let json_value = serde_json::to_value(&updated_user).unwrap_or_else(|_| json!({}));
    let json_object = match json_value.as_object() {
        Some(obj) => obj,
        None => return Ok(warp::reply::json(&json!({ "error": "Invalid JSON structure" }))),
    };

    let data: HashMap<String, String> = json_object
        .iter()
        .map(|(k, v)| (k.clone(), v.as_str().unwrap_or("").to_string()))
        .collect();

    match validate(&data, &validation_rules) {
        Ok(_) => {
            let mut conn = establish_connection();
            match update_user(&mut conn, user_id, updated_user) {
                Ok(user) => Ok(warp::reply::json(&user)),
                Err(_) => Ok(warp::reply::json(&json!({"error": "Gagal mengupdate user"}))),
            }
        }
        Err(errors) => Ok(warp::reply::json(&json!({"errors": errors}))),
    }
}

pub async fn get_user(user_id: i32) -> Result<impl Reply, Rejection> {
    let mut conn = establish_connection();
    match get_user_by_id(&mut conn, user_id) {
        Ok(user) => Ok(warp::reply::json(&user)),
        Err(_) => Ok(warp::reply::json(&json!({"error": "User tidak ditemukan"}))),
    }
}

pub async fn get_users() -> Result<impl Reply, Rejection> {
    let mut conn = establish_connection();
    match get_all_users(&mut conn) {
        Ok(user) => Ok(warp::reply::json(&user)),
        Err(_) => Ok(warp::reply::json(&json!({"error": "User tidak ditemukan"}))),
    }
}