"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { liveStreamsArraySchema, loginSchema, signupSchema } from "./zod"
import { redirect } from "next/navigation"

export async function login(prevState: { message: string | undefined }, formData: FormData) {
    try {
        const credentials = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") })
        if (!credentials.success) {
            console.error(credentials.error)
            return { message: "Algum campo não está correto, tente novamente" }
        }

        const { email, password } = credentials.data
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })
        return { message: "Login feito com sucesso" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Credenciais inválidas" };
                default:
                    return { message: error.cause?.err?.message };
            }
        }

        throw error
    }
}

export async function signup(prevState: { message: string | undefined }, formData: FormData) {
    try {
        const credentials = signupSchema.safeParse({ 
            username: formData.get("username"),
            email: formData.get("email"), 
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword") 
        })
        if (!credentials.success) {
            return { message: "Algum campo está incorreto, tente novamente" }
        }

        const { username, email, password } = credentials.data
        await fetch("http://localhost:3333/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, email, password})
        })
    
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })

        return { message: "Login feito com sucesso" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Credenciais inválidas" };
                default:
                    return { message: error.cause?.err?.message };
            }
        }

        throw error
    }
}


export async function fetchLivestreams() {
    // TODO: talvez tirar o no-store
    const response = await fetch(`http://localhost:3333/livestreams/feed`, { cache: "no-store" })
    if (!response.ok) {
        throw new Error("Houve um erro ao obter as streams")
    }

    const data = await response.json()
    if (data["livestreams"] === null) {
        return []
    }

    const parsed = liveStreamsArraySchema.safeParse(data["livestreams"])
    if (!parsed.success) {
        throw new Error("Houve um erro ao obter as streams")
    }

    return parsed.data
}