import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
          fetchForecastData(latitude, longitude);
        },
        (error) => {
          setError("Error fetching location: " + error.message);
        }
      );
    };

    const fetchWeatherData = async (lat, lon) => {
      try {
        const apiKey = "1274413dc7afda142ec57b170adff4da";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError("Error fetching weather data: " + error.message);
      }
    };

    const fetchForecastData = async (lat, lon) => {
      try {
        const apiKey = "1274413dc7afda142ec57b170adff4da";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=it&appid=${apiKey}`
        );
        setForecastData(response.data);
      } catch (error) {
        setError("Error fetching forecast data: " + error.message);
      }
    };

    getLocation();
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData || !forecastData) {
    return <div>Loading...</div>;
  }

  // Estrai solo gli orari desiderati per il prossimo giorno (00:00, 12:00, 20:00)
  const desiredHours = ["00:00:00", "12:00:00", "20:00:00"];
  const filteredForecast = forecastData.list.filter((forecast) => {
    const forecastHour = forecast.dt_txt.split(" ")[1];
    return desiredHours.includes(forecastHour);
  });

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Temperature: {kelvinToCelsius(weatherData.main.temp).toFixed(2)}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>

      <h3>5-Day Forecast</h3>
      {/* Visualizza solo gli orari desiderati per il prossimo giorno */}
      {filteredForecast.map((forecast) => (
        <div key={forecast.dt}>
          <p>{forecast.dt_txt}</p>
          <p>Temperature: {kelvinToCelsius(forecast.main.temp).toFixed(2)}°C</p>
          <p>Weather: {forecast.weather[0].description}</p>
          {/* Altre informazioni sulla previsione, se necessario */}
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;
