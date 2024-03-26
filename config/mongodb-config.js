const config = require("../config/config.js");
const mongoConf = config.env.mongo;
//const mongoURI =  'mongodb+srv://testUser:testUser123@gennadysht.byyptar.mongodb.net/'

//const mongoURI =  `mongodb+srv://${mongoConf.user}:${mongoConf.pass}@${mongoConf.host}/`;
const mongoURI =  `${mongoConf.protocol}://${mongoConf.user ? mongoConf.user : "" }${mongoConf.pass ? ":" + mongoConf.pass +"@" : ""}${mongoConf.host}${mongoConf.port ? ":" + mongoConf.port : ""}/${mongoConf.db ? mongoConf.db : ""}`;

module.exports = {mongoURI}

// ?retryWrites=true&w=majority&appName=GennadySht

// mongodb://localhost:27017

// const { MongoClient } = require('mongodb');

// const URI = "mongodb://localhost:27017"; // Replace with your connection URI

// const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect((err, db) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const adminDb = db.admin();

//   adminDb.listDatabases((err, databases) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log("Databases:");
//     databases.databases.forEach(db => console.log(`- ${db.name}`));

//     client.close();
//   });
// });



// const { MongoClient } = require('mongodb');

// const mongoURI = `mongodb://GennadySht:BergG21093@localhost:27017/My_blog`;

// // const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // ... rest of your code
// module.exports = {mongoURI}
