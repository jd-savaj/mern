
const { MongoClient } = require("mongodb");
const Db = "mongodb://localhost:27017/Test";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // check "db"
      if (db)
      {
        _db = db.db("Test");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};
