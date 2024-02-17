import React from "react";

interface MyComponentProps {
  // defining the types of props in the functional signature
  returnToHome: any;
  balance: any;
  goToSelect: any;
}

const Dashboard: React.FC<MyComponentProps> = ({
  returnToHome,
  balance,
  goToSelect,
}) => {
  // Divide balance by 10^18 and convert to string
  const formattedBalance = parseInt(balance) / 10 ** 18;

  return (
    <div className="dashboard-container">
      <div className="balance-box">
        <h1 className="balance-title">GToken Balance</h1>
        <h1 className="balance-value">{formattedBalance} G Tokens</h1>
      </div>
      <div className="button-container">
        <button className="dashBoardButton" onClick={returnToHome}>
          Back to Home
        </button>
        <button className="dashBoardButton" onClick={goToSelect}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
