import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "enter a valid email address",
    }),
    password: z.string().min(1, {
        message: "passwd must be at least 6 characters",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "passwd must be at least 6 characters",
    }),
    name: z.string().min(1, {
        message: "name is required",
    })
});