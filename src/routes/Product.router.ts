
import express, { Request, Response } from "express";

import { getProduct , getProductById , createProduct, updateProduct , deleteProduct  } from "../controllers/controller.products";
export const productRouter = express.Router();

productRouter.use(express.json());


// Get all products
// Example route: http://localhost:3000/products
productRouter.get("/", getProduct);


// Get product by id
// Example route: http://localhost:3000/products/610aaf458025d42e7ca9fcd0
productRouter.get("/:id", getProductById);



// Create a new product
// Example route: http://localhost:3000/products
// Note: This route will return a 500 if the id is not found
productRouter.post("/", createProduct);


// Update a product by id
// Example route: http://localhost:3000/products/610aaf458025d42e7ca9fcd0
productRouter.put("/:id", updateProduct);


// Delete a product by id
// Example route: http://localhost:3000/products/610aaf458025d42e7ca9fcd0

productRouter.delete("/:id", deleteProduct);
