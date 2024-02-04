import React from "react";

interface MyComponentProps {
  // defining the types of props in the functional signature
  connectWallet: any;
  playGame: any;
  walletAddress: any;
}

const HomeScreen: React.FC<MyComponentProps> = ({
  connectWallet,
  playGame,
  walletAddress,
}) => {
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
