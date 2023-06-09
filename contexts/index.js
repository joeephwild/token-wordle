import { createContext } from "react"
import { ethers } from "ethers";

const Gameplay = createContext()

export const GameplayProvider = (props) => {
    async function connectToNetwork() {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          return provider;
        } else {
          throw new Error("Please install MetaMask to use this application.");
        }
      }

      async function callSmartContractFunctions() {
        const provider = await connectToNetwork();
      
        // Contract address and ABI
        const contractAddress = "CONTRACT_ADDRESS"; // Replace with your contract address
        const contractABI = [
          // Replace with your contract ABI
        ];
      
        // Get the signer (connected account)
        const signer = provider.getSigner();
      
        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
        // Call the awardItem function
        const player = "PLAYER_ADDRESS"; // Replace with the player's address
        const tokenURI = "TOKEN_URI"; // Replace with the token URI
        const newItemId = await contract.awardItem(player, tokenURI);
        console.log("New Item ID:", newItemId);
      
        // Call the redeemItem function
        const itemId = 1; // Replace with the item ID to redeem
        const isRedeemed = await contract.redeemItem(itemId);
        console.log("Redeemed:", isRedeemed);
      }
      
  return (
    <Gameplay.Provider
      value={{
      
      }}
    >
      {props.children}
    </Gameplay.Provider>
  );
};
export default GameplayContext;
