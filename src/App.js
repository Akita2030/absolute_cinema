import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import FavoritesPage from './components/FavoritesPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* Header */}
          <header className="header">
            <nav className="navbar">
              <div className="nav-brand">
                <div className="logo-text">🎬</div>
                <h1>ABSOLUTE CINEMA</h1>
              </div>
              <ul className="nav-menu">
                <li><a href="/">Главная</a></li>
                <li><a href="/">Фильмы</a></li>
                <li><a href="/favorites">Избранное</a></li>
                <li><a href="/">О режиссере</a></li>
                <li><a href="/">Контакты</a></li>
              </ul>
            </nav>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
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
      </Router>
    </Provider>
  );
}

export default App;
