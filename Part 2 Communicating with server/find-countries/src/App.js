import { useState, useEffect } from "react";
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const ShowCountry = ({searchedCountries, searchCountry}) => {
  const i = searchedCountries.length;
  if(searchCountry==="") {
    return (
      <div>
        <h3>If you find one, we give you information about the country</h3>
      </div>
    )
  }
  if(i>10) {
  return (
    <div>
      <h3>If you find one, we give you information about the country</h3>
      <h4>Too many matches, specify another filter</h4>
    </div>
  )  } else if(i===1) {
    return <Detail searchedCountry={searchedCountries[0]} />
  } else {
    return (
      <div>
        {searchedCountries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    )
}
}

const Detail = ({searchedCountry}) => {
  const [currentWeather, setCurrentWeather] = useState({});


    const lat = searchedCountry.capitalInfo.latlng[0];
    const lng = searchedCountry.capitalInfo.latlng[1];

  

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
    .then(response => {
      
      setCurrentWeather(response.data);
      console.log(response);
    })
  }, [])

  function getWeatherIcon(currentWeather){
    const weather = currentWeather.weather;
    if(Array.isArray(weather)){
      console.log(weather[0]?.icon);
      return weather[0]?.icon ?? '';
    }
    return '';
  }


  return (<div>
  <h1>{searchedCountry.name.common}</h1>
  <div>capital {searchedCountry.capital}</div>
  <div>area {searchedCountry.area}</div>
  <h2>Language</h2>
  <div>{Object.values(searchedCountry.languages).map((language) => (
    <li key={language}>{language}</li>
  ))}</div>
  <p><img src={searchedCountry.flags.png} alt=""></img></p>
  <h2>Weather in {searchedCountry.capital}</h2>
  
  <div>temperature {currentWeather.main?.temp} Celcius</div>
  <img src={`http://openweathermap.org/img/wn/${getWeatherIcon(currentWeather)}@2x.png`} alt=""></img>
  <div>wind {currentWeather.wind?.speed} m/s</div>
</div>)
}

const Country = ({country}) => {
  const [ state, setState ] = useState(false);

  const handleClick = () => {
    setState(!state);
  }

  return (
    <li>
      {country.name.common} <button onClick={handleClick}>show</button>
      {state && <Detail searchedCountry={country} />}
    </li>
  )
} 



function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearch] = useState("");
  const [searchedCountries, setSearched] = useState([]);

  


  useEffect(() => {
    console.log('effect');
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled');
      setCountries(response.data)
    })
  }, [])

  

  const handleCountrySearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    const searched = countries.filter((country)=>{
      if(country.name.common.toLowerCase().search(searchCountry.toLowerCase())===-1) return false;
      else return true;
    })
    setSearched(searched);
  }

  return (
    <div>
    <div>find countires {" "}
    <input value={searchCountry} onChange={handleCountrySearch} />
    </div>
    <ShowCountry searchedCountries={searchedCountries} searchCountry={searchCountry} countries={countries} />
    
    </div>
  );
}

export default App;
