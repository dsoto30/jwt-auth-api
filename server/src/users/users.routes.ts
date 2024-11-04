


import {Router} from "express";
import { register, test } from "./users.controller";
import { jwtAuthorization } from "../middleware/jwt-middleware";

const userRouter = Router();



userRouter.post("/register", register);

userRouter.get("/test", test);

/*

userRouter.post("/login", login);

userRouter.get("/getUsers", jwtAuthorization, getUsers);
*/
userRouter.get("/profile",  (req, res) => {
    res.send({ success: true, message: "user profile" });
});



export default userRouter;