require("@nomiclabs/hardhat-waffle");
require("@tenderly/hardhat-tenderly");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("tenderly", "Verifies a contract on tenderly.")
  .addOptionalParam("address", "The contract's address")
  .addOptionalParam("net", "The network the contract is deployed to")
  .addOptionalParam("name", "The contract's name")
  .setAction(async (taskArgs) => {
    // const name = taskArgs.name || "MyToken";
    const network = taskArgs.net || "kovan";
    // const address = taskArgs.address;
    // if (!address)
    //   throw Error(
    //     "Contract address required. Use --address flag to set the contract's address."
    //   );
    const contracts = [
      {
        name: "MyToken",
        network,
        address: "0xd542b0e18e22da1c163c4b754bb33ae091f89469",
      },
    ];
    await hre.tenderly.verify(...contracts);
    await hre.tenderly.push(...contracts);
  });

module.exports = {
  defaultNetwork: "kovan",
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT,
    username: process.env.TENDERLY_USERNAME,
  },
  solidity: "0.8.4",
};
