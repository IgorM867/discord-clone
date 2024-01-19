import { createUser, getUserByEmail } from "@/lib/actions";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "sign-in",
      id: "sign-in",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("That email and password combination is incorrect.");
        }
        if (user.password == null) {
          throw new Error("Log in with Google");
        }
        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("That email and password combination is incorrect.");
        }

        return user;
      },
    }),
    CredentialsProvider({
      name: "register",
      id: "register",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        username: { type: "text" },
        repeatedPassword: { type: "passowrd" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password, username, repeatedPassword } = credentials;

        const userByEmail = await getUserByEmail(email);

        if (userByEmail) {
          throw new Error("An account with this email address already exists.");
        }
        if (password !== repeatedPassword) {
          throw new Error("Passwords do not match. Please try again.");
        }

        const newUser = await createUser({
          email,
          username,
          image: null,
          password: await hash(password, 12),
        });
        if (!newUser) throw new Error("Failed to register");
        return newUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.type == "oauth") {
        try {
          if (!user.email) return false;
          if (!user.name) return false;
          if (!user.image) return false;

          const existingUser = await getUserByEmail(user.email);

          if (!existingUser) {
            const result = await createUser({
              username: user.name,
              email: user.email,
              image: user.image,
              password: null,
            });
            if (!result) return false;
          }

          return true;
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
