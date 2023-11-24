const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  password: String,
  time: Date,
  likes: Number,
});

const Tweet = mongoose.model("tweet", tweetSchema);

module.exports = Tweet;
