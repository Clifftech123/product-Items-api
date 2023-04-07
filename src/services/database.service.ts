// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { product_items?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDatabase () {
  dotenv.config();

  // Create a new MongoClient
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
  await client.connect();

  // Select the database through the connection, using the database name specified in the .env file
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  // Apply schema validation to the collection
  await applySchemaValidation(db);

  // Select the collection through the database, using the collection name specified in the .env file
  const productCollection: mongoDB.Collection = db.collection(process.env.PRODUCT_COLLECTION_NAME);

  // Store the collection in the collections object
  collections.product_items = productCollection;

  // Log the connection details to the console
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productCollection.collectionName}`);
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.

async function applySchemaValidation(db: mongoDB.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        price: {
          bsonType: "number",
          description: "'price' is required and is a number",
        },
        category: {
          bsonType: "string",
          description: "'category' is required and is a string",
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it 
  await db.command({
    collMod: process.env.PRODUCT_COLLECTION_NAME,
    validator: jsonSchema,
  }).catch(async (error: mongoDB.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
      await db.createCollection(process.env.PRODUCT_COLLECTION_NAME, { validator: jsonSchema });
    }
  });
}
