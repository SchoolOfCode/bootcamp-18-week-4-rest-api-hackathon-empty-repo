// Import the express module which is a web framework for Node.js
import express from "express";
import cors from "cors";

// Add a console log to check if server.js is loaded
console.log("server.js loaded successfully");

// Import the weaponsRouter from the specified path
import weaponsRouter from "./routes/weapons.js";

// Check if weaponsRouter was imported correctly
console.log("weaponsRouter imported:", weaponsRouter);

// Create an instance of an Express application
const app = express();

app.use(cors());

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Add a log before registering the router
console.log("Registering /weapons route");

// Use the weaponsRouter for any requests to the /weapons path
app.use("/weapons", weaponsRouter);

// Add a log to confirm the route was registered
console.log("Weapons route registered successfully");

// Export the app instance so it can be used in other files
export default app;
