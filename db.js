async function main(usn, pswd) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
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

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);

const { fstat } = require('fs');
var http = require('http');
var url = require('url');
const express = require('express');
const router=express.Router()
const app = express();
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(request, response, next){
	// response.send(`
    //     <form method="POST" action="/">
    //             <label>Username</label>
    //             <input type="text" name="username" id="username"/>
    //             <label>Password</label>
    //             <input type="text" name="password" id="password"/>
    //             <input type="submit" name="submit_button" class="btn btn-primary" value="Add" />
    //     </form>
	// `);
    response.sendFile("home.html", {root: __dirname });
});

app.post('/', function(request, response, next){
    main(request.body['username'], request.body['password']).catch(console.error);

	response.send(request.body);

});

app.listen(8080);




// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     // res.write('Hello world!');
//     // res.write("<br /> The url is: " + req.url);
//     var theUrl = req.url.split('?')[0];
//     if (theUrl == "/") {
//         res.write("This is the home page");
//         res.write("<form method='get' action='/process'>");
//         res.write("Name: <input type='text' name='name'><br/>");
//         res.write("<input type='submit'>");
//         res.write("</form>");
//     } else if (theUrl == "/process") {
//         res.write("This is the process page");
//         var qobj = url.parse(req.url, true).query;
//         var txt = qobj.name;
//         res.write("<br />The url/query string is: " + req.url);
//         res.write("<br />The name is: " + txt);
//     } else {
//         res.write("Invalid page request");
//     }
//     res.end();
// }).listen(8080);




// var qs = require('querystring');
// var body = '';
// req.on('data', chunk => {body += chunk.toString();});
// req.on('end', () => {
//    console.log(qs.parse(body).x);
//    res.end(); 
// });



// var readline = require('readline');
// var fs = require('fs');

// var myFile = readline.createInterface({
//     input: fs.createReadStream('test.txt');
// });

// myFile.on('line', function(line) {
//     console.log(line);
// });




// http.createServer(function (req, res) {
//     file = "hello.html";
//     fs.readFile(file, function(err, txt) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(txt);
//         res.end();
//     });
// }).listen(8080);