import React from "react";

const HomeScreen = ({ connectWallet, playGame , walletAddress }) => {
  return (
    <div className="container">
      <img src="/WeatherQuest.png" alt="WeatherQuest" />
      {!walletAddress ? (
        <button className="normalButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button className="normalButton" onClick={playGame}>
          Play Now!
        </button>
      )}
    </div>
  );
};

export default HomeScreen;
