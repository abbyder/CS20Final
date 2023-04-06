// async function main() {
//     var MongoClient = require('mongodb').MongoClient;
//     var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();

//         const database = client.db("user_info");
//         const user = database.collection("users");
//         // create a document to insert
//         const doc = {
//             username: "username3",
//             password: "password3",
//             ingredients: ["ingred3", "ingred4"],
//             filters: ["filt3", "filt4"],
//         }
//         const result = await user.insertOne(doc);
    
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }

// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);

var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('Hello world!');
    // res.write("<br /> The url is: " + req.url);
    var theUrl = req.url.split('?')[0];
    if (theUrl == "/") {
        res.write("This is the home page");
        res.write("<form method='get' action='/process'>");
        res.write("Name: <input type='text' name='name'><br/>");
        res.write("<input type='submit'>");
        res.write("</form>");
    } else if (theUrl == "/process") {
        res.write("This is the process page");
        var qobj = url.parse(req.url, true).query;
        var txt = qobj.name;
        res.write("<br />The url/query string is: " + req.url);
        res.write("<br />The name is: " + txt);
    } else {
        res.write("Invalid page request");
    }
    res.end();
}).listen(8080);