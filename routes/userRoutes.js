//Needs JWT and models 

const router = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

//Route for Registering new User (calling for name username and password)

router.post('/users/register', (req, res) => {
  const { name, username } = req.body
  User.register(new User({ name, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

//Route for logging in Exsisting Users, Authentication and applying hash and salt to password

router.post('/users/login', (req, res) => {
  const { username } = req.body
  User.authenticate()(username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

module.exports = router
