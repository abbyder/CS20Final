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
        const query = {$and: [{ username: usn },{ password: pswd }]};
        // print a message if no documents were found
        if ((await user.countDocuments(query)) === 0) {
            // console.log("User not registered");
            return null;
        }
        // create a document to insert
        // const doc = {
        //     username: usn,
        //     password: pswd,
        //     ingredients: ["ingred", "ingred"],
        //     filters: ["filt", "filt"],
        // }
        // const result = await user.insertOne(doc);
        return usn;
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
    var ret = main(request.body['username'], request.body['password']).catch(console.error);
    ret.then(x => { 
        if(x != null) {
            request.session.user = x;
            request.session.save();
            response.redirect("/profile")
        } else {
            //change to some failure page
            response.redirect("/recipelookup");
        }
        // app.get("/logout", (req, res) => {
        //     req.session.destroy();
        //     res.send("Your are logged out ");
        // });
    });
    //reroute
	// response.send(request.body);
	// response.redirect("/profile");

});

//NEED TO ADD:
//hidden field to home page forms to distinguish which form is being submitted.

// Importing the router
module.exports=router;