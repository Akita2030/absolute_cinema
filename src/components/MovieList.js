import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, selectMovie } from '../store/actions/movieActions';
import './MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading, error } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleMovieClick = (movie) => {
    dispatch(selectMovie(movie));
    navigate(`/movie/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Загрузка фильмов...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки данных</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchMovies())}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="container">
        <h2 className="page-title">Коллекция фильмов Макото Синкая</h2>
        <div className="movies-grid">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-overlay">
                  <div className="movie-info">
                    <h4>{movie.title}</h4>
                    <p className="movie-year">({movie.year})</p>
                    <div className="movie-rating">
                      <span>⭐ {movie.rating}/10</span>
                    </div>
                    <div className="movie-duration">
                      <span>⏱️ {movie.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="movie-details">
                <h4>{movie.title}</h4>
                <p className="movie-director">Режиссер: {movie.director}</p>
                <div className="movie-genres">
                  {movie.genre.slice(0, 3).map((genre, idx) => (
                    <span key={idx} className="genre-tag">{genre}</span>
                  ))}
                </div>
                <p className="movie-description">{movie.description}</p>
                <button className="view-details-btn">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
