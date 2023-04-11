const express=require("express");
  
// Importing all the routes
const homeroute=require("./home.js");
const profileroute=require("./profile.js");
const reciperoute=require("./recipelookup.js");
  
// Creating express server
const app=express();
  
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Handling routes request
app.use("/", homeroute);
app.use("/profile", profileroute);
app.use("/recipelookup", reciperoute);
app.listen(8080);