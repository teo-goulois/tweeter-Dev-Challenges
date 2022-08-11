// libs/mongodb.js

import { MongoClient, ClientMetadata, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(
    "mongodb+srv://testuser:tesetuser0012@cluster0.dlhsl.mongodb.net/?retryWrites=true&w=majority"
  );
  await client.connect();
  let db = client.db('tweeter-devChallenges');

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
