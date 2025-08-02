import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

// Only initialize Google OAuth strategy if environment variables are set
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || 
    `${process.env.FRONTEND_URL || 'http://localhost:5000'}/api/auth/google/callback`;
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
      },
      async (_, __, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value,
              role: 'user'
            });
          }

          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
  
  console.log('✅ Google OAuth strategy configured successfully');
} else {
  console.log('⚠️  Google OAuth not configured - missing environment variables');
  console.log('   Required: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET');
  console.log('   Optional: GOOGLE_CALLBACK_URL (defaults to FRONTEND_URL + /api/auth/google/callback)');
} 