// src/services/weatherService.js

// Import environment variables directly here, or pass them as arguments
// It's generally cleaner to pass them if the service might be used in different contexts
// but for a small app, directly importing is fine.
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHERAPI_BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

export const fetchCurrentWeather = async (city) => {
  // Basic validation for configuration (can be handled earlier in App.js too)
  if (!API_KEY || !WEATHERAPI_BASE_URL) {
    throw new Error("API Key or Base URL is not configured. Please check your .env file.");
  }

  if (!city) {
    throw new Error("Please enter a city.");
  }

  try {
    const url = `${WEATHERAPI_BASE_URL}?key=${API_KEY}&q=${city}`;
    console.log("WeatherAPI.com Request URL (from service):", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json(); // Attempt to read error JSON
      if (response.status === 401) {
        throw new Error(`Authentication failed: ${errorData.error ? errorData.error.message : 'Invalid API key.'}`);
      } else if (response.status === 400) {
        throw new Error(`City not found or invalid request: ${errorData.error ? errorData.error.message : 'Please check city name.'}`);
      }
      // Fallback for other HTTP errors
      throw new Error(`Failed to fetch weather: ${response.status} ${errorData.error ? errorData.error.message : response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (err) {
    // Re-throw the error so App.js (or whoever calls this service) can catch and handle it
    throw err;
  }
};