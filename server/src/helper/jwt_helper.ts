import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || "";

export function generateToken(userId: number, email: string ) {
    return jsonwebtoken.sign({ userId, email }, jwt_secret, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
    return jsonwebtoken.verify(token, jwt_secret);
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

