const express=require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Importing all the routes
const homeroute=require("./home.js");
const profileroute=require("./profile.js");
const reciperoute=require("./recipelookup.js");
  
// Creating express server
const app=express();
  
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Initialization
app.use(cookieParser());
 
app.use(session({
    secret: "amar",
    saveUninitialized: true,
    resave: true
}));

// Handling routes request
app.use("/", homeroute);
app.use("/profile", profileroute);
app.use("/recipelookup", reciperoute);
app.listen(8080);