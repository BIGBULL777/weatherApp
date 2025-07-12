// src/components/Landing.jsx
import React from 'react';
import SearchBar from './searchbar'; // Assuming SearchBar is in the same components folder
import WeatherDisplay from './weatherdisplay'; // Assuming WeatherDisplay is in the same components folder

function Landing({ weatherData, error, loading, currentCitySearch, handleSearch }) {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay
        weatherData={weatherData}
        error={error}
        loading={loading}
        city={currentCitySearch}
      />
    </div>
  );
}

export default Landing;