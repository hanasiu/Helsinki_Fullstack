import Detail from "./Detail";
import Country from "./Country";

const ShowCountry = ({ searchedCountries, searchCountry }) => {
  const i = searchedCountries.length;
  if (searchCountry === "") {
    return (
      <div>
        <h3>If you find one, we give you information about the country</h3>
      </div>
    );
  }
  if (i > 10) {
    return (
      <div>
        <h3>If you find one, we give you information about the country</h3>
        <h4>Too many matches, specify another filter</h4>
      </div>
    );
  } else if (i === 1) {
    return <Detail searchedCountry={searchedCountries[0]} />;
  } else {
    return (
      <div>
        {searchedCountries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    );
  }
};

export default ShowCountry;
