import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [director, setDirector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Загрузка данных из JSON
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/movies.json');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setMovies(data.movies);
        setDirector(data.director);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки фильмов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [movies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  // Показываем загрузку
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Загрузка фильмов...</h2>
        </div>
      </div>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <div className="App">
        <div className="error-container">
          <h2>Ошибка загрузки данных</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <div className="nav-brand">
            <div className="logo-text">🎬</div>
            <h1>ABSOLUTE CINEMA</h1>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Главная</a></li>
            <li><a href="#about">О режиссере</a></li>
            <li><a href="#films">Фильмы</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>ДОБРО ПОЖАЛОВАТЬ В МИР КИНО</h2>
          <p>Погрузитесь в удивительные истории Макото Синкая :3</p>
          <button className="cta-button">СМОТРЕТЬ ФИЛЬМЫ</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <section className="features">
          <div className="container">
            <h3>КОЛЛЕКЦИЯ ФИЛЬМОВ</h3>
            <div className="slider-container">
              <button className="slider-btn prev-btn" onClick={prevSlide}>
                ‹
              </button>
              <div className="slider-wrapper">
                <div 
                  className="slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {movies.map((movie, index) => (
                    <div key={movie.id} className="feature-card">
                      <div className="feature-image">
                        <img src={movie.poster} alt={movie.title} />
                      </div>
                      <h4>{movie.title}</h4>
                      <p className="movie-year">({movie.year})</p>
                      <p>{movie.description}</p>
                      <div className="movie-rating">
                        <span className="rating-label">Рейтинг:</span>
                        <span className="rating-value">{movie.rating}/10</span>
                      </div>
                      <div className="movie-genres">
                        {movie.genre.map((genre, idx) => (
                          <span key={idx} className="genre-tag">{genre}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="slider-btn next-btn" onClick={nextSlide}>
                ›
              </button>
              <div className="slider-dots">
                {movies.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Movies Grid Section */}
        <section className="movies-grid">
          <div className="container">
            <h3>ВСЕ ФИЛЬМЫ</h3>
            <div className="movies-container">
              {movies.map((movie, index) => (
                <div key={movie.id} className="movie-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="movie-overlay">
                      <div className="movie-info">
                        <h4>{movie.title}</h4>
                        <p className="movie-year-small">({movie.year})</p>
                        <div className="movie-rating-small">
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
                    <div className="movie-genres-small">
                      {movie.genre.slice(0, 3).map((genre, idx) => (
                        <span key={idx} className="genre-tag-small">{genre}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about">
          <div className="container">
            <h3>О РЕЖИССЕРЕ</h3>
            {director && (
              <div className="director-info">
                <h4>{director.name} ({director.birthYear})</h4>
                <p>{director.bio}</p>
                <div className="director-details">
                  <div className="detail-item">
                    <strong>Национальность:</strong> {director.nationality}
                  </div>
                  <div className="detail-item">
                    <strong>Известные работы:</strong>
                    <ul>
                      {director.notableWorks.map((work, index) => (
                        <li key={index}>{work}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="detail-item">
                    <strong>Награды:</strong>
                    <ul>
                      {director.awards.map((award, index) => (
                        <li key={index}>{award}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Контакты</h4>
              <p>Email: aktan@gmail.com</p>
              <p>Телефон: +996111111111</p>
            </div>
            <div className="footer-section">
              <h4>Социальные сети</h4>
              <div className="social-links">
                <a href="https://facebook.com">Facebook</a>
                <a href="https://twitter.com">Twitter</a>
                <a href="https://instagram.com">Instagram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ABSOLUTE CINEMA. Все права защищены. (нет)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
