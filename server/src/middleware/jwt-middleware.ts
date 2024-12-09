import { verifyToken } from "../helper/jwt_helper";
import {Request, Response, NextFunction} from "express";
import { CustomRequest } from "../types/AuthRequest";
import { JwtPayload } from "jsonwebtoken";



export function jwtAuthorization(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers.cookie?.includes("token")) {
        const token = req.cookies["token"];
        console.log(`token: ${token}`);
        const payload = verifyToken(token);
        if (payload && 'userId' in (payload as JwtPayload)) {
            req.user_id = (payload as JwtPayload).userId;
            next();
        }
        else {
            res.status(401).send({ success: false, message: "Token is invalid" });
        }
        
    }
    else {
        res.status(401).send({ success: false, message: "Unauthorized: Token is missing" });
    }

}
   