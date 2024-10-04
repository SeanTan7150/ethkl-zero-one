import { ethers } from "ethers";
import { useContext, createContext } from "react";
import { contractABI } from "../contract/contractABI";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const contractAddress = "0x866e3b527FCdBD85348a9935845b70bA61702ebB";

  const dbg = async () => {
    return "Hello World Debug";
  };

  const registerNewArtist = async (
    name,
    priceForOneCredit,
    priceForThreeCredits,
    priceForFiveCredits
  ) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        const tx = await contractWithSigner.registerNewArtist(
          name,
          priceForOneCredit,
          priceForThreeCredits,
          priceForFiveCredits
        );
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  return (
    <ContractContext.Provider value={{ dbg, registerNewArtist }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
