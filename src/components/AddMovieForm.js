// AddMovieForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    genre: '',
    metascore: 0,
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to add the new movie
      await axios.post('http://localhost:9000/api/movies', movie);
      // Update the global state (list of movies)
      // This assumes you have access to setMovies function
      // setMovies([...movies, movie]); // Assuming movies is the state variable holding the list of movies
      // Redirect to the /movies route
      navigate('/movies');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={movie.title} onChange={handleChange} />
        </div>
        {/* Other input fields for director, genre, metascore, description */}
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;