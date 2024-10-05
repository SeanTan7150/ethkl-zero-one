require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    scroll: {
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    manta: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http",
      chainId: 3441006,
    },
  },
  settings: {
    optimizer: {
      runs: 200,
      enabled: true,
    },
  },
};
