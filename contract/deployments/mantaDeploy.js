async function main() {
  const PayToReach = await ethers.getContractFactory("PayToReach");
  console.log("Deploying PayToReach...");

  const payToReach = await PayToReach.deploy();

  await payToReach.deployed();

  console.log("PayToReach deployed to:", payToReach.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
