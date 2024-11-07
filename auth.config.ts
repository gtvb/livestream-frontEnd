import type { NextAuthConfig, User } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth;
      const redirectablePaths = ["/signup", "/login"];
      const currentPath = nextUrl.pathname;

      if (isLoggedIn) {
        // If the user is logged in and tries to access /login or /signup, redirect to /dashboard
        if (redirectablePaths.includes(currentPath)) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      } else {
        // If the user is not logged in and tries to access protected pages, redirect to /login
        if (!redirectablePaths.includes(currentPath)) {
          return Response.redirect(new URL("/login", nextUrl));
        }
        return true;
      }
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;