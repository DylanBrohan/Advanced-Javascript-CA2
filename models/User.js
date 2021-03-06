const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates schema
const UserSchema = new Schema({
  // Defining my fields
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// model created & exported
module.exports = User = mongoose.model("user", UserSchema);
