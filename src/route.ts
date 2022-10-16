import { HttpWrapper as Route } from "./utils/http-wrapper";
import { userSignIn, userSignUp } from "./auth/auth-controller";
import { mustLoginMiddleware } from "./middlewares/must-login-middleware";
import {
  userCourseCreate,
  userCourseDelete,
  userCourseShow,
  userCourseShows,
  userCourseUpdate,
} from "./user/user-course/user-course-controller";
import { showCurrentUser } from "./user/user-controller";

/**
 * Routes for auth
 */
Route.post("/auth/signup", userSignUp);
Route.post("/auth/login", userSignIn);
 
/**
* Route user
*/
Route.get("/users/me", showCurrentUser, [mustLoginMiddleware]);

/**
 * user course routes
 */
Route.get("/users/:userId/courses/:courseId", userCourseShow, [
  mustLoginMiddleware,
]);
Route.patch("/users/:userId/courses/:courseId", userCourseUpdate, [
  mustLoginMiddleware,
]);
Route.delete("/users/:userId/courses/:courseId", userCourseDelete, [
  mustLoginMiddleware,
]);
Route.post("/users/:userId/courses", userCourseCreate, [mustLoginMiddleware]);
Route.get("/users/:userId/courses", userCourseShows, [mustLoginMiddleware]);
