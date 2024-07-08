import User from "@models/user";
import { connectToDb } from "@utils/database";
import { GoogleProfileType } from "@utils/types";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDb();
      const sessionUser = await User.findOne({ email: session.user?.email });

      if (session.user) {
        session.user.id = sessionUser?._id.toString();
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        const userProfile = profile as GoogleProfileType;
        await connectToDb();

        // check if user already exists
        const userExists = await User.findOne({ email: profile?.email });

        // If not create a new user
        if (!userExists) {
          await User.create({
            username: userProfile?.name?.replace(" ", "").toLowerCase(),
            email: userProfile?.email,
            image: userProfile.picture,
          });
        }
        return true;
      } catch (err) {
        console.error("Unable to sign in", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST, handler };
