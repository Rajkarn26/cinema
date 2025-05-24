const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);


// http://localhost:5000/register_api

// {
//     "username": "raj",
//     "email": "raj@example.com",
//     "password": "123456"
// }

// http://localhost:5000/login_api

// {
//     "username": "raj",
//     "password": "123456"
// }

// http://localhost:5000/forgot_password_api

// {
//     "username": "raj",
//     "newPassword": "newpass123"
// }