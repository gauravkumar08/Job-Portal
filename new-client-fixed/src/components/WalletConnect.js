import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("User rejected wallet connection");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="text-right">
      {account ? (
        <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
