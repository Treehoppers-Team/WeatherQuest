import React from "react";

const Dashboard = ({ returnToHome, balance, goToSelect }) => {
  // Divide balance by 10^18 and convert to string
  const formattedBalance = balance
    ? (balance / BigInt(10 ** 18)).toString()
    : "0";

  return (
    <div className="dashboard-container">
      <div className="balance-box">
        <h1 className="balance-title">WeToken Balance</h1>
        <h1 className="balance-value">{formattedBalance} We</h1>
      </div>
      <div className="button-container">
        <button className="dashBoardButton" onClick={returnToHome}>
          Back to Home
        </button>
        <button className="dashBoardButton" onClick={goToSelect}>Continue</button>
      </div>
    </div>
  );
};

export default Dashboard;
