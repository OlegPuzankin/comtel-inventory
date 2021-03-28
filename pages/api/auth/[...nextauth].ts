import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { useActions } from '../../../hooks/useActions';
import { User } from '../../../model/User';
import dbConnect from '../../../utils/dbConnect';

const options: InitOptions = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],


  callbacks: {
    signIn: async (user, account, profile) => {
      await dbConnect()

      let _user = await User.findOne({ email: user.email })

      if (!_user) {
        const _user = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          admin: false
        })
      }
      return true
    },
    async session(session, user) {
      // console.log('session invoke', session, user)
      await dbConnect()
      const _user = await User.findOne({ email: user.email })
      //@ts-ignore
      session.user.admin = _user.admin
      return session
    },
  },

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },



  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    encryption: true,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token, maxAge }) {},
  }
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};



export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
