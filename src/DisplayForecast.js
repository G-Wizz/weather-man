import React from "react";
import styled from "styled-components";
import FormatDate from "./FormatDate";

const DisplayForecast = props => {
  return (
    <ForecastDisplay>
      {props.forecastData && <h2 className="pt-3">5 Day Forecast</h2>}
      {props.forecastData &&
        props.forecastData
          .filter((ele, i) => i % 8 === 0)
          .map((data, index) => (
            <React.Fragment key={index}>
              <div id="forecast" className="my-4">
                {/* <li>{data.dt_txt}</li> */}
                <FormatDate getDate={data.dt_txt} />
                <li>Temperature: {data.main.temp}</li>
                <li>Weather: {data.weather[0].main}</li>
                <li>Hi: {data.main.temp_max}</li>
                <li>Low: {data.main.temp_min}</li>
                <li>Wind Speed: {data.wind.speed}</li>
                <li>Humidity: {data.main.humidity}</li>
                <li>
                  <img
                    src={
                      "http://openweathermap.org/img/w/" + props.icon + ".png"
                    }
                    alt=""
                  />
                </li>
                <li>{data.weather[0].description}</li>
              </div>
            </React.Fragment>
          ))}
    </ForecastDisplay>
  );
};

export default DisplayForecast;

const ForecastDisplay = styled.div`
  list-style-type: none;
`;
