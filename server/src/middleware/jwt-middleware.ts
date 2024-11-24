import { verifyToken } from "../helper/jwt_helper";
import {Request, Response, NextFunction} from "express";
import { CustomRequest } from "../types/AuthRequest";
import { getUserByEmail, getUserById } from "../users/users.services";
import { JwtPayload } from "jsonwebtoken";
import logger from "../logger";



export function jwtAuthorization(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers.cookie?.includes("token")) {
        const token = req.headers.cookie.split("=")[1];
        const payload = verifyToken(token);
        if (payload && 'userId' in (payload as JwtPayload)) {
            req.user_id = (payload as JwtPayload).userId;
            next();
        }
        else {
            res.status(401).send({ success: false, message: "Unauthorized" });
        }
        
    }
    else {
        res.status(401).send({ success: false, message: "Unauthorized" });
    }

}
   