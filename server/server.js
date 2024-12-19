// Import the express module which is a web framework for Node.js
import express from "express";
import cors from "cors";

// Import the weaponssRouter from the specified path
import weaponsRouter from "./routes/weapons.js";

// Create an instance of an Express application
const app = express();

app.use(cors());

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Use the weaponssRouter for any requests to the /weapons path
app.use("/weapons", weaponsRouter);

// Export the app instance so it can be used in other files
export default app;
