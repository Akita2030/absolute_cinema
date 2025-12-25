import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/movieActions';
import './AboutPage.css';

const AboutPage = () => {
  const dispatch = useDispatch();
  const { director } = useSelector(state => state.movies);
  const [directorData, setDirectorData] = useState(null);

  useEffect(() => {
    // Загружаем фильмы, чтобы получить данные о режиссере
    if (!director) {
      dispatch(fetchMovies());
    }
  }, [dispatch, director]);

  useEffect(() => {
    // Загружаем данные о режиссере из JSON
    const loadDirectorData = async () => {
      try {
        const response = await fetch('/movies.json');
        const data = await response.json();
        setDirectorData(data.director);
      } catch (error) {
        console.error('Ошибка загрузки данных о режиссере:', error);
      }
    };
    loadDirectorData();
  }, []);

  const directorInfo = directorData || director;

  return (
    <div className="about-page">
      <div className="container">
        <header className="about-header">
          <h1>О режиссере</h1>
        </header>

        {directorInfo ? (
          <div className="director-content">
            <div className="director-main">
              <div className="director-info">
                <h2>{directorInfo.name}</h2>
                <div className="director-meta">
                  <p><strong>Год рождения:</strong> {directorInfo.birthYear}</p>
                  <p><strong>Национальность:</strong> {directorInfo.nationality}</p>
                </div>
                <div className="director-bio">
                  <p>{directorInfo.bio}</p>
                </div>
              </div>
            </div>

            <div className="director-works">
              <h3>Знаменитые работы</h3>
              <ul className="works-list">
                {directorInfo.notableWorks?.map((work, index) => (
                  <li key={index}>{work}</li>
                ))}
              </ul>
            </div>

            <div className="director-awards">
              <h3>Награды и премии</h3>
              <ul className="awards-list">
                {directorInfo.awards?.map((award, index) => (
                  <li key={index}>🏆 {award}</li>
                ))}
              </ul>
            </div>

            <div className="director-quote">
              <blockquote>
                "Анимация — это не просто рисование. Это способ передать эмоции, 
                которые невозможно выразить словами. Каждый кадр — это история, 
                каждый цвет — это чувство."
              </blockquote>
              <cite>— Макото Синкай</cite>
            </div>
          </div>
        ) : (
          <div className="loading-director">
            <p>Загрузка информации о режиссере...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;

