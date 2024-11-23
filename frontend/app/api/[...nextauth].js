// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import { pages } from "next/dist/build/templates/app-page";

// export const authOptions = {
//   providers: [
//     // Google Provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     // Apple Provider
//     AppleProvider({
//       clientId: process.env.APPLE_CLIENT_ID,
//       clientSecret: process.env.APPLE_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/user/login", // Custom login page
//   },
//   // Customizing NextAuth callbacks
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.idToken = account.id_token;
//       }
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       session.accessToken = token.accessToken;
//       session.idToken = token.idToken;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
