// src/components/WeatherDisplay.jsx
import React from 'react';

function WeatherDisplay({ weatherData, error, loading, city }) { // Accept props
  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  // Only render if we have data and it's structured as expected from WeatherAPI.com
  if (!weatherData || !weatherData.current || !weatherData.location) {
    return null; // Don't render anything if no data or incomplete data
  }

  // Destructure for easier access
  const { location, current } = weatherData;

  return (
    <div className="weather-display">
      <h2>{location.name}, {location.country}</h2>
      <p>Temperature: {current.temp_c}°C</p>
      <p>Feels like: {current.feelslike_c}°C</p>
      <p>Condition: {current.condition.text}</p>
      <img
        src={current.condition.icon}
        alt={current.condition.text}
      />
      <p>Humidity: {current.humidity}%</p>
      <p>Wind Speed: {current.wind_kph} kph</p>
    </div>
  );
}

export default WeatherDisplay;