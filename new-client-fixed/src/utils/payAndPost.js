// src/utils/payAndPost.js
import { ethers } from "ethers";

const ADMIN_WALLET = "0xB77540586622a0998480Fb6cF195918f95F54aC7"; // 🔁 Replace with your real admin wallet
const FEE_AMOUNT = "0.001"; // in ETH or MATIC depending on network

export const payPlatformFee = async () => {
  if (!window.ethereum) {
    alert("🦊 Please install MetaMask to continue.");
    return false;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: ADMIN_WALLET,
      value: ethers.parseEther(FEE_AMOUNT),
    });

    await tx.wait(); // ⏳ Wait for confirmation
    console.log("✅ Fee paid successfully:", tx.hash);
    return true;
  } catch (err) {
    console.error("❌ Transaction failed:", err.message);
    return false;
  }
};
