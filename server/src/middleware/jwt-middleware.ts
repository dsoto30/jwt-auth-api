import { verifyToken } from "../helper/jwt_helper";
import {Request, Response, NextFunction} from "express";

interface CustomRequest extends Request {
    user?: any
}

export function jwtAuthorization(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = verifyToken(token);
        if (user) {
            req.user = user;
        }

        next();
    }
    else {
        res.status(401).send({ success: false, message: "Unauthorized" });
    }

}
   