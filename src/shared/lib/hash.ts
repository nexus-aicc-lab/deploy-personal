// src/shared/lib/hash.ts
import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
    return await hash(password, 10); // saltRounds: 10
}

export async function comparePassword(raw: string, hashed: string) {
    return await compare(raw, hashed);
}
