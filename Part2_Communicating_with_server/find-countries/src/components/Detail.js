import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Detail = ({ searchedCountry }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const lat = searchedCountry.capitalInfo.latlng[0];
  const lng = searchedCountry.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setCurrentWeather(response.data);
        console.log(response);
      });
  }, []);

  function getWeatherIcon(currentWeather) {
    const weather = currentWeather.weather;
    if (Array.isArray(weather)) {
      console.log(weather[0]?.icon);
      return weather[0]?.icon ?? "";
    }
    return "";
  }

  return (
    <div>
      <h1>{searchedCountry.name.common}</h1>
      <div>capital {searchedCountry.capital}</div>
      <div>area {searchedCountry.area}</div>
      <h2>Language</h2>
      <div>
        {Object.values(searchedCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </div>
      <p>
        <img src={searchedCountry.flags.png} alt=""></img>
      </p>
      <h2>Weather in {searchedCountry.capital}</h2>

      <div>temperature {currentWeather.main?.temp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${getWeatherIcon(
          currentWeather
        )}@2x.png`}
        alt=""
      ></img>
      <div>wind {currentWeather.wind?.speed} m/s</div>
    </div>
  );
};

export default Detail;