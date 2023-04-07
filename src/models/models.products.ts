// External dependencies
import { ObjectId } from "mongodb";
// ObjectID is a type from the MongoDB driver that represents a unique identifier for a document in a MongoDB collection.



// Class Implementation
// This is the class that will be used to create new product objects
export default class Product {
    constructor( public description:string , public name: string, public price: number, public category: string, public id?: ObjectId) {}
}  