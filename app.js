//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/blogDB", {
//   useNewUrlParser: true
// });
mongoose.connect("mongodb+srv://ritish-admin:xxxxxxx@cluster0.5gr3k.mongodb.net/blogDB", {
  useNewUrlParser: true
});
const homeStartingContent = "A Blog page just to suit your needs. Its to-go for any update regarding any topic to the public. Please click compose to create a new blog. You may compose as many blogs as you want. Any feedback from your side will be appreciated.";
const aboutContent = "A Blog page just to suit your needs. Its to-go for any update regarding any topic to the public. Please click compose to create a new blog. You may compose as many blogs as you want. Any feedback from your side will be appreciated. Only first 100 characters will be visible at homepage. Click read more to enter specific page for that blog. One can directly enter the page by adding blog name in the url.";
const contactContent = "Reach me at ritishkumar1947@gmail.com. Contact No. 9467399360";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (!err) {
      res.render("home", {
        homeStartingContent: homeStartingContent,
        post: posts
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.get("/posts/:postID", function(req, res) {

  Post.findOne({
    _id: req.params.postID
  }, function(err, post) {
    if (!err) {
      res.render("post", {
        composeTitle: post.title,
        composePost: post.content
      });
    }
  });
});
app.post("/compose", function(req, res) {

  const post = new Post({
    title: req.body.composeTitle,
    content: req.body.composePost
  });
  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
