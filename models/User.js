const { Schema, model } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
}, { timestamps: true })

//Posts: attaching Posts to User and timestamps when posts are created


User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)
