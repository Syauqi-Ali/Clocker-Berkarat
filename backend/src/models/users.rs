use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;

#[derive(Queryable, Identifiable, Serialize, Debug)]
#[diesel(table_name = crate::schema::users)]
pub struct User {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub avatar: Option<String>,
    pub email: String,
    pub phone: Option<String>,
    pub gender: Option<String>,
    pub status_acount_register: Option<String>,
    pub address: Option<String>,
    pub birthday: Option<chrono::NaiveDate>,
    pub password: String,
    pub role: String,
    pub email_verified_at: Option<NaiveDateTime>,
    pub self_description: Option<String>,
    pub tarif: Option<i64>,
    pub portofolio: Option<String>,
    pub google_id: Option<String>,
    pub status: Option<String>,
    pub status_login: Option<String>,
    pub skills: Option<String>,
    pub country: String,
    pub goal: String,
    pub job: Option<String>,
    pub about_user: Option<String>,
    pub experience: String,
    pub remember_token: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser {
    pub first_name: String,
    pub email: String,
    pub gender: Option<String>,
}
