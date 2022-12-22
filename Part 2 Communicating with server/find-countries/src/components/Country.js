import { useState } from "react";
import Detail from "./Detail";

const Country = ({ country }) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  return (
    <li>
      {country.name.common} <button onClick={handleClick}>show</button>
      {state && <Detail searchedCountry={country} />}
    </li>
  );
};

export default Country;