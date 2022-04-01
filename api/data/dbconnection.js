const mongoclient = require('mongodb').MongoClient;

let _connection = null;

const open = () => {
    if (get() == null) {
        mongoclient.connect(process.env.DB_URL, (err, client) => {
            if (err) {
                console.log("DB connection failed");
                return;
            }
            _connection = client.db("meanGames");
            console.log("DB connection successful");
        });
    }
};

const get = () => {
    return _connection;
};

module.exports = {
    open,
    get
}
