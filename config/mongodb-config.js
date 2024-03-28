const config = require("../config/config.js");
const mongoConf = config.env.mongo;
//const mongoURI =  'mongodb+srv://testUser:testUser123@gennadysht.byyptar.mongodb.net/'

//const mongoURI =  `mongodb+srv://${mongoConf.user}:${mongoConf.pass}@${mongoConf.host}/`;
const mongoURI =  `${mongoConf.protocol}://${mongoConf.user ? mongoConf.user : "" }${mongoConf.pass ? ":" + mongoConf.pass +"@" : ""}${mongoConf.host}${mongoConf.port ? ":" + mongoConf.port : ""}/${mongoConf.db ? mongoConf.db : ""}`;

module.exports = {mongoURI}

