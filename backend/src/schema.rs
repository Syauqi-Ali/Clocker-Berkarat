// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersCountryEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersExperienceEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersGenderEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersGoalEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersJobEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersSkillsEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersStatusAcountRegisterEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersStatusEnum;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(mysql_type(name = "Enum"))]
    pub struct UsersStatusLoginEnum;
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::UsersGenderEnum;
    use super::sql_types::UsersStatusAcountRegisterEnum;
    use super::sql_types::UsersStatusEnum;
    use super::sql_types::UsersStatusLoginEnum;
    use super::sql_types::UsersSkillsEnum;
    use super::sql_types::UsersCountryEnum;
    use super::sql_types::UsersGoalEnum;
    use super::sql_types::UsersJobEnum;
    use super::sql_types::UsersExperienceEnum;

    users (id) {
        id -> Integer,
        #[max_length = 255]
        first_name -> Varchar,
        #[max_length = 255]
        last_name -> Varchar,
        avatar -> Nullable<Text>,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 15]
        phone -> Nullable<Varchar>,
        #[max_length = 6]
        gender -> Nullable<Varchar>,
        #[max_length = 8]
        status_acount_register -> Nullable<Varchar>,
        #[max_length = 255]
        address -> Nullable<Varchar>,
        birthday -> Nullable<Date>,
        #[max_length = 255]
        password -> Varchar,
        #[max_length = 255]
        role -> Varchar,
        email_verified_at -> Nullable<Timestamp>,
        self_description -> Nullable<Text>,
        tarif -> Nullable<Bigint>,
        #[max_length = 255]
        portofolio -> Nullable<Varchar>,
        #[max_length = 255]
        google_id -> Nullable<Varchar>,
        #[max_length = 6]
        status -> Nullable<Varchar>,
        #[max_length = 7]
        status_login -> Nullable<Varchar>,
        #[max_length = 10]
        skills -> Nullable<Varchar>,
        #[max_length = 5]
        country -> Varchar,
        #[max_length = 10]
        goal -> Varchar,
        #[max_length = 9]
        job -> Nullable<Varchar>,
        #[max_length = 255]
        about_user -> Nullable<Varchar>,
        #[max_length = 10]
        experience -> Varchar,
        #[max_length = 100]
        remember_token -> Nullable<Varchar>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}
