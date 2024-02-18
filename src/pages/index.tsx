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
import Head from "next/head";

declare global {
  interface Window {
    ethereum?: any; // Adjust the type as necessary
  }
}

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
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approveContract",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "gToken",
      outputs: [
        {
          internalType: "contract GToken",
          name: "",
          type: "address",
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
      stateMutability: "nonpayable",
      type: "constructor",
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
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
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
          name: "value",
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
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
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
          name: "value",
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
          name: "value",
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
  const gamecontractAddress = "0xD6db42BbC0967a1B91C091a702D32181ff83679a";
  const tokenContractAddress = "0x2735Cda07b8394Cd4315E12476c5eB6437F70093";
  const [tokenContract, setTokenContract] = useState<any>(null);
  const [gameContract, setGameContract] = useState<any>(null);

  // setting up variables with connect wallet

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>();
  // const customProvider = new ethers.JsonRpcProvider(
  //   "https://eth-sepolia.g.alchemy.com/v2/tn3cvAYCYuHAHlN_3Ek5AcBJeQAk3ITQ"
  // );

  // screen states

  const [homeState, setHomeState] = useState<boolean>(true); // determines if the player remains at the home page or goes to the dashboard screen
  const [dashState, setDashState] = useState<boolean>(false); // determines if the player remains at the home page or goes to the dashboard screen
  const [selectWeatherState, setSelectWeatherState] = useState<boolean>(false); // determines if the player remains at the selectweather screen or goes to the
  const [loadingState, setLoadingState] = useState<boolean>(false); // determines if the player remains at the selectweather screen or goes to the

  // game variables

  const [weBalance, setWeBalance] = useState<BigInt | null>(null);
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
            chainId: "0xa0c71fd",
            rpcUrls: ["https://sepolia.blast.io"],
            chainName: "Blast Sepolia",
            nativeCurrency: {
              name: "BlastETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.blastscan.io"],
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
  };

  const returnToHome = async () => {
    setHomeState(true);
    setDashState(false);
  };

  const populateDashboard = async () => {
    const result = await tokenContract.balanceOf(walletAddress);
    console.log(
      "the current balance of Gtoken is (result)",
      result,
      typeof result
    );
    setWeBalance(result);
    const checkAllowance = await tokenContract.allowance(
      walletAddress,
      gamecontractAddress // avran's address
    );
    console.log(`Current allowance for game contract is ${checkAllowance}`);
    const depositAmount = await gameContract.depositAmount();
    console.log(`Current deposit amount is ${depositAmount}`);

    // I need to check allowance < deposit amount than enable approval
    try {
      if (parseInt(checkAllowance) < parseInt(depositAmount)) {
        alert(
          `Your current GToken allowance for transfers is too low, you need to increase the allowance to make GToken deposits into this contract, please confirm the metamask transaction`
        );
        const allowanceAmount = parseInt(depositAmount) * 3;
        const enableAllowance = await tokenContract.approve(
          gamecontractAddress,
          String(allowanceAmount)
        );
      }
      setHomeState(false);
      setDashState(true);
    } catch (e) {
      console.log(e);
      setHomeState(true);
      setDashState(false);
    }
  };

  const goToSelect = async () => {
    if (
      weBalance !== null &&
      weBalance !== undefined &&
      weBalance.toString() == "0"
    ) {
      const confirmed = window.confirm(
        "Your GTK balance is zero. Do you want to go to GambleDao to top up?"
      );
      if (confirmed) {
        // Redirect user to a different website
        window.location.href = "https://gamble-dao.vercel.app/";
      }
    } else {
      setSelectWeatherState(true);
      setDashState(false);
    }
  };

  // select weather functions

  const returnToDash = async () => {
    setDashState(true);
    setSelectedWeather(null); // selected weather in particular
  };

  const handleWeatherClick = (weather: any) => {
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

  const play = async (weather: any) => {
    // need to add error handler for not enough gas? -> failure
    try {
      const checkAllowance = await tokenContract.allowance(
        walletAddress,
        gamecontractAddress // avran's address
      );
      console.log(`Current allowance for game contract is ${checkAllowance}`);
      const depositAmount = await gameContract.depositAmount();
      console.log(`Current deposit amount is ${depositAmount}`);
      if (parseInt(checkAllowance) < parseInt(depositAmount)) {
        alert(
          `Your current GToken allowance for transfers is too low, if you have increased the allowance please wait for the transaction to be confirmed, if not please go back to the Home screen`
        );
      } else {
        const result = await gameContract.play(weather, true, {
          value: 0, // 0.001ETH
        });
        console.log(result.hash, typeof result.hash);
        setSelectWeatherState(false);
        setLoadingState(true);
        listenEvent();
        setSelectedWeather(null);
      }
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
        async (
          player: string,
          chosenWeather: string,
          actualWeather: string,
          won: boolean,
          ethDeposited: BigInt,
          tokenReward: BigInt
        ) => {
          // Check if the player is the current user
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
      console.error(e);
    }
  };

  return (
    <div className="appContainer">
      <Head>
        <title>Weather Quest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
