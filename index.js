const express=require("express");
  
// Importing all the routes
const homeroute=require("./home.js");
const loginroute=require("./test.js");
  
// Creating express server
const app=express();
  
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Handling routes request
app.use("/", homeroute);
app.use("/login", loginroute);
app.listen(8080);