// src/shared/lib/auth.ts
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables.');
}

export function signJwt<T extends Record<string, unknown>>(payload: T, options?: SignOptions): string {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: '7d',
        ...options,
    });
}

export function verifyJwt<T = Record<string, unknown>>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET!) as T;
    } catch (e) {
        return null;
    }
}
