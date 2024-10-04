import { useContext, createContext } from "react";

const ContractContext = createContext();

export const ContractContextProvider = ({ children }) => {
  const dbg = async () => {
    return "Hello World Debug";
  };

  return (
    <ContractContext.Provider value={dbg}>{children}</ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
