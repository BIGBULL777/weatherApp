// src/components/Landing.jsx
import React from 'react';
import SearchBar from './searchbar'; // Assuming SearchBar is in the same components folder
import WeatherDisplay from './weatherdisplay'; // Assuming WeatherDisplay is in the same components folder
import Navbar from './navbar';

function Landing({ weatherData, error, loading, currentCitySearch, handleSearch }) {
  return (
    <div className="App">
      <Navbar /> {/* Render the Navbar component here */}
      <h1>My Awesome Weather</h1> {/* This is your main app title, not the Navbar title */}
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