const mongo = require('mongodb');
const express = require('express');
const appServer = express();
const PORT = process.env.PORT || 3000;

appServer.use(express.json());

var url = "mongodb+srv://admin:Str4ngeWorld.@pruebadedespliegue.uwb3h.mongodb.net/mydb?retryWrites=true&w=majority";
var MongoClient = mongo.MongoClient(url);

appServer.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});

appServer.get('/get', (req, res) => {

    await listDatabases();

    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("mydb");
        const options = {
            sort: {},
            projection: { _id: 0},
        };
        db.collection('CuestionariosPublicos').find({}, options).toArray(function (err, result){
            if (err) throw err;
            res.send(result);
            client.close();
        });
    });
});

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

appServer.put('/put', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("mydb");
        db.collection('CuestionariosPublicos').insertOne(req.body);
        client.close();
    });
    res.send('Cuestionario recibido');
});

appServer.get('/getp', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var db = client.db("mydb");
        const options = {
            sort: {},
            projection: { _id: 0},
        };
        db.collection('CuestionariosPublicos').find({}, options).toArray(function (err, result){
            if (err) throw err;
            res.send(result);
            client.close();
        });
    });
});