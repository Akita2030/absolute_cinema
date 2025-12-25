import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import FavoritesPage from './components/FavoritesPage';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { authLogout } from './store/actions/authActions';
import ProtectedRoute from './components/ProtectedRoute';
import BookingPage from './components/BookingPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';

const HeaderAuth = () => {
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  if (isAuthenticated) {
    return (
      <div className="nav-auth">
        <span className="nav-user">{user?.username || user?.email}</span>
        <button className="nav-logout" onClick={() => dispatch(authLogout())}>Выйти</button>
      </div>
    );
  }
  return (
    <div className="nav-auth">
      <Link to="/login">Войти</Link>
      <Link to="/register">Регистрация</Link>
    </div>
  );
};

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
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/favorites">Избранное</Link></li>
                <li><Link to="/booking">Бронирование</Link></li>
                <li><Link to="/about">О режиссере</Link></li>
                <li><Link to="/contacts">Контакты</Link></li>
              </ul>
              <HeaderAuth />
            </nav>
          </header>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
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
