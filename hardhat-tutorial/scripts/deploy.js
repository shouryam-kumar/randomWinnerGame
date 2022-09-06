const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {
  const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");
  const deployedRandomWinnerGame = await randomWinnerGame.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );

  console.log("Deploying Transaction")
  await deployedRandomWinnerGame.deployTransaction.wait(6);
  console.log(`Transaction deployed at ${deployedRandomWinnerGame.address}`)  // 0xb43B7Bb6cF4721bcd2412790bE6cf344Ad915C34
  console.log("----------------------------------------------------------------")

  console.log(
    "Verify Contract Address: ",
    deployedRandomWinnerGame.address
  );

  await hre.run("verify:verify", {
    address: deployedRandomWinnerGame.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]
  });
}

main()
  .then(()=> process.exit(0))
  .catch((err)=>{
    console.error(err);
    process.exit(1);
  })
  