import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { Op } from 'sequelize'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
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

        let user = await User.findOne({ 
          where: { 
            [Op.or]: [
              { googleId: profile.id },
              { email: email }
            ]
          } 
        })

        if (user) {
          console.log('Google OAuth - Existing user found:', user.id)
          // Update googleId if it's missing (user matched by email)
          if (!user.googleId) {
            await user.update({ googleId: profile.id })
            console.log('Google OAuth - Updated user with googleId')
          }
          return done(null, {
            userId: user.id,
            email: user.email,
            role: user.role
          })
        }

        // Create new user if not found - but mark as incomplete
        console.log('Google OAuth - Creating new user (incomplete profile)')
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
          role: 'student',
          isApproved: false, // Mark as incomplete until profile is completed
          approvalStatus: 'pending' // Will be updated after profile completion
        } as any)

        console.log('Google OAuth - New user created:', newUser.id)
        return done(null, {
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role
        })
      } catch (error) {
        console.error('Google OAuth error:', error)
        return done(error as Error, undefined)
      }
    }
  )
)

// Microsoft Strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID || 'dummy',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || 'dummy',
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/microsoft/callback`,
      scope: ['user.read'],
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        console.log('Microsoft OAuth - Profile received:', {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails,
          _json: profile._json
        })

        const email = profile.emails?.[0].value || profile._json.mail || profile._json.userPrincipalName
        if (!email) {
          console.error('Microsoft OAuth - No email found in profile')
          return done(new Error('No email found in Microsoft profile'), undefined)
        }

        let user = await User.findOne({ 
          where: { 
            [Op.or]: [
              { microsoftId: profile.id },
              { email: email }
            ]
          } 
        })

        if (user) {
          console.log('Microsoft OAuth - Existing user found:', user.id)
          // Update microsoftId if it's missing (user matched by email)
          if (!user.microsoftId) {
            await user.update({ microsoftId: profile.id })
            console.log('Microsoft OAuth - Updated user with microsoftId')
          }
          return done(null, {
            userId: user.id,
            email: user.email,
            role: user.role
          })
        }

        // Create new user if not found - but mark as incomplete
        console.log('Microsoft OAuth - Creating new user (incomplete profile)')
        const newUser = await User.create({
          email: email,
          name: profile.displayName,
          microsoftId: profile.id,
          role: 'student',
          isApproved: false, // Mark as incomplete until profile is completed
          approvalStatus: 'pending' // Will be updated after profile completion
        } as any)

        console.log('Microsoft OAuth - New user created:', newUser.id)
        return done(null, {
          userId: newUser.id,
          email: newUser.email,
          role: newUser.role
        })
      } catch (error) {
        console.error('Microsoft OAuth error:', error)
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
