// Importing express module
const express=require("express");
const router=express.Router();
  
async function main(usn, pswd) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        // check here if user already exists.
        // create a document to insert
        const doc = {
            username: usn,
            password: pswd,
            ingredients: ["ingred", "ingred"],
            filters: ["filt", "filt"],
        }
        const result = await user.insertOne(doc);
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// Handling request using router
router.get("/",(req,res,next)=>{
    res.sendFile("home.html", {root: __dirname });
});

router.post('/', function(request, response, next){
    //database stuff
    main(request.body['username'], request.body['password']).catch(console.error);

    //reroute
	// response.send(request.body);
	response.redirect("/profile");

});
// Importing the router
module.exports=router;