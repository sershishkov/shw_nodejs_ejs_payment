const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://sershishkov:q4oVcORO8hagxtVb@cluster0-071ff.mongodb.net/shop?retryWrites=true",
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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"
//     }
//   })
// );
