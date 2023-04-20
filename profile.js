// Importing the module
const express=require("express")
const cheerio = require("cheerio")
const fs = require("fs");
const session = require("express-session");

// Creating express Router
const router=express.Router()
  
async function updateingred(usn, data) {
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
            ingredients.push(data["ingred" + i]);
        }
        // create a document to insert
        const result = await user.findOneAndUpdate(
            { "username" : usn },
            { $set: {"ingredients" : ingredients }}
        );
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getingred(usn) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        const cursor = user.find({ "username" : usn }).project({_id: 0, ingredients: 1});
        array = await cursor.toArray();
        if (array.length > 0) { 
            return array[0].ingredients;
        }
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
        var ingredients = getingred(sessionuser).catch(console.error);
        ingredients.then(x => { 
            for (i = 0; i < x.length; i++) {
                $("#prof-ingred-display").append('<div class="user-ingred"><button class="xBtn" onclick="deleteIngred(&quot;2&quot;)">X</button>' + x[i] + '</div>');
                $("#ingred-hidden").append('<input type="hidden" name="ingred0" value="' + x[i] + '">');
            }
            res.send($.html());
        });
    });
})

router.post('/', function(request, response, next){
    // console.log(request.body);
    const sessionuser = request.session.user;
    // //database stuff
    //check which form being submitted
    var ret = updateingred(sessionuser, request.body).catch(console.error);
    ret.then(x => { 
	    response.redirect("/profile");
    });
    //reroute
	// response.send(request.body);
	// response.redirect("/profile");
});

module.exports=router