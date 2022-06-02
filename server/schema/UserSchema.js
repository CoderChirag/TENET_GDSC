const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleaccount: {
      isgoogle: { type: Boolean, default: 0 },
      googlename: String,
    },
    img: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    requested: {
      type: Array,
      default: [],
    },
    chats: {
      type: Array,
      default: [],
    },
    date: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
