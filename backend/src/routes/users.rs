use warp::{Filter, http::Method};
use warp::cors;
use crate::handlers::users::{add_user, get_user, update_user_handler, get_users};

pub fn user_routes() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(&[Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(vec!["Content-Type"]);

    let get_user_route = warp::get()
        .and(warp::path!("api" / "user" / i32))
        .and_then(get_user);
        
    let get_users_route = warp::get()
        .and(warp::path!("api" / "user"))
        .and_then(get_users);

    let add_user_route = warp::post()
        .and(warp::path!("api" / "user"))
        .and(warp::body::json())
        .and_then(add_user);

    let update_user_route = warp::put()
        .and(warp::path!("api" / "user" / i32))
        .and(warp::body::json())
        .and_then(update_user_handler);

    get_user_route.or(add_user_route).or(update_user_route)
        .or(get_users_route)
        .with(cors)
}
