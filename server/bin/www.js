// Import the app module from the parent directory (our server application logic)
import app from "../server.js";

// Define the port number, use the value from environment variable PORT if available, otherwise default to 8080
const PORT = process.env.PORT || 8080;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is successfully running
  console.log(`App listening at http://localhost:${PORT}`);
});
