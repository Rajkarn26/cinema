import React, { useEffect, useState } from 'react';
import './movieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieFilter, setMovieFilter] = useState('');
  const [editingMovie, setEditingMovie] = useState(null);
  const [updatedMovie, setUpdatedMovie] = useState({
    movieName: '',
    actorName: '',
    releaseDate: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:5000/get_all_movies_api');
    const data = await res.json();
    setMovies(data);
  };

  const deleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await fetch(`http://localhost:5000/delete_movie_api/${id}`, {
        method: 'DELETE',
      });
      fetchMovies();
    }
  };

  const editMovie = (movie) => {
    setEditingMovie(movie);
    setUpdatedMovie({
      movieName: movie.movieName,
      actorName: movie.actorName,
      releaseDate: movie.releaseDate.split('T')[0],
      description: movie.description,
      imageUrl: '',
    });
  };

  const cancelEdit = () => setEditingMovie(null);

  const updateMovie = async (id) => {
    const formData = new FormData();
    formData.append('movieName', updatedMovie.movieName);
    formData.append('actorName', updatedMovie.actorName);
    formData.append('releaseDate', updatedMovie.releaseDate);
    formData.append('description', updatedMovie.description);
    if (updatedMovie.imageUrl) formData.append('image', updatedMovie.imageUrl);

    const res = await fetch(`http://localhost:5000/update_movie_api/${id}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await res.json();
    if (data.movie) {
      fetchMovies();
      setEditingMovie(null);
    }
  };

  const filteredMovies = movies.filter((m) =>
    m.movieName.toLowerCase().includes(movieFilter.toLowerCase())
  );

  return (
    <div className="main-container">
      <header className="header">
        <h1>🎬 Movie List</h1>
        <input
          className="search-box"
          type="text"
          placeholder="Search by Movie Name"
          value={movieFilter}
          onChange={(e) => setMovieFilter(e.target.value)}
        />
        <button className="back-btn" onClick={() => window.location.href = '/main'}>
          ⬅ Back
        </button>
      </header>

      <div className="movies-container">
        {filteredMovies.length === 0 ? (
          <div className="text-center">No movies found.</div>
        ) : (
          filteredMovies.map((movie) => (
            <div className="movie-card" key={movie._id}>
              <img
                src={`http://localhost:5000${movie.imageUrl}`}
                alt={movie.movieName}
                className="movie-img"
              />
              <div className="movie-info">
                <h3>{movie.movieName}</h3>
                <p><strong>Actor:</strong> {movie.actorName}</p>
                <p><strong>Release:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <div className="card-buttons">
                  <button className="btn-delete" onClick={() => deleteMovie(movie._id)}>Delete</button>
                  <button className="btn-edit" onClick={() => editMovie(movie)}>Edit</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingMovie && (
        <div className="edit-form-container">
          <div className="edit-form">
            <h2>Edit Movie</h2>
            <input
              type="text"
              value={updatedMovie.movieName}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, movieName: e.target.value })}
              placeholder="Movie Name"
            />
            <input
              type="text"
              value={updatedMovie.actorName}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, actorName: e.target.value })}
              placeholder="Actor Name"
            />
            <input
              type="date"
              value={updatedMovie.releaseDate}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, releaseDate: e.target.value })}
            />
            <textarea
              value={updatedMovie.description}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, description: e.target.value })}
              placeholder="Description"
            ></textarea>
            <input
              type="file"
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, imageUrl: e.target.files[0] })}
            />
            <div className="form-buttons">
              <button class="btn-primary" onClick={() => updateMovie(editingMovie._id)}>Update</button>
              <button class="btn-secondary" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
