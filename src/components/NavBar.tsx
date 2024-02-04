import React from "react";
import DisconnectWalletDropdown from "./subcomponents/DisconnectWalletDropdown";// Import the new component

const NavBar = ({ connectWallet, disConnectWallet, walletAddress }) => {
  return (
    <div className="navbar">
      <img src="./ObeseOlaf.png" alt="Obese Olaf" className="navbarLogoLeft" />
      <div className="navbarSpacer" />
      {!walletAddress ? (
        <button className="connectWallet" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <DisconnectWalletDropdown
          walletAddress={walletAddress}
          disConnectWallet={disConnectWallet}
        />
      )}
      <a href="https://www.linkedin.com/in/liam-ayathan-046b3816b/">
        <img src="./LinkedIn.png" alt="LinkedIn" className="navbarLogoRight" />
      </a>
      <a href="https://twitter.com/liamtheshrimp">
        <img src="./X.png" alt="Close" className="navbarLogoRight" />
      </a>
    </div>
  );
};

export default NavBar;
