import React from 'react';
import './ContactsPage.css';

const ContactsPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    e.target.reset();
  };

  return (
    <div className="contacts-page">
      <div className="container">
        <header className="contacts-header">
          <h1>Контакты</h1>
          <p>Свяжитесь с нами любым удобным способом</p>
        </header>

        <div className="contacts-content">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>aktan@gmail.com</p>
              <a href="mailto:aktan@gmail.com" className="contact-link">
                Написать письмо
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h3>Телефон</h3>
              <p>+996 111 111 111</p>
              <a href="tel:+996111111111" className="contact-link">
                Позвонить
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Адрес</h3>
              <p>Кыргызстан, Бишкек</p>
              <p className="contact-subtext">Кинотеатр ABSOLUTE CINEMA</p>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Отправить сообщение</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Тема</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Тема сообщения"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Введите ваше сообщение..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Отправить сообщение
              </button>
            </form>
          </div>

          <div className="social-section">
            <h2>Мы в социальных сетях</h2>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">📘</span>
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">🐦</span>
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">📷</span>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;

