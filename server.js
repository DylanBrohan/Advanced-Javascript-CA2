//takes in the dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
// Routing to the files in the API folder
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database Config variable - key.js
const db = require("./config/keys").mongoURI;
// Connects to mongoDB, passes in db variable
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//Passport Config file
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // For Production
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; //listen to port 5000 localhost
app.listen(port, () => console.log(`server running on port ${port}`)); // listens on the port and consoles the result, passes in the port(5000)
