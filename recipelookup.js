// Importing the module
const express=require("express")
const cheerio = require("cheerio")
const fs = require("fs");
  
// Creating express Router
const router=express.Router()
 
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

async function getallergies(usn) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        const cursor = user.find({ "username" : usn }).project({_id: 0, allergies: 1});
        array = await cursor.toArray();
        if (array.length > 0) { 
            return array[0].allergies;
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getdiet(usn) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        const cursor = user.find({ "username" : usn }).project({_id: 0, dietprefs: 1});
        array = await cursor.toArray();
        if (array.length > 0) { 
            return array[0].dietprefs;
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function getmembership(usn) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        const cursor = user.find({ "username" : usn }).project({_id: 0, membership: 1});
        array = await cursor.toArray();
        if (array.length > 0) { 
            return array[0].membership;
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
    if (sessionuser == null) {
        res.redirect("/");
    } else {
        // res.send(sessionuser);
        // res.sendFile("profile.html", {root: __dirname });
        // var userInput = req.body.userInput;
        fs.readFile("recipelookup.html", "utf8", function(err, data) {
            if (err) throw err;

            var $ = cheerio.load(data);
            var membership = getmembership(sessionuser).catch(console.error);
            membership.then(w => {
                var ingredients = getingred(sessionuser).catch(console.error);
                ingredients.then(x => { 
                    //Subscription
                    if (w == "false") {
                        for (i = 0; i < x.length; i++) {
                            $("#listofingred").append('<input type="radio" name="ingredient" class="ingredient" value="' + x[i] + '" id="ingredient' + i + '"></input><label for="ingredient' + i + '">' + x[i] + '</label></br>');
                        }
                    } else {
                        for (i = 0; i < x.length; i++) {
                            $("#listofingred").append('<input type="checkbox" name="ingredient" class="ingredient" value="' + x[i] + '" id="ingredient' + i + '"></input><label for="ingredient' + i + '">' + x[i] + '</label></br>');
                        }
                    }
                    var allergies = getallergies(sessionuser).catch(console.error);
                    allergies.then(y => {
                        for (i = 0; i < y.length; i++) {
                            $("#allergies").append('<li>' + y[i] + '</li>');
                        }
                        var diet = getdiet(sessionuser).catch(console.error);
                        diet.then(z => {
                            for (i = 0; i < z.length; i++) {
                                $("#diet").append('<li>' + z[i] + '</li>');
                            }
                            res.send($.html());
                        })
                    })
                });
            })
        });
    }
})

module.exports=router