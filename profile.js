// Importing the module
const express=require("express")
const cheerio = require("cheerio")
const fs = require("fs");
const session = require("express-session");
  
// Creating express Router
const router=express.Router()
  
async function main(usn, data) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        // check here if user already exists.
        let ingredients = [];
        for (i = 0; i < data['count']; i++) {
            
        }
        // create a document to insert
        const result = await user.findOneAndUpdate(
            { "username" : usn },
            { $set: {"ingredients" : ["filt41", "filt41"] }}
        );
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// Handling login request
router.get("/",(req,res,next)=>{
    const sessionuser = req.session.user;
    // res.send(sessionuser);
    // res.sendFile("profile.html", {root: __dirname });
    // var userInput = req.body.userInput;
    fs.readFile("profile.html", "utf8", function(err, data) {
        if (err) throw err;

        var $ = cheerio.load(data);

        $(".usn").text(sessionuser + "'s Profile");
        res.send($.html());
    });
})

router.post('/', function(request, response, next){
    console.log(request.body);
    const sessionuser = request.session.user;
    // //database stuff
    main(sessionuser, request.body).catch(console.error);

    //reroute
	// response.send(request.body);
	response.redirect("/profile");
});

module.exports=router