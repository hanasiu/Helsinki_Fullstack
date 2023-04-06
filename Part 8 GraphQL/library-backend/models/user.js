const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 1
  }
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Person'
//     }
//   ],
})

module.exports = mongoose.model('User', schema)