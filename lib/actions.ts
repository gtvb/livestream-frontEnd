"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { loginSchema } from "./zod"

export async function login(prevState: { message: string }, formData: FormData) {
    try {
        const credentials = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password")})
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
                case "CredentialsSignin":
                    throw error;
                default:
                    return { message: "Algo deu errado!" };
            }
        }

        throw error
    }
}