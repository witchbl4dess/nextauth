"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";

import { FormError } from "@/components/formError";
import { FormSucces } from "@/components/formSucces";
import { CardWrapper } from "@/components/auth/cardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    }
    return (
       <CardWrapper headerLabel="create an account" backButtonLabel="already have an acc?" backButtonHref="/auth/login" showSocial>
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="john.doe@example.xyz" type="email"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="xxxxx" type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="John Doe"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormError message={error} />
                <FormSucces message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </Form>
        </CardWrapper> 
    );
}
