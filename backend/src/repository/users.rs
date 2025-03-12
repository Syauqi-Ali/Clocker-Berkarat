use diesel::prelude::*;
use crate::models::users::{NewUser, User};
use crate::schema::users;

pub fn create_user(conn: &mut MysqlConnection, new_user: NewUser) -> QueryResult<User> {
    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(conn)?;
    
    users::table.order(users::id.desc()).first(conn)
}

pub fn get_user_by_id(conn: &mut MysqlConnection, user_id: i32) -> QueryResult<User> {
    users::table.find(user_id).first(conn)
}

pub fn update_user(conn: &mut MysqlConnection, user_id: i32, updated_user: NewUser) -> QueryResult<User> {
    diesel::update(users::table.find(user_id))
        .set((users::first_name.eq(updated_user.first_name), users::email.eq(updated_user.email)))
        .execute(conn)?;

    users::table.find(user_id).first(conn)
}

pub fn get_all_users(conn: &mut MysqlConnection) -> QueryResult<Vec<User>> {
    users::table.load::<User>(conn)
}
