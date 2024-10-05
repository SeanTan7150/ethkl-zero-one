import { ethers } from "ethers";
import { useContext, createContext } from "react";
import { contractABI } from "../contract/contractABI";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const contractAddress = "0x06cd47372F721c9991efe6eEED75B43552dD24f0";

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

        const price1InWei = ethers.utils.parseEther(
          priceForOneCredit.toString()
        );
        const price3InWei = ethers.utils.parseEther(
          priceForThreeCredits.toString()
        );
        const price5InWei = ethers.utils.parseEther(
          priceForFiveCredits.toString()
        );

        const tx = await contractWithSigner.registerNewArtist(
          name,
          price1InWei,
          price3InWei,
          price5InWei
        );
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const artistSetPrice = async (
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

        const price1InWei = ethers.utils.parseEther(
          priceForOneCredit.toString()
        );
        const price3InWei = ethers.utils.parseEther(
          priceForThreeCredits.toString()
        );
        const price5InWei = ethers.utils.parseEther(
          priceForFiveCredits.toString()
        );

        const tx = await contractWithSigner.artistSetPrice(
          price1InWei,
          price3InWei,
          price5InWei
        );
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const buyCredit = async (
    artistAddress,
    creditAmount,
    creditType,
    paymentAmount
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

        const amountInWei = ethers.utils.parseEther(paymentAmount.toString());

        const tx = await contractWithSigner.buyCredit(
          artistAddress,
          creditAmount,
          creditType,
          { value: amountInWei }
        );
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const claimRewards = async (pr2ID, numberOfClaims) => {
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

        const tx = await contractWithSigner.claimRewards(pr2ID, numberOfClaims);
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const refundCredits = async (pr2ID, numberOfRefunds) => {
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

        const tx = await contractWithSigner.refundCredits(
          pr2ID,
          numberOfRefunds
        );
        console.log("Transaction sent: ", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction successful: ", receipt.transactionHash);
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const getLatestP2RID = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );

        const id = await contract.getLatestP2RID();
        return id;
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
      return -1;
    }
  };

  return (
    <ContractContext.Provider
      value={{
        dbg,
        registerNewArtist,
        artistSetPrice,
        buyCredit,
        claimRewards,
        refundCredits,
        getLatestP2RID,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
