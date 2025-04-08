import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import searchIcon from './assets/searchIcon.png';

export default function App() {
  const [location, setLocation] = useState(null);
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location) {
      fetch(`http://api.weatherapi.com/v1/current.json?key=12747fcd44094535afe13619252603&q=${location}`)
        .then(res => res.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather:', error));
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLocation(input.trim());
      setInput("");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          className="searhbar"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter location..."
          aria-label="Search location"
        />
        <button type="submit" aria-label="Search weather">
          <img width="20px" className="searcIcon" src={searchIcon} alt="Search" />
        </button>
      </form>

      {weatherData ? (
        <div className="weather-info">
          <h1>{weatherData.location.name}, {weatherData.location.country}</h1>
          <p className="condition-text">{weatherData.current.condition.text}</p>
          <img
            className="weatherIcon"
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <h2>{weatherData.current.temp_c}°C</h2>
          <div className="additional-info">
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      ) : (
        <p className="loading">Enter a location to get weather information</p>
      )}
    </div>
  );
}