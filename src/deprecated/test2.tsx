"use client";
import { useState } from "react";
const ethers = require("ethers");

export default function Home() {
  const abi = [
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
  const contractAddress = "0x576120a3ced589fbf15236855f4a5e35f6876455";
  const [myContract, setmyContract] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>();
  const [weather, setWeather] = useState<any>();
  const customProvider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/tn3cvAYCYuHAHlN_3Ek5AcBJeQAk3ITQ"
  );
  const connectWallet = async () => {
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
    setmyContract(new ethers.Contract(contractAddress, abi, signer));
    console.log("Account:", await signer.getAddress());
  };

  const disConnectWallet = async () => {
    setWalletAddress(null);
    setProvider(null);
  };

  const checkWeather = async () => {
    console.log(myContract);
    const result = await myContract.getTemperatureFromOracle();
    console.log(result);
    setWeather(result);
  };

  const play = async () => {
    try {
      const result = await myContract.play("Rainy", false, {
        value: 1000000000000000, // 0.001ETH
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{
        // Apply styles for the video background
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: -1, // Place the video behind other elements
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          // Set the video to cover the entire screen
          // objectFit: "cover",
          // width: "100%",
          height: "100%",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!walletAddress ? (
        <div className="mb-32 grid mx-auto text-center justify-content-center  lg:text-center">
          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            onClick={connectWallet}
            style={{ zIndex: 1 }}
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Connect{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Connect your wallet
            </p>
          </a>
        </div>
      ) : (
        <>
          <div className="mb-32 grid mx-auto text-center justify-content-center  lg:text-center">
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
              onClick={checkWeather}
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Check Weather
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              {weather ? (
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  {weather}
                </p>
              ) : (
                <></>
              )}
            </a>
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
              onClick={play}
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Play
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Let's Play
              </p>
            </a>
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
              onClick={disConnectWallet}
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Disconnect{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Connected: {walletAddress.slice(0, 5)}....
              </p>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
