import React from "react";
import styled from "styled-components";
import FormatDate from "./FormatDate";

const DisplayForecast = props => {
  console.log("forecast data", props.location);
  return (
    <ForecastDisplay>
      {props.forecastData && (
        <h2 id="five-day-title" className="pt-3">
          5 Day Forecast
        </h2>
      )}
      {props.forecastData &&
        props.forecastData
          .filter((ele, i) => i % 8 === 0)
          .map((data, index) => (
            <ForecastBox key={index} className="bg-primary col-lg-12 col-sm-4">
              <React.Fragment>
                <div id="forecast" className="my-4">
                  <li id="displayCity" className="font-weight-bold">
                    {props.location}
                  </li>
                  <FormatDate getDate={data.dt_txt} />
                  <li>Temperature: {data.main.temp}&deg;</li>
                  <li>Weather: {data.weather[0].main}</li>
                  <li>Hi: {data.main.temp_max}&deg;</li>
                  <li>Low: {data.main.temp_min}&deg;</li>
                  <li>Wind Speed: {data.wind.speed}</li>
                  <li>Humidity: {data.main.humidity}</li>
                  <li>
                    <img
                      src={
                        "https://openweathermap.org/img/w/" +
                        data.weather[0].icon +
                        ".png"
                      }
                      alt=""
                    />
                  </li>
                  <li>{data.weather[0].description}</li>
                </div>
              </React.Fragment>
            </ForecastBox>
          ))}
    </ForecastDisplay>
  );
};

export default DisplayForecast;

const ForecastDisplay = styled.div`
  list-style-type: none;
`;

const ForecastBox = styled.div`
  max-width: 200px;
  margin: 5px;
  border: 1px solid black;
  display: inline-block;
  background: -moz-linear-gradient(
    top,
    #e570e7 0%,
    #c85ec7 34%,
    #4f87b5 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #e570e7 0%,
    #c85ec7 34%,
    #4f87b5 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #e570e7 0%,
    #c85ec7 34%,
    #4f87b5 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e570e7', endColorstr='#4f87b5',GradientType=0 );
  box-shadow: 0 0 10px black;
`;
