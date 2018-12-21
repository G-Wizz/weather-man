import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import DisplayWeather from "./DisplayWeather";
import DisplayForecast from "./DisplayForecast";

class Search extends Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);

    this.state = {
      cityInfo: undefined,
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

    if (parseInt(this.state.cityInfo) !== NaN) {
      let resName = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.cityInfo
        },us&units=imperial&appid=${API_KEY}`
      );
      var data = await resName.json();

      console.log(data);

      const resC = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${
          this.state.cityInfo
        },us&units=imperial&appid=${API_KEY}`
      );
      const dataC = await resC.json();
      this.setState({
        forecastData: dataC.list
      });
    } else {
      const resName = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${
          this.state.cityInfo
        },us&units=imperial&appid=${API_KEY}`
      );
      var data = await resName.json();
      console.log(data);

      const resf = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${
          this.state.cityInfo
        },us&units=imperial&appid=${API_KEY}`
      );
      const dataf = await resf.json();
      this.setState({
        forecastData: dataf.list
      });
      console.log(this.state);
    }

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
          placeholder="Enter zip or city"
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
