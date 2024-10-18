import { AuthRequest } from "../types/AuthRequest";
import { NextFunction, Request, Response } from "express";
import { generateToken, comparePassword } from "../helper/jwt_helper";
import { getErrorMessage } from "../helper/getErrorMessage";
import logger from "../logger";

import { insertUser, getUserByEmail, getAllUsers } from "./users.services";


export async function register(req: Request<{}, {}, AuthRequest>, res: Response, next: NextFunction) {
    try {

        const userExists = await getUserByEmail(req.body.email);
        if (userExists !== null) {
            res.status(404).send({ success: false, message: "User already exists" });
            return
        }


        const user = await insertUser(req.body.email, req.body.password);
        if (user) {
            res.status(200).send({ success: true, message: "user created" });
        }
        else {
            res.status(404).send({ success: false, message: "User not created" });
        }
    }
    catch (err) {
        res.status(500).send({ success: false, message: getErrorMessage(err) });
    }
}

export function test(req: Request, res: Response, next: NextFunction) {
    res.send({ success: true, message: "test" }); 
}

export async function login(req: Request<{}, {}, AuthRequest>, res: Response, next: NextFunction) {
    try {

        const user = await getUserByEmail(req.body.email);
        if (user !== null) {
            if (comparePassword(req.body.password, user.password)) {
                const token = generateToken(user.id, user.email);
                res.cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 2 * 60 * 60 * 1000) });
                res.status(200).send({ success: true, token: token });
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
