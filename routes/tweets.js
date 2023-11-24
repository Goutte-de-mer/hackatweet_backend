var express = require("express");
var router = express.Router();
const Tweet = require("../models/tweets");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  if (!checkBody(req.body, ["content"])) {
    return res.json({ result: false, error: "There needs to be a content" });
  }
  User.findOne({ token: req.body.token }).then((user) => {
    if (!user) {
      return res.json({ result: false, error: "no user found" });
    }
    const newTweet = new Tweet({
      content: req.body.content,
      user: user._id,
      time: new Date(),
      likes: 0,
    });

    newTweet.save().then((data) => {
      return res.json({ result: true, tweet: data });
    });
  });
});

router.get("/", (req, res) => {
  Tweet.find()
    .populate("user")
    .then((data) => {
      let tweets = [];
      for (let i = 0; i < data.length; i++) {
        let tweet = {
          content: data[i].content,
          time: data[i].time,
          likes: data[i].likes,
          username: data[i].user.username,
          firstname: data[i].user.firstname,
          // token: data[i].user.token,
        };
        tweets.push(tweet);
      }
      return res.json({ result: true, tweets });
    });
});

module.exports = router;
