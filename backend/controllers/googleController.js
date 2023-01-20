const passport = require('passport')
const GoogleStrategies = require('passport-google-oauth20')
const User = require('../models/User')

passport.use(new GoogleStrategies({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/v1/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        if (profile.id) {
            const existingUser = await User.findOne({ email: profile._json.email })
            if (existingUser) {
                const { password, _id, admin, ...userDTO } = existingUser._doc
                return cb(null, {
                    accessToken,
                    user: userDTO
                })
            }
            const newUser = await new User({
                username: profile._json.email,
                password: profile._json.sub,
                email: profile._json.email,
                avatar: profile._json.picture,
                lofiUsername: profile._json.name,
                verified: profile._json.email_verified
            })  
            await newUser.save() 
            const { password, _id, admin, ...userDTO }  = newUser._doc
            return cb(null, {
                accessToken, 
                user: userDTO
            })
        } else {
            console.log("There's something wrong when login with google")
        }

    }
))

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


const googleController = {
    requestUser: passport.authenticate('google', {
        scope: ['profile', 'email']
      }),
    callbackResponse: passport.authenticate('google', {
        successRedirect: '/v1/auth/google/loginInfo'
    }),
    getInfo: async(req, res) => { 
        return res.status(200).json(req.user)
    }
} 

module.exports = googleController