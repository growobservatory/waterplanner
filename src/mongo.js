const mongo_server = process.env.MONGO_SERVER || 'mongo';

console.log(`using mongo server ${mongo_server}`);

const mongodb = require('mongodb').MongoClient;

const hasUser = () => {
  console.log(process.env.MONGO_USER);
  return  (process.env.MONGO_USER !== 'undefined' && process.env.MONGO_USER !== '' && typeof process.env.MONGO_USER !== 'undefined' );
}


const auth = (hasUser())? `${process.env.MONGO_USER}:${process.env.MONGO_PWD}@` : '';
const authMech = (hasUser())? '/?authMechanism=DEFAULT' : '';
const dbUrl = `mongodb://${auth}${mongo_server}:27017${authMech}`;

const dbName = 'water';
const table = 'plots';

async function connect() {
    try {
        return await mongodb.connect(dbUrl);
    } catch ( err ) {
      console.error(`COULD NOT CONNECT TO MONGO ${dbUrl}.`);
      console.error(err);
    }

}

async function getCollection () {
  const client = await connect(); 
  try {
    const db = client.db(dbName);
    return db.collection(table);
  } catch(e) {
    console.error(`COULD NOT CONNECT TO MONGO DATABASE ${dbName} ${table}.`);
  }
}


module.exports = { getCollection };
