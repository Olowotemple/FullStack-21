import { useEffect, useState } from 'react';
import axios from 'axios';

const { REACT_APP_WEATHERSTACK_API_KEY } = process.env;

const Weather = ({ name }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://api.weatherstack.com/current?access_key=${REACT_APP_WEATHERSTACK_API_KEY}&query=${name}`
        );
        const weather = res.data;
        if (!weather.success) {
          throw new Error(weather.error.info);
        }
        setWeather(weather);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [name]);

  if (Object.keys(weather).length) {
    return (
      <div>
        <h2>Weather in {name}</h2>
        <img
          src={weather.current.weather_icons[0]}
          alt={`${weather.current.weather_description} icon`}
        />
        <p>temperature {weather.current.temperature}</p>
        <p>
          temperature {weather.current.wind_speed} mph direction{' '}
          {weather.current.wind_direction}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>weather data request denied...</p>
    </div>
  );
};

export default Weather;
