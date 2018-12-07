import React from "react";
import styled from "styled-components";

const DisplayWeather = props => {
  return (
    <WeatherDisplay className="col-sm-4 mx-auto mt-4">
      {props.currentTemp && (
        <li>Current Temperature: {props.currentTemp}&deg;</li>
      )}
      {props.weatherMain && <li>Weather: {props.weatherMain}</li>}
      {props.tempHigh && <li>Hi: {props.tempHigh}&deg;</li>}
      {props.tempLow && <li>Low: {props.tempLow}&deg;</li>}
      {props.wind && <li>Wind Speed: {props.wind}</li>}
      {props.humidity && <li>Humidity: {props.humidity}</li>}
      {props.icon && (
        <li>
          <img
            src={"http://openweathermap.org/img/w/" + props.icon + ".png"}
            alt=""
          />
        </li>
      )}
      {props.description && <li>{props.description}</li>}
    </WeatherDisplay>
  );
};

export default DisplayWeather;

const WeatherDisplay = styled.div`
  list-style-type: none;
`;
