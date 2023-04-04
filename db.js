async function main() {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://erickim:123@cluster0.wzucucu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("user_info");
        const user = database.collection("users");
        // create a document to insert
        const doc = {
            username: "username3",
            password: "password3",
            ingredients: ["ingred3", "ingred4"],
            filters: ["filt3", "filt4"],
        }
        const result = await user.insertOne(doc);
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);