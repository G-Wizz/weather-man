import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import DisplayWeather from "./DisplayWeather";
import DisplayForecast from "./DisplayForecast";

class Search extends Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);

    this.state = {
      zip: "",
      currentTemp: undefined,
      tempHigh: undefined,
      tempLow: undefined,
      humidity: undefined,
      weatherMain: undefined,
      wind: undefined,
      description: undefined,
      icon: undefined
    };
  }

  async getWeather(e) {
    e.preventDefault();

    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?zip=${
          this.state.zip
        },us&units=imperial&appid=${API_KEY}`
      );
      const data = await res.json();
      // console.log(data);
      this.setState({
        currentTemp: data.main.temp,
        tempHigh: data.main.temp_max,
        tempLow: data.main.temp_min,
        humidity: data.main.humidity,
        weatherMain: data.weather[0].main,
        wind: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      });
      // console.log(this.state);

      const resf = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?zip=${
          this.state.zip
        },us&units=imperial&appid=${API_KEY}`
      );
      const dataf = await resf.json();
      // console.log(dataf);
      this.setState({
        forecastData: dataf.list
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  render() {
    console.log(this.state.forecastData);
    return (
      <div className="search-main pt-3">
        <Input
          type="text"
          className="col-sm-4 mx-auto mb-2 text-center"
          placeholder="Enter zip or city"
          onChange={this.handleChange}
        />
        <Button onClick={this.getWeather}>Search</Button>
        <DisplayWeather
          currentTemp={this.state.currentTemp}
          tempHigh={this.state.tempHigh}
          tempLow={this.state.tempLow}
          humidity={this.state.humidity}
          weatherMain={this.state.weatherMain}
          wind={this.state.wind}
          description={this.state.description}
          icon={this.state.icon}
        />
        <DisplayForecast
          icon={this.state.icon}
          forecastData={this.state.forecastData}
        />
      </div>
    );
  }
}

export default Search;
