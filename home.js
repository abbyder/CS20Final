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

async function signup(usn, pswd) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    //{useUnifiedTopology: true} ??? ^

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
                filters: [],
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
    res.sendFile("home.html", {root: __dirname });
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
                response.redirect("/recipelookup");
            }
            // app.get("/logout", (req, res) => {
            //     req.session.destroy();
            //     res.send("Your are logged out ");
            // });
        });
    } else {
        //sign up
        var ret = signup(request.body['username'], request.body['password']).catch(console.error);
        ret.then(x => { 
            if(x != null) {
                request.session.user = x;
                request.session.save();
                response.redirect("/profile")
            } else {
                //change to some failure page
                // response.redirect("/recipelookup");
                // fs.readFile("home.html", "utf8", function(err, data) {
                //     if (err) throw err;

                //     var $ = cheerio.load(data);

                //     $("#errorSignUpUser").text("username is already in use");
                //     response.send($.html());
                // });
                const https = require('https');
                https.get("/", function(res) {
                    console.log(res.statusCode);
                    res.setEncoding('utf8');
                    res.on('data', function(data) {
                        console.log(data);
                    });
                }).on('error', function(err) {
                    console.log(err);
                });
            }
        });
    }
    //reroute
	// response.send(request.body);
	// response.redirect("/profile");

});

//NEED TO ADD:
//hidden field to home page forms to distinguish which form is being submitted.

// Importing the router
module.exports=router;