import { NextFunction, Request, Response } from "express";


const userRouter = require("express").Router();

userRouter.post("/regiter", (req: Request, res: Response) => {
    res.send("register")
})


userRouter.get("login", (req: Request, res: Response) => {
    res.send("login");
})