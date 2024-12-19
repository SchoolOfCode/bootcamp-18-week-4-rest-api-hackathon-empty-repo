import { data } from "./data.js";

let movieId = 0;
let movies = data.map((movie) => ({ ...movie, id: ++movieId }));

//Create a function to get all movies
export async function getMovies() {
  return [...movies]; //... spreads out all of the elements/take everything in the array
}

//Create a function to get a particular movie
//define a function that takes in one parameter(the movieId)
export async function getMovieById(movieId) {
  //search through the movie array and return the first element with the matching id
  return movies.find(function (movie) {
    //access the id of the current movie object being processed by .find, check if it is equal to the movieId
    return movie.id === movieId;
  });
}

//Create a function to add a new movie
export async function addMovie(newMovie) {
  //Create the object with all the properties. Increase the id +1
  const created = {
    ...newMovie,
    id: ++movieId,
  };
  //Attach the new movie object to the movies database array
  movies = [...movies, created];
  //Return the new movie object
  return created;
}
