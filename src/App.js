// src/App.js
import React, { useState } from 'react';
import './App.css';
import Landing from './components/landing'; // Import the new Landing component
import { fetchCurrentWeather } from './services/weatherapicall';

function App() {
  const [currentCitySearch, setCurrentCitySearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (cityFromSearchBar) => {
    setCurrentCitySearch(cityFromSearchBar);
    fetchWeather(cityFromSearchBar);
  };

  const fetchWeather = async (cityToFetch) => {
    // These checks can ideally be within weatherService.js too,
    // but keeping here for explicit app-level error messaging.
    if (!process.env.REACT_APP_WEATHER_API_KEY || !process.env.REACT_APP_WEATHER_API_BASE_URL) {
      setError("API Key or Base URL is not configured. Please check your .env file.");
      setLoading(false);
      return;
    }

    if (!cityToFetch) {
      setError("Please enter a city.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Call the service function to get the data
      const data = await fetchCurrentWeather(cityToFetch);
      setWeatherData(data); // Update state with data from the service
    } catch (err) {
      setError(err.message); // Catch and set error from the service
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    // App.js now renders just the Landing component and passes all necessary state/functions
    <Landing
      weatherData={weatherData}
      error={error}
      loading={loading}
      currentCitySearch={currentCitySearch}
      handleSearch={handleSearch}
    />
  );
}

export default App;