import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Op } from 'sequelize'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const getGoogleCallbackUrl = () => {
  if (process.env.GOOGLE_CALLBACK_URL) {
    return process.env.GOOGLE_CALLBACK_URL
  }

  if (process.env.BACKEND_URL) {
    return `${process.env.BACKEND_URL}/api/auth/google/callback`
  }

  return 'http://localhost:5000/api/auth/google/callback'
}

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
      callbackURL: getGoogleCallbackUrl(),
      proxy: true,
      passReqToCallback: true,
    },
    async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        console.log('Google OAuth - Profile received:', {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails
        })

        const email = profile.emails?.[0].value
        if (!email) {
          console.error('Google OAuth - No email found in profile')
          return done(new Error('No email found in Google profile'), undefined)
        }

        // Check if user already exists
        let user = await User.findOne({ 
          where: { 
            [Op.or]: [
              { googleId: profile.id },
              { email: email }
            ]
          } 
        })

        // REGISTER MODE: Only allow new users
        if (user) {
          console.log('Google OAuth Register - User already exists')
          const accountExistsError = Object.assign(
            new Error('Account already exists. Please login with your email and password instead.'),
            { code: 'account_exists' }
          )
          return done(accountExistsError, undefined)
        }

        console.log('Google OAuth Register - Redirecting to registration form')
        // Don't create user yet, redirect to form
        return done(null, {
          isRegistration: true,
          email: email,
          name: profile.displayName,
          googleId: profile.id,
          provider: 'google'
        })
      } catch (error) {
        console.error('Google OAuth error:', error)
        return done(error as Error, undefined)
      }
    }
  )
)

// Serialize/Deserialize
passport.serializeUser((user: any, done) => {
  done(null, user.userId || user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      done(null, {
        userId: user.id,
        id: user.id, // Added for consistency with IAuthPayload
        email: user.email,
        role: user.role
      })
    } else {
      done(null, null)
    }
  } catch (error) {
    done(error, null)
  }
})

export default passport
