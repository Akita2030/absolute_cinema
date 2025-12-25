import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, selectMovie } from '../store/actions/movieActions';
import { toggleFavorite, isMovieInFavorites } from '../store/actions/favoriteActions';
import './MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading, error } = useSelector(state => state.movies);
  const { favorites } = useSelector(state => state.favorites);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleMovieClick = (movie) => {
    dispatch(selectMovie(movie));
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e, movie) => {
    e.stopPropagation(); // Prevent triggering movie click
    console.log('Adding to favorites:', movie.title);
    console.log('Current favorites before:', favorites);
    dispatch(toggleFavorite(movie, favorites));
  };

  // Получаем уникальные значения для фильтров
  const genres = useMemo(() => {
    const allGenres = movies.flatMap(movie => movie.genre);
    return ['all', ...Array.from(new Set(allGenres))];
  }, [movies]);

  const years = useMemo(() => {
    const allYears = movies.map(movie => movie.year);
    return ['all', ...Array.from(new Set(allYears)).sort((a, b) => b - a)];
  }, [movies]);

  const ratingOptions = [
    { value: 'all', label: 'Все рейтинги' },
    { value: '8+', label: '8.0 и выше' },
    { value: '7+', label: '7.0 и выше' },
    { value: '6+', label: '6.0 и выше' }
  ];

  // Фильтрация фильмов
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Поиск по названию
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.originalTitle.toLowerCase().includes(searchQuery.toLowerCase());

      // Фильтр по жанру
      const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);

      // Фильтр по году
      const matchesYear = selectedYear === 'all' || movie.year === parseInt(selectedYear);

      // Фильтр по рейтингу
      let matchesRating = true;
      if (selectedRating !== 'all') {
        const minRating = parseFloat(selectedRating.replace('+', ''));
        matchesRating = movie.rating >= minRating;
      }

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [movies, searchQuery, selectedGenre, selectedYear, selectedRating]);

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
        
        {/* Фильтры */}
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="search">Поиск по названию</label>
            <input
              id="search"
              type="text"
              className="filter-input"
              placeholder="Введите название фильма..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="genre">Жанр</label>
            <select
              id="genre"
              className="filter-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="all">Все жанры</option>
              {genres.filter(g => g !== 'all').map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year">Год выпуска</label>
            <select
              id="year"
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">Все годы</option>
              {years.filter(y => y !== 'all').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="rating">Рейтинг</label>
            <select
              id="rating"
              className="filter-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratingOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('all');
              setSelectedYear('all');
              setSelectedRating('all');
            }}
          >
            Сбросить фильтры
          </button>
        </div>

        <div className="results-count">
          Найдено фильмов: {filteredMovies.length}
        </div>

        <div className="movies-grid">
          {filteredMovies.length === 0 ? (
            <div className="no-results">
              <p>Фильмы не найдены. Попробуйте изменить параметры фильтрации.</p>
            </div>
          ) : (
            filteredMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="movie-card"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <button 
                      className={`favorite-btn ${isMovieInFavorites(favorites, movie.id) ? 'active' : ''}`}
                      onClick={(e) => handleFavoriteClick(e, movie)}
                      title={isMovieInFavorites(favorites, movie.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                    >
                      {isMovieInFavorites(favorites, movie.id) ? '❤️' : '🤍'}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
