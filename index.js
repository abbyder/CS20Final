const express=require("express");
  
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

//https://www.google.com/search?q=node+js+store+session+data&rlz=1C5CHFA_enUS998US999&sxsrf=APwXEdc75PSh8s7aabRPFA8CYsXM4YLRkQ%3A1681355279087&ei=D3I3ZLv3BKCg5NoPh5miuA4&oq=node+js+session+dat&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgYIABAWEB4yCAgAEIoFEIYDMggIABCKBRCGAzIICAAQigUQhgMyCAgAEIoFEIYDMggIABCKBRCGAzoICAAQigUQkQI6DggAEIoFELEDEIMBEJECOgUIABCABDoKCAAQgAQQFBCHAkoECEEYAFAAWK0YYLYhaABwAXgAgAF2iAG3BpIBBDEwLjGYAQCgAQHAAQE&sclient=gws-wiz-serp log in
// Handling routes request
app.use("/", homeroute);
app.use("/profile", profileroute);
app.use("/recipelookup", reciperoute);
app.listen(8080);