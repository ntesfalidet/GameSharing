const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "maintain logged in user name", // encrypts information for us regarding user name
  resave: false,  // we don't resave our session variables
  saveUninitialized: true,
}));

app.use("/", indexRouter);

module.exports = app;
