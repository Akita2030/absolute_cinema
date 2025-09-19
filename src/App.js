import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      image: "https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/cb3b1887-361d-4b93-8b33-8dce4acf2a23/576x",
      title: "Твоё имя",
      description: "Анимационный фильм о любви, времени и судьбе"
    },
    {
      image: "https://avatars.mds.yandex.net/get-kinopoisk-image/9784475/de727406-1f97-4205-b509-3a73d3dc2157/600x900",
      title: "Дети, которые гоняются за звёздами",
      description: "История о мечтах и стремлении к звёздам"
    },
    {
      image: "https://avatars.mds.yandex.net/get-ott/2385704/2a00000198536dd6b86347d06b9196570b26/600x900",
      title: "Сад изящных слов",
      description: "Поэтичная история о взрослении и первой любви"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

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
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-image">
                        <img src={feature.image} alt={feature.title} />
                      </div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className="slider-btn next-btn" onClick={nextSlide}>
                ›
              </button>
              <div className="slider-dots">
                {features.map((_, index) => (
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

        <section className="about">
          <div className="container">
            <h3>О РЕЖИССЕРЕ</h3>
            <p>
              Макото Синкай - выдающийся японский режиссер анимации, известный своими поэтичными 
              и визуально потрясающими фильмами. Его работы сочетают в себе глубокие эмоции, 
              красивую анимацию и философские размышления о времени, любви и человеческих отношениях.
            </p>
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
