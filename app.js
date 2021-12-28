//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const _ = require("lodash");
const homeStartingContent = "A Blog page just to suit your needs. Its to-go for any update regarding any topic to the public. Please click compose to create a new blog. You may compose as many blogs as you want. Any feedback from your side will be appreciated.";
const aboutContent = "A Blog page just to suit your needs. Its to-go for any update regarding any topic to the public. Please click compose to create a new blog. You may compose as many blogs as you want. Any feedback from your side will be appreciated. Only first 100 characters will be visible at homepage. Click read more to enter specific page for that blog. One can directly enter the page by adding blog name in the url.";
const contactContent = "Reach me at ritishkumar1947@gmail.com. Contact No. 9467399360";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const post = [];

app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    post: post
  });
})

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

app.get("/posts/:heading", function(req, res) {

  post.forEach(function(element) {
    if (_.lowerCase(req.params.heading) === _.lowerCase(element.composeTitle)) {
      console.log("Match Found");
      res.render("post", {
        composeTitle: element.composeTitle,
        composePost: element.composePost
      });
    } else {
      console.log("Match Not Found");
    }
  })

})
app.post("/compose", function(req, res) {
  const inputCompose = {
    composeTitle: req.body.composeTitle,
    composePost: req.body.composePost
  }
  post.push(inputCompose);
  res.redirect("/");
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
