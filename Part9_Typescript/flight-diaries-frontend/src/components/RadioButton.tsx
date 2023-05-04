import { WeatherStateType, VisibilityStateType } from '../types';

export const WeatherRadioButton = ({newWeather, setWeather}: WeatherStateType) => {
    return (
      <>
      <input
              type="radio"
              id="sunny"
              name="weather"
              value="sunny"
              onChange={(event) => setWeather(event.target.value)}
              checked={newWeather === "sunny"}
            />
            <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              id="rainy"
              name="weather"
              value="rainy"
              onChange={(event) => setWeather(event.target.value)}
              checked={newWeather === "rainy"}
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              id="cloudy"
              name="weather"
              value="cloudy"
              onChange={(event) => setWeather(event.target.value)}
              checked={newWeather === "rainy"}
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              id="stormy"
              name="weather"
              value="stormy"
              onChange={(event) => setWeather(event.target.value)}
              checked={newWeather === "stormy"}
            />
            <label htmlFor="stormy">stormy</label>
            <input
              type="radio"
              id="windy"
              name="weather"
              value="windy"
              onChange={(event) => setWeather(event.target.value)}
              checked={newWeather === "windy"}
            />
            <label htmlFor="windy">windy</label>
      </>
    ) 
  }

  export const VisibilityRadioButton = ({newVisibility, setVisibility}: VisibilityStateType) => {
    return (
        <>
        <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            onChange={(event) => setVisibility(event.target.value)}
            checked={newVisibility === "great"}
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            onChange={(event) => setVisibility(event.target.value)}
            checked={newVisibility === "good"}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            onChange={(event) => setVisibility(event.target.value)}
            checked={newVisibility === "ok"}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            onChange={(event) => setVisibility(event.target.value)}
            checked={newVisibility === "poor"}
          />
          <label htmlFor="poor">poor</label>
        </>
    )
  }