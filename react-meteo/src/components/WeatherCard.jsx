import React from "react";
import { Card } from "react-bootstrap";

const WeatherCard = ({ weatherData, unitTypeSymbol, cityName }) => {
  return (
    <Card className="p-3 shadow border-0 mt-3 rounded">
      <div className="d-flex justify-content-between">
        <div>{weatherData.dt_txt}</div>
        <div>
          Current: {weatherData.main.temp} {unitTypeSymbol}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
      <div className="d-flex justify-content-between">
        <div>{weatherData.weather[0].main}</div>
        <div>
          Feels like {weatherData.main.feels_like} {unitTypeSymbol}
        </div>
      </div>
      <div className="mt-2"></div>
    </Card>
  );
};

export default WeatherCard;
