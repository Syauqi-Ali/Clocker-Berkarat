pub mod users;
pub use users::user_routes;

use warp::Filter;

pub fn all_routes() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    //user_routes().or(post_routes())
    user_routes()
}
