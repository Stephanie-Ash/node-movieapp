const { MongoClient } = require('mongodb');

const _uri = 

const dbCon = (coll, cb) => {
    MongoClient.connect(_uri)
        .then(async (client) => {
            const db = client.db('sample_mflix').collection(coll);
            await cb(db);
            client.close();
        })
        .catch
};

module.exports = dbCon;