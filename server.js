//1/11/2022

require('dotenv').config()

//Plugins and JWT 

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('./models')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

//Authenticating new Users

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//JWT giving User BearerToken

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(err => cb(err))))

  //Calling Routes

app.use(require('./routes'))


//Calling DB

require('./db')
  .then(() => app.listen(3000))
  .catch(err => console.log(err))
