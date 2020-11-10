const mongo = require('mongodb');
const express = require('express');
const appServer = express();
const PORT = process.env.PORT || 3000;

appServer.use(express.json());

var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017";

appServer.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});

appServer.get('/get', (req, res) => {
    res.send("Funciona");
});

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