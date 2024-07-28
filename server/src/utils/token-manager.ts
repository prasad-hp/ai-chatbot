import { config } from "dotenv";
import jwt, { Secret } from "jsonwebtoken"
config()
const secretKey = process.env.JWT_TOKEN as Secret;

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, secretKey, {
        expiresIn:"7d"
    })
    return token;
}