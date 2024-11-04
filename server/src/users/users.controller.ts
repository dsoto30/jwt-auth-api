import { AuthRequest } from "../types/AuthRequest";
import { NextFunction, Request, Response } from "express";
import { generateToken, comparePassword } from "../helper/jwt_helper";
import { getErrorMessage } from "../helper/getErrorMessage";

//import { insertUser,getUserByEmail, getAllUsers } from "./users.services";
import { insertUser } from "./users.services";
import logger from "../logger";


interface TokenRequest extends Request {
    user?: any
}

export async function register(req: Request<{}, {}, AuthRequest>, res: Response, next: NextFunction) {
    try {

        const user = await insertUser(req.body.email, req.body.password);
        console.log("user", user);
        res.status(200).send({ success: true, message: "user registered" });
    }
    catch (err) {
        res.status(500).send({ success: false, message: getErrorMessage(err) });
    }
}

export function test(req: Request, res: Response, next: NextFunction) {
    res.send({ success: true, message: "test" }); 
}

/*
export async function login(req: Request<{}, {}, AuthRequest>, res: Response, next: NextFunction) {
    try {

        const user = await getUserByEmail(req.body.email);
        if (user !== null) {
            if (comparePassword(req.body.password, user.password)) {
                const token = generateToken(user.id, user.email);
                res.cookie("token", token, { httpOnly: true });
                res.status(200).send({ success: true, message: "user logged in", email: user.email, id: user.id });
            }
            else {
                res.status(404).send({ success: false, message: "Wrong password" });
            }

        }
        else {
            res.status(404).send({ success: false, message: "User not found" });
        }

    }
    catch (err) {
        res.status(404).send({ success: false, message: getErrorMessage(err) });
    }
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    
    try {
        const users = await getAllUsers();
        res.status(200).send({ success: true, users: users });
    } catch (error) {
        res.status(500).send({ success: false, message: getErrorMessage(error) });
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {

    res.clearCookie("token");
    res.status(200).send({ success: true, message: "user logged out" });

}


export function getTokenInformation(req: TokenRequest, res: Response, next: NextFunction){
    return res.status(200).send({ success: true, user: req.user });
}
*/