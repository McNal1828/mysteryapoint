import { MongoClient } from 'mongodb';

const uri = 'mongodb://mcmongo:ahdrhfnxmvotmdnjem@192.168.230.170:11077/';
const options = {};
/**
 * @type {MongoClient}
 */
let mongoClient;
let mongoClientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    mongoClient = new MongoClient(uri, options);
    global._mongoClientPromise = mongoClient.connect();
  }
  mongoClientPromise = global._mongoClientPromise;
} else {
  mongoClient = new MongoClient(uri, options);
  mongoClientPromise = mongoClient.connect();
}

export default mongoClientPromise;
