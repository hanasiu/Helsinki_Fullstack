import { useState, useEffect } from "react";
import axios from "axios";
import ShowCountry from './components/ShowCountry';



function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearch] = useState("");
  const [searchedCountries, setSearched] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleCountrySearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    const searched = countries.filter((country) => {
      if (
        country.name.common
          .toLowerCase()
          .search(searchCountry.toLowerCase()) === -1
      )
        return false;
      else return true;
    });
    setSearched(searched);
  };

  return (
    <div>
      <div>
        find countires{" "}
        <input value={searchCountry} onChange={handleCountrySearch} />
      </div>
      <ShowCountry
        searchedCountries={searchedCountries}
        searchCountry={searchCountry}
        countries={countries}
      />
    </div>
  );
}

export default App;
