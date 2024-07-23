'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCity, fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure } from '../slices/weatherSlice';
import useFetch from '../hooks/useFetch';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const { city, weatherData, loading, error } = useSelector((state) => state.weather || {});
    console.log(weatherData)
  const { data, loading: apiLoading, error: apiError } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9f8f1b23c618b54a51cd3bb9670f63d`);

  useEffect(() => {
    if (apiLoading) {
      dispatch(fetchWeatherRequest());
    } else if (apiError) {
      dispatch(fetchWeatherFailure(apiError));
    } else if (data) {
      dispatch(fetchWeatherSuccess(data));
    }
  }, [apiLoading, apiError, data, dispatch]);

  const handleCityChange = (e) => {
    dispatch(updateCity(e.target.value));
  };

  return (
    <div>
      <input type="text" className='inputField' value={city} onChange={handleCityChange} placeholder="Enter city" />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {weatherData?.cod === 200 && (
        <div>
          <h1>{weatherData.name}</h1>
          <p>{weatherData?.weather?.[0].description}</p>
          <p>{Math.round(weatherData?.main?.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;