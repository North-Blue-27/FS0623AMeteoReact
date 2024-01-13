import React, { useState } from 'react';
import axios from 'axios';
import MyNav from './components/MyNav';
import WeatherCard from './components/WeatherCard'; 
import HomePage from './components/HomePage';  // Importa il componente Home Page
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import UseWeatherData from './components/UseWeatherData';  // Importa il tuo hook personalizzato

export const WeatherContext = React.createContext();

const App = () => {
  const {
    weatherData,
    loading,
    setWeatherData,
    setLoading,
    setError,
  } = UseWeatherData();
    // Usa il tuo hook personalizzato

  const [showHomePage, setShowHomePage] = useState(true); // Aggiunto stato per gestire la visualizzazione della home page

  const unitTypeSymbol = {
    'imperial': '°F',
    'metric': '°C',
    '': 'K',
  };

  const unitType = 'metric';
  const apiKey = '1274413dc7afda142ec57b170adff4da';

  const getWeatherData = async (city) => {
    try {
      setError('');
      setWeatherData([]);
      setLoading(true);
  
      const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
      const { lat, lon, name: cityName } = geoResponse.data[0];
  
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unitType}&lang=it`);
  
      console.log('Weather Response:', weatherResponse.data);
  
      const modifiedWeatherData = weatherResponse.data.list.map(weather => {
        return {
          ...weather,
          main: {
            ...weather.main,
            temp: Math.round(weather.main.temp),
            feels_like: Math.round(weather.main.feels_like),
          },
          cityName, // Aggiungi il nome della città ai dati meteo
        };
      });
  
      console.log('Modified Weather Data:', modifiedWeatherData);
  
      setWeatherData(modifiedWeatherData);
      setShowHomePage(false);
    } catch (error) {
      console.error(error);
      setError('Unable to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const showResults = () => {
    setShowHomePage(false);
  };

  const showHomePageHandler = () => {
    setShowHomePage(true);
  };

  return (
    <WeatherContext.Provider value={{ getWeatherData }}>
      <MyNav showResults={showResults} showHomePage={showHomePageHandler} />
      <Container>
        {showHomePage ? (
          <HomePage />
        ) : (
          <>
            {loading ? (
              <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Row className="mt-3">
                {weatherData.map((weather, index) => (
                  <Col sm={12} md={6} lg={4} className="mt-3" key={index}>
                    <WeatherCard weatherData={weather} unitTypeSymbol={unitTypeSymbol[unitType]} />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </WeatherContext.Provider>
  );
};

export default App;