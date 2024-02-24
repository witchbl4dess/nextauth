"use client";

import { CardWrapper } from "@/components/auth/cardWrapper";

export const LoginForm = () => {
    return (
       <CardWrapper headerLabel="welcome back" backButtonLabel="don't have an acc?" backButtonHref="/auth/register" showSocial>
        login form
        </CardWrapper> 
    );
}
