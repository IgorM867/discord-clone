import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    newUser: "auth/new-user",
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|public|logos|favicon.ico).*)"],
};
