import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/User";

// Auth configuration for NextAuth

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            id: "credentials",
            name: "Email OTP",
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;

                try {
                    await connectDB();

                    // Look up the user from database
                    const user = await User.findOne({
                        email: (credentials.email as string).toLowerCase()
                    });

                    if (!user) return null;

                    // Return user object for NextAuth
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role,
                    };
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt", // Use JWT for credentials provider
    },
    callbacks: {
        async jwt({ token, user, profile }) {
            // Initial sign in
            if (user) {
                token.id = user.id as string;
                token.email = user.email as string;
                token.name = user.name as string;
                token.role = (user as any).role || "USER";
                // Capture image from user object (adapter) or profile (OAuth)
                token.image = user.image || (profile as any)?.picture || (profile as any)?.image;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = (token.role as "USER" | "ADMIN") || "USER";
                session.user.image = token.image as string;
            } else if (user && session.user) {
                session.user.id = user.id;
                session.user.role = (user as any).role || "USER";
                session.user.image = user.image;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
});
