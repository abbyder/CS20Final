// Importing express module
const express=require("express");
const router=express.Router();
  
// Handling request using router
router.get("/",(req,res,next)=>{
    res.sendFile("home.html", {root: __dirname });
});

router.post('/', function(request, response, next){
    //database stuff
    // main(request.body['username'], request.body['password']).catch(console.error);

    //reroute
	// response.send(request.body);
	response.redirect("/login");

});
// Importing the router
module.exports=router;