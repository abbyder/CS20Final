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

// Handling login request
router.get("/",(req,res,next)=>{
    // const sessionuser = req.session.user;
    // if (sessionuser == null) {
    //     res.redirect("/");
    // } else {
        // res.send(sessionuser);
        // res.sendFile("profile.html", {root: __dirname });
        // var userInput = req.body.userInput;
        fs.readFile("recipelookup.html", "utf8", function(err, data) {
            if (err) throw err;

            var $ = cheerio.load(data);
            
            var ingredients = getingred("1").catch(console.error);
            ingredients.then(x => { 
                //NEED TO ADD SUBSCRIPTION THING HERE
                for (i = 0; i < x.length; i++) {
                    $("#listofingred").append('<input type="radio" name="ingredient" class="ingredient" value="' + x[i] + '" id="ingredient' + i + '"></input><label for="ingredient' + i + '">' + x[i] + '</label></br>');
                }
                // <input type="radio" name="ingredient" class="ingredient" value="chicken" id="ingredient1"></input>
                // <label for="ingredient1">Chicken</label>
                // <br>
                // var allergies = getallergies("1").catch(console.error);
                // allergies.then(y => {
                //         let allergies = [
                //             "Peanuts", "Tree-Nut", "Dairy", "Eggs", "Gluten", "Fish", 
                //             "Crustcean", "Shellfish", "Soy", "Sesame"   
                //         ];

                //         allergyhtml = "";
                //         for (let j = 0; j < allergies.length; j++) {
                //             if (y.includes(allergies[j])) {
                //                 allergyhtml += makeCheckedBox(j, allergies[j], "allergy", "all");
                //             } else {
                //                 allergyhtml += makeunCheckedBox(j, allergies[j], "allergy", "all");
                //             }
                //         }

                //         $("#allergies-content").html(allergyhtml);

                //     var diet = getdiet("1").catch(console.error);
                //     diet.then(z => {
                //         let dietType = [
                //             "Vegetarian", "Vegan", "Pescatarian", "Pork-Free", "Kosher", "Alcohol-Free",
                //             "Red-Meat-Free", "Low Sugar", "Paleo", "Keto", 
                //         ];

                //         diethtml = ""
                //         for (let j = 0; j < dietType.length; j++) {
                //             if (z.includes(dietType[j])) {
                //                 diethtml += makeCheckedBox(j, dietType[j], "diets", "diet");
                //             } else {
                //                 diethtml += makeunCheckedBox(j, dietType[j], "diets", "diet");
                //             }
                //         }

                //         $("#diet-content").html(diethtml);

                //         res.send($.html());
                //     })
                // })
                        res.send($.html());
            });
        });
    // }
})

// router.post('/', function(request, response, next){
//     //database stuff
//     main(request.body['username'], request.body['password']).catch(console.error);

//     //reroute
// 	// response.send(request.body);
// 	response.redirect("/profile");

// });

module.exports=router