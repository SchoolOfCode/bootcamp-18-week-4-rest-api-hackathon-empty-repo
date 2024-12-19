// Import the express module which is a web framework for Node.js
import express from "express";

// Import the astronautsRouter from the specified path
import weaponsRouter from "./routes/weapons.js";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Use the astronautsRouter for any requests to the /astronauts path
app.use("/weapons", astronautsRouter);

// Export the app instance so it can be used in other files
export default app;
