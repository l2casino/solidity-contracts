const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await upgrades.deployProxy(MyToken);
  await token.deployed();

  const implementation = await ethers.provider.getStorageAt(
    token.address,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
  );
  const implementationAddress = ethers.utils.hexStripZeros(implementation);

  console.log("Proxy deployed to:", token.address);
  console.log("MyToken deployed to:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
