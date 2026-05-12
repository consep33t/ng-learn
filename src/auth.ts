import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // 1. Try to find user in database
          const result = await query(
            "SELECT * FROM admin_users WHERE email = $1",
            [credentials.email]
          );

          if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (isValid) {
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
              };
            }
          }

          // 2. Fallback to default admin from environment if DB check fails or no user found
          console.log("Checking fallback credentials...");
          console.log("Input:", credentials.email);
          console.log("Target:", process.env.ADMIN_DEFAULT_EMAIL);
          
          if (
            credentials.email === process.env.ADMIN_DEFAULT_EMAIL &&
            credentials.password === process.env.ADMIN_DEFAULT_PASSWORD
          ) {
            console.log("Login success using default admin credentials");
            return {
              id: "0",
              name: "Super Admin",
              email: process.env.ADMIN_DEFAULT_EMAIL || "admin@nglearn.id",
              role: "superadmin",
            };
          }

          console.warn("Login failed for email:", credentials.email);
          return null;
        } catch (error) {
          console.error("Auth authorize error:", error);
          // Still try fallback even on DB error
          if (
            credentials.email === process.env.ADMIN_DEFAULT_EMAIL &&
            credentials.password === process.env.ADMIN_DEFAULT_PASSWORD
          ) {
            return {
              id: "0",
              name: "Super Admin",
              email: process.env.ADMIN_DEFAULT_EMAIL || "admin@nglearn.id",
              role: "superadmin",
            };
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string;
        (session.user as { role?: string; id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  trustHost: true,
});
