// Importing express module
const express=require("express");
const router=express.Router();
  
async function signin(usn, pswd) {
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
        return usn;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function signup(usn, pswd, pswd2) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^
       
    if(pswd != pswd2)  {
        return "pswdfail";
    }
    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        // check here if user already exists.
        const query = { username : usn};
        // print a message if no documents were found
        if ((await user.countDocuments(query)) === 0) {
            //username not taken
            // create a document to insert
            const doc = {
                username: usn,
                password: pswd,
                ingredients: [],
                allergies: [],
                dietprefs: [],
                membership: "false"
            }
            const result = await user.insertOne(doc);
            return usn;
        }
        return null;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
// Handling request using router
router.get("/",(req,res,next)=>{
    res.sendFile("signupfail.html", {root: __dirname });
});

router.post('/', function(request, response, next){
    //database stuff
    if (request.body['signUpForm'] == "false"){
        //sign in
        var ret = signin(request.body['username'], request.body['password']).catch(console.error);
        ret.then(x => { 
            if(x != null) {
                request.session.user = x;
                request.session.save();
                response.redirect("/profile")
            } else {
                //change to some failure page
                response.redirect("/signinfail");
            }
            // app.get("/logout", (req, res) => {
            //     req.session.destroy();
            //     res.send("Your are logged out ");
            // });
        });
    } else {
        //sign up
        var ret = signup(request.body['username'], request.body['passwordOne'], request.body['passwordTwo']).catch(console.error);
        ret.then(x => { 
            if (x == "pswdfail") {
                response.redirect("/pswdfail")
            } else if (x != null) {
                request.session.user = x;
                request.session.save();
                response.redirect("/profile")
            } else {
                response.redirect("/signupfail")
            }
        });
    }
});

// Importing the router
module.exports=router;