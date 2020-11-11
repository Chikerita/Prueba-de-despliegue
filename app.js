const mongo = require('mongodb');
const express = require('express');
const appServer = express();
const PORT = process.env.PORT || 3000;

appServer.use(express.json());

var url = "mongodb+srv://admin:btCafd9cdd1d29fY@pruebadedespliegue.uwb3h.mongodb.net/mydb?retryWrites=true&w=majority";
var MongoClient = new mongo.MongoClient(url);

appServer.listen(PORT, () => {
    console.log("SERVER IS LISTEN ON PORT:" , PORT);
});

appServer.get('/get', async (req, res) => {
    const results = await findQuestionarys(MongoClient);
    res.send(results[0].content);
});

async function findQuestionarys(client) {
    try {
        await client.connect();
        const options = {
            sort: {},
            projection: { _id: 0},
        };
        const cursor = client.db("mydb").collection('CuestionariosPublicos').find({}, options);
        const results = await cursor.toArray();
        console.log(results[0].content);
        if (results.length > 0) {
            console.log('Questionarys: ');
            results.forEach((result, i) => {
                console.log(`${result.content}`);
            });
        } else {
            console.log('No found');
        }
        return results;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

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