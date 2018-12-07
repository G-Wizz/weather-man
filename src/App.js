import React, { Component } from "react";
import "./App.css";
import Search from "./Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather Man</h1>
        </header>
        <Search />
      </div>
    );
  }
}

export default App;
