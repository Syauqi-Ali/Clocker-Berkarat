mod models;
mod repository;
mod schema;
mod handlers;
mod routes;
mod validation;

use diesel::prelude::*;
use dotenvy::dotenv;
use warp::Filter;
use std::env;
use routes::all_routes;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL harus diset di .env");
    MysqlConnection::establish(&database_url).expect("Gagal konek ke database")
}

#[tokio::main]
async fn main() {
    let routes = all_routes().with(warp::log("api"));

    println!("Server berjalan di http://127.0.0.1:3030");
    warp::serve(routes).run(([127, 0, 0, 1], 8080)).await;
}
