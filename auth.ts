import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const nextAuth = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API_URL}/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (response.status == 404) {
          throw new Error("Usuário não encontrado, tente novamente");
        } else if (response.status == 400) {
          throw new Error("Dados inválidos, tente novamente");
        }

        const data = await response.json();
        return data["user"]
      },
    }),
  ],
});

export const { handlers, signIn, signOut, auth } = nextAuth;
