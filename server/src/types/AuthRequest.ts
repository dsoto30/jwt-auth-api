import { Request } from "express";
export type AuthRequest = {
    email: string,
    password: string
}

export interface CustomRequest extends Request {
    user_id?: number
}


