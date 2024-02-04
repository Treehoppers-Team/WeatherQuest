import { useState } from "react";

const DisconnectWalletDropdown = ({ walletAddress, disConnectWallet }) => {
  const [showDisconnectPopup, setShowDisconnectPopup] = useState(false);

  const toggleDisconnectPopup = () => {
    setShowDisconnectPopup(!showDisconnectPopup);
  };

  return (
    <div>
      <button className="connectWallet" onClick={toggleDisconnectPopup}>
        <span className="walletDot">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>Connected: {walletAddress.slice(0, 5)}....</span>
      </button>
      {showDisconnectPopup && (
        <div className="disconnectPopup">
          <button onClick={disConnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default DisconnectWalletDropdown;
