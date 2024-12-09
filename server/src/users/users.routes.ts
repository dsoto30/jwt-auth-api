import {Router} from "express";
import { register, test, login, getUsers, logout, getUserInformation } from "./users.controller";
import { jwtAuthorization } from "../middleware/jwt-middleware";

const userRouter = Router();



userRouter.post("/register", register);

userRouter.get("/test", test);                  


userRouter.post("/login", login);

userRouter.get("/getUsers", jwtAuthorization, getUsers);

userRouter.get("/logout", jwtAuthorization, logout);

userRouter.get("/profile", jwtAuthorization, getUserInformation);



export default userRouter;