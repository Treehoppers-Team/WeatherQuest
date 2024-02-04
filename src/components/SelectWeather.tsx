import React, { useState } from "react";

const SelectWeather = ({
  returnToDash,
  selectedWeather,
  handleWeatherClick,
  handleSelectWeatherClick,
}) => {

  return (
    <div className="dashboard-container">
      <div className="weather-box-container">
        <div
          className={`weather-box ${
            selectedWeather === "Sunny" ? "weather-box-selected" : ""
          }`}
          onClick={() => handleWeatherClick("Sunny")}
        >
          <h1 className="weather-title">Sunny</h1>
          <img src="./Sunny.png" alt="Sunny" className="weather-image" />
        </div>
        <div
          className={`weather-box ${
            selectedWeather === "Rainy" ? "weather-box-selected" : ""
          }`}
          onClick={() => handleWeatherClick("Rainy")}
        >
          <h1 className="weather-title">Rainy</h1>
          <img src="./Rainy.png" alt="Rainy" className="weather-image" />
        </div>
        <div
          className={`weather-box ${
            selectedWeather === "Cloudy" ? "weather-box-selected" : ""
          }`}
          onClick={() => handleWeatherClick("Cloudy")}
        >
          <h1 className="weather-title">Cloudy</h1>
          <img src="./Cloudy.png" alt="Cloudy" className="weather-image" />
        </div>
      </div>
      <div className="button-container">
        <button className="dashBoardButton" onClick={returnToDash}>
          Back to DashBoard
        </button>
        <button className="dashBoardButton" onClick={handleSelectWeatherClick}>
          Select Weather
        </button>
      </div>
    </div>
  );
};

export default SelectWeather;
