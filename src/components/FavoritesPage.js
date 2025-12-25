import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectMovie } from '../store/actions/movieActions';
import { removeFromFavorites, clearFavorites } from '../store/actions/favoriteActions';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector(state => state.favorites);
  
  // Debug: Log favorites to console
  console.log('FavoritesPage - favorites:', favorites);
  console.log('FavoritesPage - favorites length:', favorites.length);

  const handleMovieClick = (movie) => {
    dispatch(selectMovie(movie));
    navigate(`/movie/${movie.id}`);
  };

  const handleRemoveFavorite = (e, movieId) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(movieId));
  };

  const handleClearAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить все избранные фильмы?')) {
      dispatch(clearFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-header">
            <h1>Избранные фильмы</h1>
            <p className="favorites-count">У вас пока нет избранных фильмов</p>
          </div>
          <div className="empty-favorites">
            <div className="empty-icon">💔</div>
            <h2>Список избранного пуст</h2>
            <p>Добавьте фильмы в избранное, нажав на сердечко на карточке фильма</p>
            <button 
              className="browse-movies-btn"
              onClick={() => navigate('/')}
            >
              Просмотреть фильмы
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>Избранные фильмы</h1>
          <div className="favorites-actions">
            <p className="favorites-count">
              {favorites.length} {favorites.length === 1 ? 'фильм' : 'фильмов'} в избранном
            </p>
            <button 
              className="clear-all-btn"
              onClick={handleClearAll}
            >
              Очистить все
            </button>
            <button 
              className="debug-btn"
              onClick={() => {
                console.log('Current favorites state:', favorites);
                console.log('localStorage favorites:', localStorage.getItem('movieFavorites'));
              }}
            >
              Debug
            </button>
          </div>
        </div>

        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div 
              key={movie.id} 
              className="favorite-movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} />
                <button 
                  className="remove-favorite-btn"
                  onClick={(e) => handleRemoveFavorite(e, movie.id)}
                  title="Удалить из избранного"
                >
                  ❌
                </button>
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
                <button 
                  className="view-details-btn"
                  onClick={() => handleMovieClick(movie)}
                >
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

export default FavoritesPage;
