import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  gameContract,
  gameabi,
  stakingContract,
  stakingabit,
} from "../constants";
import { useRouter } from "next/router";
import { useStateContext } from "./AuthContext";

export const Gameplay = createContext();

export const GameplayProvider = (props) => {
  const router = useRouter();
  const { address } = useStateContext();
  console.log(address)
  const [userStake, setUserStake] = useState("");

  async function connectToNetwork() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return provider;
    } else {
      throw new Error("Please install MetaMask to use this application.");
    }
  }

  async function callStakeToken(value) {
    try {
      const provider = await connectToNetwork();
  
      // Get the signer (connected account)
      const signer = provider.getSigner();
  
      // Create a contract instance
      const amount = ethers.utils.parseEther(value.toString());
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.stake(amount);
      await tx.wait(); // Await the transaction to be mined
      router.push("/game");
    } catch (error) {
      alert(error.message);
      console.log(error.message)
    }
  }
  
  async function callWithdrawToken(value) {
    try {
      const provider = await connectToNetwork();
  
      // Get the signer (connected account)
      const signer = provider.getSigner();
  
      // Create a contract instance
      const amount = ethers.utils.parseEther(value.toString());
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.withdrawStaked(amount);
      await tx.wait(); // Await the transaction to be mined
      router.push("/game");
    } catch (error) {
      alert(error.message);
    }
  }
  
  async function callGetStakedToken() {
    try {
      const provider = await connectToNetwork();
  
      // Get the signer (connected account)
      const signer = provider.getSigner();
  
      // Create a contract instance
      const contract = new ethers.Contract(
        stakingContract,
        stakingabit,
        signer
      );
      const tx = await contract.getStaked(address);
      setUserStake(tx.toString()); // Convert the BigNumber to a string
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    callGetStakedToken();
  }, [address]);

  return (
    <Gameplay.Provider
      value={{
        callStakeToken,
        callWithdrawToken,
        userStake
      }}
    >
      {props.children}
    </Gameplay.Provider>
  );
};


export const useGameContext = () => {
  const contextValue = useContext(Gameplay);
  if (contextValue === null) {
    throw new Error("useErrandContext must be used within a PolyverseProvider");
  }
  return contextValue;
};
