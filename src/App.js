import React, { useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHERAPI_BASE_URL = 'https://api.weatherapi.com/v1/current.json'; // Endpoint for current weather

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    setWeatherData(null); // Clear previous weather data

    try {
      // WeatherAPI.com uses 'q' for query (city name or coordinates)
      const url = `${WEATHERAPI_BASE_URL}?key=${API_KEY}&q=${city}`;
      console.log("WeatherAPI.com Request URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        // WeatherAPI.com often returns JSON errors even for non-200 responses
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error(`Authentication failed: ${errorData.error ? errorData.error.message : 'Invalid API key.'}`);
        } else if (response.status === 400) {
          throw new Error(`City not found or invalid request: ${errorData.error ? errorData.error.message : 'Please check city name.'}`);
        }
        throw new Error(`Failed to fetch weather: ${response.status} ${errorData.error ? errorData.error.message : response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);
      console.log("Fetched Weather Data (WeatherAPI.com):", data); // Inspect this to see the structure!
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="error-message">Error: {error}</p>}

      {weatherData && weatherData.current && weatherData.location && ( // Ensure all relevant data exists
        <div className="weather-display">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Feels like: {weatherData.current.feelslike_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon} // WeatherAPI provides full URL
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} kph</p> {/* Default is kph, can request mph/ms */}
          {/* You can add more data from weatherData.current (e.g., pressure, UV, visibility) */}
        </div>
      )}
    </div>
  );
}

export default App;