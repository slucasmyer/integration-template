import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin"
import AppleProvider from "next-auth/providers/apple"
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c"
import { CredentialsProvider } from 'next-auth/providers/credentials'
import Stripe from "stripe";
// import { v4 as uuidv4 } from 'uuid';
// import { getUser, updateUser, createUser, checkStripeSubscription } from './user'

type GoogleUser = {
  email: string;
  name: string;
  image: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

// const fetchAppUser = async ({ email, name, image}: GoogleUser): Promise<User> => {
//   console.log('FETCH APP USER:')
//   let user = await getUser(email);
//   if (!user || user === null || user === undefined) {
//     user = await createUser(email, name, image);
//   }
//   return user;
// }


export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {  strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === 'signIn') {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user}) {
      let hasActiveSubscription = false
      
      if (token) {
        console.log('token in session callback:', token)
      }

      if (user) {
        console.log('user in session callback:', user)
      }
      
      try {
        if (session && session.user && session.user.email) {
          console.log('SESSION CALLBACK:')
          //session.user = await fetchAppUser(session.user)
          console.log('FETCHED USER:', session.user)
          //hasActiveSubscription = await checkStripeSubscription(session.user.stripeCustomerID)
          console.log('HAS ACTIVE SUBSCRIPTION:', hasActiveSubscription)
        }
      } catch (error) {
        console.log('ERROR IN SESSION CALLBACK:', error)
      }
      //session.hasActiveSubscription = hasActiveSubscription
      return session
    },
  },
}