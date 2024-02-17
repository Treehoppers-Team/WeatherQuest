import React from "react";
import DisconnectWalletDropdown from "./subcomponents/DisconnectWalletDropdown";// Import the new component

interface MyComponentProps { // defining the types of props in the functional signature
  connectWallet: any;
  disConnectWallet: any;
  walletAddress: any;
}

const NavBar: React.FC<MyComponentProps> = ({ connectWallet, disConnectWallet, walletAddress }) => {
  return (
    <div className="navbar">
      <img src="./treehoppers.png" alt="Tree Hoppers" className="navbarLogoLeft" />
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
      <a href="https://twitter.com/liamtheshrimp">
        <img src="./X.png" alt="Close" className="navbarLogoRight" />
      </a>
    </div>
  );
};

export default NavBar;
