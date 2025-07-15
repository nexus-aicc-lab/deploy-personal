// src/shared/lib/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // .env에 꼭 넣어줘야 해

export function signJwt(payload: object, options?: jwt.SignOptions) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
        ...options,
    });
}

export function verifyJwt<T>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET) as T;
    } catch (e) {
        return null;
    }
}
