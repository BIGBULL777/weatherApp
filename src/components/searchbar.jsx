// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) { // onSearch will be a function passed from App.js
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city); 
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default SearchBar;