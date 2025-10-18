import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies, selectMovie, clearSelectedMovie } from '../store/actions/movieActions';
import './MovieDetail.css';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { movies, selectedMovie, loading, error } = useSelector(state => state.movies);

  useEffect(() => {
    // Если фильмы еще не загружены, загружаем их
    if (movies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies.length]);

  useEffect(() => {
    // Находим фильм по ID и устанавливаем его как выбранный
    if (movies.length > 0 && id) {
      const movie = movies.find(m => m.id === parseInt(id));
      if (movie) {
        dispatch(selectMovie(movie));
      }
    }
  }, [dispatch, movies, id]);

  const handleBackClick = () => {
    dispatch(clearSelectedMovie());
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Загрузка фильма...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка загрузки данных</h2>
        <p>{error}</p>
        <button onClick={handleBackClick}>Вернуться к списку</button>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="error-container">
        <h2>Фильм не найден</h2>
        <button onClick={handleBackClick}>Вернуться к списку</button>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <div className="container">
        <button className="back-button" onClick={handleBackClick}>
          ← Назад к списку
        </button>
        
        <div className="movie-detail-content">
          <div className="movie-poster-section">
            <img 
              src={selectedMovie.poster} 
              alt={selectedMovie.title}
              className="movie-poster-large"
            />
            <div className="movie-rating-large">
              <span className="rating-number">{selectedMovie.rating}</span>
              <span className="rating-max">/10</span>
            </div>
          </div>
          
          <div className="movie-info-section">
            <h1 className="movie-title">{selectedMovie.title}</h1>
            <h2 className="movie-original-title">{selectedMovie.originalTitle}</h2>
            
            <div className="movie-meta">
              <div className="meta-item">
                <span className="meta-label">Год:</span>
                <span className="meta-value">{selectedMovie.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Режиссер:</span>
                <span className="meta-value">{selectedMovie.director}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Длительность:</span>
                <span className="meta-value">{selectedMovie.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Бюджет:</span>
                <span className="meta-value">{selectedMovie.budget}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Кассовые сборы:</span>
                <span className="meta-value">{selectedMovie.boxOffice}</span>
              </div>
            </div>
            
            <div className="movie-genres">
              <span className="genres-label">Жанры:</span>
              <div className="genres-list">
                {selectedMovie.genre.map((genre, idx) => (
                  <span key={idx} className="genre-tag-large">{genre}</span>
                ))}
              </div>
            </div>
            
            <div className="movie-description">
              <h3>Описание</h3>
              <p>{selectedMovie.description}</p>
            </div>
            
            {selectedMovie.awards && selectedMovie.awards.length > 0 && (
              <div className="movie-awards">
                <h3>Награды</h3>
                <ul>
                  {selectedMovie.awards.map((award, idx) => (
                    <li key={idx}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedMovie.trailer && (
              <div className="movie-trailer">
                <a 
                  href={selectedMovie.trailer} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="trailer-button"
                >
                  🎬 Смотреть трейлер
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
