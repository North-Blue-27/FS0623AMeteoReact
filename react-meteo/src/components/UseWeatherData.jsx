import { useState } from 'react';

const UseWeatherData = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearData = () => {
    setWeatherData([]);
    setLoading(false);
    setError('');
  };

  return {
    weatherData,
    loading,
    error,
    setWeatherData,
    setLoading,
    setError,
    clearData,
  };
};

export default UseWeatherData;