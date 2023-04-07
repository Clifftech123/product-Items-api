import express from "express";
import { Application } from "express";
 import * as dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service"
import { productRouter } from "./routes/Product.router";


  // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

 const app: Application = express();
const port =  process.env.PORT  // default port to listen


// Database connection
connectToDatabase()



// define a route handler for the products route
    .then(() => {
        app.use("/products", productRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });