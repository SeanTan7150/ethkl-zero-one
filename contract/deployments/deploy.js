const { ethers } = require("hardhat");

async function main() {
  const PayToReach = await ethers.getContractFactory("PayToReach");
  const payToReach = await PayToReach.deploy();

  console.log(`Deployed to ${payToReach.address}`);
  console.log(
    `Block explorer URL: https://blockscout.scroll.io/address/${payToReach.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
