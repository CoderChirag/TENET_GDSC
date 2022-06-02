const mongoose = require("mongoose");

const googleuserSchema = new mongoose.Schema(
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
    img: {
      type: String,
      default: "",
    },
    friends: {
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
module.exports = mongoose.model("Googleuser", googleuserSchema);
