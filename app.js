// Import the express module which is a web framework for Node.js
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

// Export the app instance so it can be used in other files
export default app;

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

import { getMovies, getMovieById, addMovie } from "./helpers.js";

//get request for all movies
app.get("/movies", async function (req, res) {
  const returnedData = await getMovies();
  const allMovies = {
    success: true,
    payload: returnedData,
  };
  res.json(allMovies);
});

//get request for a particular movie
//get request with path as /movies:id
app.get("/movies/:id", async function (req, res) {
  //delcare the id and make sure we change the id to a number
  //use the getMoviebyId function with one parameter
  const returnedData = await getMovieById(Number(req.params.id));
  //create a success/payload object to store the function
  const movieByID = {
    success: true,
    payload: returnedData,
  };
  //respond to the client with the specific movie
  res.json(movieByID);
});

//post request for a new movie
app.post("/movies", async function (req, res) {
  //store in a variable the data from the new movie object that will be returned by the addMovie function
  const newMovieData = await addMovie(req.body);
  //JSON response with JSend specification
  const movieInfo = {
    success: true,
    payload: newMovieData,
  };
  //send a 201 status code for the newly created resource
  res.status(201).json(movieInfo);
});
