import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";



// Get product 
// This will return all products
export const getProduct = async (_req: Request, res: Response) =>{
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
        const products = await collections.product_items.find({}).toArray();

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }

}


// Get product by id 
// This will return a single product with the id provided
export const getProductById = async (req: Request, res: Response) =>{
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const products = await collections.product_items.findOne(query);

        if (products) {
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }

}


// Create a new product
// This wil create a new product with a new id
export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = req.body;
        const result = await collections.product_items.insertOne(newProduct);

        result
            ? res.status(201).send(`Successfully created a new  items with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new  item.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }

}


// Update a product by id
// This will update the product with the id provided

export const updateProduct = async (req: Request, res: Response) => {

    const id = req?.params?.id;

    try {
        const updateProduct = req.body;
        const query = { _id: new ObjectId(id) };
        // $set adds or updates all fields
        const result = await collections.product_items.updateOne(query, { $set: updateProduct });

        result
            ? res.status(200).send(`Successfully updated items with id ${id}`)
            : res.status(304).send(`item with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

}



// Delete a product by id
// This will delete the product with the id provided
export const deleteProduct = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.product_items.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed  items with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove item with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`item with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

}
    

