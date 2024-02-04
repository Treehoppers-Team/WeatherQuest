import React from "react";

interface MyComponentProps {
  // defining the types of props in the functional signature
  returnToHome: any;
  chosenWeather: any;
  actualWeather: any;
  won: any;
}

const EndingScreen: React.FC<MyComponentProps> = ({
  returnToHome,
  chosenWeather,
  actualWeather,
  won,
}) => {
  return (
    <div className="dashboard-container">
      <div className="weather-box-container">
        <div className="weather-box">
          <h1 className="weather-title">{chosenWeather}</h1>
          <img
            src={`./${chosenWeather}.png`}
            alt={chosenWeather}
            className="weather-image"
          />
        </div>
        <img src="./Dotted.png" style={{ width: "15%" }} />
        {won ? (
          <img src="./Tick.png" style={{ width: "15%" }} />
        ) : (
          <img src="./Cancel.png" style={{ width: "15%" }} />
        )}
        <img src="./Dotted.png" style={{ width: "15%" }} />
        <div className="weather-box">
          <h1 className="weather-title">{actualWeather}</h1>
          <img
            src={`./${actualWeather}.png`}
            alt={actualWeather}
            className="weather-image"
          />
        </div>
      </div>
      <button className="normalButton" onClick={returnToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default EndingScreen;
