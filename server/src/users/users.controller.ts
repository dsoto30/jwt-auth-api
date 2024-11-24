import { AuthRequest, CustomRequest } from "../types/AuthRequest";
import { NextFunction, Request, Response } from "express";
import { generateToken, comparePassword } from "../helper/jwt_helper";
import { getErrorMessage } from "../helper/getErrorMessage";

import { insertUser,getUserByEmail, getAllUsers, getUserById } from "./users.services";




export async function register(req: Request<{}, {}, AuthRequest>, res: Response, next: NextFunction) {
    try {

        const user = await getUserByEmail(req.body.email);
        if (user !== null) {
            res.status(409).send({ success: false, message: "User already exists" });
            return;
        }

        const createdUser = await insertUser(req.body.email, req.body.password);
        if (createdUser === null) {
            res.status(500).send({ success: false, message: "User not created" });
            return;
        }
        res.cookie("token", generateToken(createdUser.id, createdUser.email), { httpOnly: true });
        res.status(200).send({ success: true, message: "user registered and cookie has been set", email: createdUser.email, id: createdUser.id });
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

export async function getUsers(req: CustomRequest, res: Response, next: NextFunction) {
    
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


export async function getUserInformation(req: CustomRequest, res: Response, next: NextFunction){

    try {
        const user = await getUserById(req.user_id as number); 
        if (user === null) {
            res.status(404).send({ success: false, message: "User not found" });
            return;
        }
        res.status(200).send({ success: true, user: user });
    } catch (error) {
        res.status(500).send({ success: false, message: getErrorMessage(error) });
    }

}
