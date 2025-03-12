use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use std::env;
use dotenvy::dotenv;

pub fn get_connection() -> MysqlConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL harus diset di .env");
    MysqlConnection::establish(&database_url).expect("Gagal mendapatkan koneksi MySQL")
}

pub fn is_unique(table: &str, column: &str, value: &str) -> bool {
    use diesel::dsl::sql;
    use diesel::sql_types::BigInt;

    let mut conn = get_connection();
    let query = format!("SELECT COUNT(*) FROM `{}` WHERE `{}` = '{}'", table, column, value);

    let count: i64 = diesel::dsl::sql_query(query)
        .get_result::<BigInt>(&mut conn)
        .ok()
        .unwrap_or(0) as i64;

    count == 0
}
