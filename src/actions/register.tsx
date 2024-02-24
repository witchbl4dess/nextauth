"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password, name } = validateFields.data;
    const passwdHash = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "user already exists" };
    }

    await db.user.create({
        data: {
            name, email, password: passwdHash
        },
    })



    return { success: "user created !" };
};