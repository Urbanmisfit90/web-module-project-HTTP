// App.js
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate hook

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import Edit from './components/EditMovieForm'

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
      // Redirect the user to the /movies route
      navigate('/movies'); // Use the navigate function to redirect
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const addToFavorites = (movie) => {
    // Add the movie to the list of favorite movies
    setFavoriteMovies(prevFavoriteMovies => [...prevFavoriteMovies, movie]);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
          <Routes>
            <Route path="/movies/edit/:id" element={<Edit />} />
            <Route path="/movies/:id" element={<Movie deleteMovie={deleteMovie} setMovies={setMovies} addToFavorites={addToFavorites} />} /> {/* Pass addToFavorites function to Movie component */}
            <Route path="/movies" element={<MovieList movies={movies} />} />
            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
