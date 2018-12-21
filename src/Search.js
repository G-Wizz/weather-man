import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import DisplayWeather from "./DisplayWeather";
import DisplayForecast from "./DisplayForecast";
// import ZipSearch from "./ZipSearch";
// import CitySearch from "./CitySearch";

class Search extends Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);

    this.state = {
      cityInfo: "",
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
    console.log(this.state.cityInfo);
    // try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${
        this.state.cityInfo
      },us&units=imperial&appid=${API_KEY}`
    );
    let data = await res.json();
    console.log(data);

    // const resName = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${
    //     this.state.cityInfo
    //   },us&units=imperial&appid=${API_KEY}`
    // );
    // const data = await resName.json();
    // const cityName = data.name;
    // console.log(cityName);

    this.setState({
      location: data.name,
      currentTemp: data.main.temp,
      tempHigh: data.main.temp_max,
      tempLow: data.main.temp_min,
      humidity: data.main.humidity,
      weatherMain: data.weather[0].main,
      wind: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });

    const resf = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${
        this.state.cityInfo
      },us&units=imperial&appid=${API_KEY}`
    );
    const dataf = await resf.json();
    this.setState({
      forecastData: dataf.list
    });
    // } catch (error) {
    //   // console.log(error);
    // }
  }

  handleChange = e => {
    this.setState({
      cityInfo: e.target.value
    });
  };

  render() {
    return (
      <div className="search-main pt-3">
        <Input
          type="text"
          className="col-sm-4 mx-auto mb-2 text-center"
          placeholder="Enter zip (city coming soon)"
          onChange={this.handleChange}
        />
        <Button onClick={this.getWeather}>Search</Button>
        <DisplayWeather
          location={this.state.location}
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
          location={this.state.location}
          icon={this.state.icon}
          forecastData={this.state.forecastData}
        />
      </div>
    );
  }
}

export default Search;
