import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getEnvironmentVariable } from "@/utils/getEnvironmentVariable";

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: getEnvironmentVariable("FACEBOOK_ID"),
      clientSecret: getEnvironmentVariable("FACEBOOK_SECRET"),
    }),
    GoogleProvider({
      clientId: getEnvironmentVariable("GOOGLE_ID"),
      clientSecret: getEnvironmentVariable("GOOGLE_SECRET"),
    }),
    // CredentialsProvider({
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
      
    // }), // TODO
    
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"; // TODO
      return token;
    },
  },
});

export { handler as GET, handler as POST };
