"use client";
import { useState } from "react";
const ethers = require("ethers");
import BgVideo from "@/components/BgVideo";
import HomeScreen from "@/components/HomeScreen";
import Dashboard from "@/components/Dashboard";
import NavBar from "@/components/NavBar";
import SelectWeather from "@/components/SelectWeather";
import LoadingScreen from "@/components/LoadingScreen";
import EndingScreen from "@/components/EndingScreen";
import { act } from "react-dom/test-utils";

export default function Home() {
  // contract variables

  const gameAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenContract",
          type: "address",
        },
        {
          internalType: "address",
          name: "_oracleContract",
          type: "address",
        },
        {
          internalType: "address",
          name: "_vrfContract",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "player",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "chosenWeather",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "actualWeather",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "won",
          type: "bool",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ethDeposited",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenReward",
          type: "uint256",
        },
      ],
      name: "GamePlayed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "depositAmount",
          type: "uint256",
        },
      ],
      name: "newDepositAmountSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "contract WeatherOracle",
          name: "weOracle",
          type: "address",
        },
      ],
      name: "newOracleAddressEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenRewardAmount",
          type: "uint256",
        },
      ],
      name: "newTokenRewardAmountSet",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "SCALE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "SCALIFIER",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "depositAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "depositTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getRandomNumberVRF",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTemperatureFromOracle",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "chosenWeather",
          type: "string",
        },
        {
          internalType: "bool",
          name: "test",
          type: "bool",
        },
      ],
      name: "play",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "test",
          type: "bool",
        },
      ],
      name: "randomize",
      outputs: [
        {
          internalType: "uint256",
          name: "scaled",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "temp",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "setDepositAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_oracleInstanceAddress",
          type: "address",
        },
      ],
      name: "setOracleAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "setTokenRewardAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenRewardAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "weOracle",
      outputs: [
        {
          internalType: "contract WeatherOracle",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "weToken",
      outputs: [
        {
          internalType: "contract CustomToken",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "weVRF",
      outputs: [
        {
          internalType: "contract WeVRF",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawETH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
  const tokenAbi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "initialSupply",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "maxSupply",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const gamecontractAddress = "0x576120a3ced589fbf15236855f4a5e35f6876455";
  const tokenContractAddress = "0x0779F67a7aC7b9cE9c0354f30A2bA24F862902fb";
  const [tokenContract, setTokenContract] = useState<any>(null);
  const [gameContract, setGameContract] = useState<any>(null);

  // setting up variables with connect wallet

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>();
  const customProvider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/tn3cvAYCYuHAHlN_3Ek5AcBJeQAk3ITQ"
  );

  const [weather, setWeather] = useState<any>(); // deprecated

  // screen states

  const [homeState, setHomeState] = useState<boolean>(true); // determines if the player remains at the home page or goes to the dashboard screen
  const [dashState, setDashState] = useState<boolean>(false); // determines if the player remains at the home page or goes to the dashboard screen
  const [selectWeatherState, setSelectWeatherState] = useState<boolean>(false); // determines if the player remains at the selectweather screen or goes to the
  const [loadingState, setLoadingState] = useState<boolean>(false); // determines if the player remains at the selectweather screen or goes to the

  // game variables

  const [weBalance, setWeBalance] = useState<BigInt>();
  const [selectedWeather, setSelectedWeather] = useState<any>(null);

  // ending screen variables

  const [chosenWeather, setChosenWeather] = useState<any>(null);
  const [actualWeather, setActualWeather] = useState<any>(null);
  const [won, setWon] = useState<boolean>(false);

  // navbar functions

  const connectWallet = async () => {
    // may need to edit in such a way that it turns all other states to false for the screen
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); // connect wallet
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xaa36a7",
            rpcUrls: ["https://rpc.sepolia.org"],
            chainName: "Sepolia",
            nativeCurrency: {
              name: "SepoliaETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://sepolia.etherscan.io/"],
          },
        ],
      });
      setWalletAddress(account);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    const signer = await provider.getSigner();
    setGameContract(new ethers.Contract(gamecontractAddress, gameAbi, signer));
    setTokenContract(
      new ethers.Contract(tokenContractAddress, tokenAbi, signer)
    );
    console.log("Account:", await signer.getAddress());
  };

  const disConnectWallet = async () => {
    setWalletAddress(null);
    setProvider(null);
    console.log("disconnected");
    setHomeState(true);
    setSelectedWeather(null); // so that the current weather will not be selected
  };

  // dashboard functions

  const playGame = async () => {
    await populateDashboard();
    setHomeState(false);
    setDashState(true);
  };

  const returnToHome = async () => {
    setHomeState(true);
    setDashState(false);
  };

  const populateDashboard = async () => {
    console.log(tokenContract);
    const result = await tokenContract.balanceOf(walletAddress);
    console.log(
      "the current balance of wetoken is (result)",
      result,
      typeof result
    );
    setWeBalance(result);
  };

  const goToSelect = async () => {
    setSelectWeatherState(true);
    setDashState(false);
  };

  // select weather functions

  const returnToDash = async () => {
    setDashState(true);
    setSelectedWeather(null); // selected weather in particular
  };

  const handleWeatherClick = (weather) => {
    setSelectedWeather(selectedWeather === weather ? null : weather); // if the weather is already the current weather just set null if not, if not set the weather
  }; // sets the weather if not null

  const handleSelectWeatherClick = () => {
    if (selectedWeather === null) {
      console.log("Weather is not Set");
      alert("Please select a weather before proceeding");
    } else {
      console.log(`The weather selected is ${selectedWeather}`);
      play(selectedWeather);
    }
  };

  const play = async (weather) => {
    // need to add error handler for not enough gas? -> failure
    try {
      const result = await gameContract.play(weather, false, {
        value: 1000000000000000, // 0.001ETH
      });
      console.log(result.hash, typeof result.hash);
      setSelectWeatherState(false);
      setLoadingState(true);
      listenEvent();
      setSelectedWeather(null);
    } catch (e) {
      console.log(e);
      setSelectedWeather(null);
    }
  };

  const listenEvent = async () => {
    // listen for the outcome of a Game
    try {
      await gameContract.on(
        "GamePlayed",
        (
          player,
          chosenWeather,
          actualWeather,
          won,
          ethDeposited,
          tokenReward
        ) => {
          // console.log(`This is the transaction data, ${transaction}`);

          if (player.toLowerCase() === walletAddress?.toLowerCase()) {
            console.log(
              `The user ${player}, chose ${chosenWeather} when the actual weather was ${actualWeather}, did he win? ${won}`
            );
            setChosenWeather(chosenWeather);
            setActualWeather(actualWeather);
            setWon(won);
            setLoadingState(false);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Ending Screen Functions

  // deprecated functions

  const checkWeather = async () => {
    console.log(gameContract);
    const result = await gameContract.getTemperatureFromOracle();
    console.log(result);
    setWeather(result);
  };

  return (
    <div className="appContainer">
      <NavBar
        connectWallet={connectWallet}
        disConnectWallet={disConnectWallet}
        walletAddress={walletAddress}
      />
      <div className="bgContainer">
        <BgVideo />
        {homeState ? (
          <HomeScreen
            connectWallet={connectWallet}
            playGame={playGame}
            walletAddress={walletAddress}
          />
        ) : dashState ? (
          <Dashboard
            returnToHome={returnToHome}
            balance={weBalance}
            goToSelect={goToSelect}
          />
        ) : selectWeatherState ? (
          <SelectWeather
            returnToDash={returnToDash}
            selectedWeather={selectedWeather}
            handleWeatherClick={handleWeatherClick}
            handleSelectWeatherClick={handleSelectWeatherClick}
          />
        ) : loadingState ? (
          <LoadingScreen />
        ) : (
          <EndingScreen
            returnToHome={returnToHome}
            chosenWeather={chosenWeather}
            actualWeather={actualWeather}
            won={won}
          />
        )}
      </div>
    </div>
  );
}
