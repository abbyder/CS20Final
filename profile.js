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

async function updatepref(usn, data) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        // check here if user already exists.
        let allergies = [];
        let diet = [];
        for (i = 0; i < 10; i++) {
            if (typeof data["all" + i] !== "undefined") {
                allergies.push(data["all" + i]);
            }
        }
        for (i = 0; i < 10; i++) {
            if (typeof data["diet" + i] !== "undefined") {
                diet.push(data["diet" + i]);
            }
        }
        // create a document to insert
        const result = await user.findOneAndUpdate(
            { "username" : usn },
            { $set: {"allergies" : allergies , "dietprefs": diet}}
        );
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function updatemember(usn) {
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
        const result = await user.findOneAndUpdate(
            { "username" : usn },
            { $set: {"membership" : "true" }}
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

function makeunCheckedBox(i, val, clName, tName) {
    let box = "<div class='food-box'>";
    box += "<input type='checkbox' id='" + tName + i + "' name='" + tName + i + "'";
    box += "class=" + clName + " value='" + val + "'>";
    box += "<label for='" + tName + i + "'>" + val + "</label><br />";
    box += "</div>";
    return box;
}
function makeCheckedBox(i, val, clName, tName) {
    let box = "<div class='food-box'>";
    box += "<input type='checkbox' id='" + tName + i + "' name='" + tName + i + "'";
    box += "class=" + clName + " value='" + val + "' checked>";
    box += "<label for='" + tName + i + "'>" + val + "</label><br />";
    box += "</div>";
    return box;
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
                var allergies = getallergies(sessionuser).catch(console.error);
                allergies.then(y => {
                        let allergies = [
                            "Peanut", "Tree-Nut", "Dairy", "Egg", "Gluten", "Fish", 
                            "Crustacean", "Shellfish", "Soy", "Sesame"   
                        ];

                        allergyhtml = "";
                        for (let j = 0; j < allergies.length; j++) {
                            if (y.includes(allergies[j])) {
                                allergyhtml += makeCheckedBox(j, allergies[j], "allergy", "all");
                            } else {
                                allergyhtml += makeunCheckedBox(j, allergies[j], "allergy", "all");
                            }
                        }

                        $("#allergies-content").html(allergyhtml);

                    var diet = getdiet(sessionuser).catch(console.error);
                    diet.then(z => {
                        let dietType = [
                            "Vegetarian", "Vegan", "Pescatarian", "Pork-Free", "Kosher", "Alcohol-Free",
                            "Red-Meat-Free", "Low-Sugar", "Paleo", "Keto-Friendly", 
                        ];

                        diethtml = ""
                        for (let j = 0; j < dietType.length; j++) {
                            if (z.includes(dietType[j])) {
                                diethtml += makeCheckedBox(j, dietType[j], "diets", "diet");
                            } else {
                                diethtml += makeunCheckedBox(j, dietType[j], "diets", "diet");
                            }
                        }

                        $("#diet-content").html(diethtml);

                        var membership = getmembership(sessionuser).catch(console.error);
                        membership.then(w => {
                            // console.log(w);
                            if (w == "false") {
                                $(".membership").html("MyMeals Basic Plan");
                            } else {
                                $(".membership").html("MyMeals Premium Plan");
                                $("#upgrade-form").html("");
                                $(".upgrade-msg").html("You are a premium member!");
                                $(".mem-instructions").html("You can access unlimited \
                                ingredients when you search for recipes.");
                                $(".upgrade-mem").css("margin", "0px");
                            }
                            res.send($.html());
                        })
                    })
                })
            });
        });
    }
})

router.post('/', function(request, response, next){
    // console.log(request.body);
    const sessionuser = request.session.user;
    if (sessionuser == null) {
        response.redirect("/");
    } else {
        // //database stuff
        //check which form being submitted
        if (request.body['formtype'] == "ingredients"){
            var ret = updateingred(sessionuser, request.body).catch(console.error);
            ret.then(x => { 
                response.redirect("/profile#ingred-box2");
            });
        } else if (request.body['formtype'] == "preferences"){
            // console.log(request.body);
            var ret = updatepref(sessionuser, request.body).catch(console.error);
            ret.then(x => { 
                response.redirect("/profile#pref-box2");
            });
        } else {
            var ret = updatemember(sessionuser).catch(console.error);
            ret.then(x => { 
                response.redirect("/profile#upgrade-box2");
            });
        }
        //reroute
        // response.send(request.body);
        // response.redirect("/profile");
    }
});

module.exports=router