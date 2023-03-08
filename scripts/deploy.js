require("dotenv").config();
const hre = require("hardhat");
const{ethers} = require("ethers");
const percent = 10;
// const stakingTokenAddress = 1
const playedSecretKey = process.env.PLAYED_SECRET_KEY;
const wonSecretKey = process.env.WON_SECRET_KEY;
const subscriptionId = process.env.SUBSCRIPTION_ID;
async function main() {
  // We get the contract to deploy
  const StakingToken = await hre.ethers.getContractFactory("TLCToken");
  const GameContract = await hre.ethers.getContractFactory("GameContract");
  const StakingContract = await hre.ethers.getContractFactory("Staking");
  const WordContract = await hre.ethers.getContractFactory("VRFD20");

  const stakingToken = await StakingToken.deploy();
  const gameContract = await GameContract.deploy(
    percent,
    stakingToken.address,
    ethers.utils.toUtf8Bytes(playedSecretKey),
    ethers.utils.toUtf8Bytes(wonSecretKey)
  );
  const stakingContract = await StakingContract.deploy(
    stakingToken.address,
    gameContract.address
  );
  const wordContract = await WordContract.deploy(subscriptionId);

  await stakingToken.deployed();
  await gameContract.deployed();
  await stakingContract.deployed();
  await wordContract.deployed();

  console.log("stakingToken deployed to:", stakingToken.address);
  console.log("gameContract deployed to:", gameContract.address);
  console.log("stakingContract deployed to:", stakingContract.address);
  console.log("wordContract deployed to:", wordContract.address);

  await stakingToken.deployTransaction.wait(5);
  await gameContract.deployTransaction.wait(5);
  await stakingContract.deployTransaction.wait(5);
  await wordContract.deployTransaction.wait(5);

  await hre.run(`verify:verify`, {
    address: stakingToken.address,
    constructorArguments: [],
  });
  await hre.run(`verify:verify`, {
    address: gameContract.address,
    constructorArguments: [
      percent,
      stakingToken.address,
      ethers.utils.formatBytes32String(playedSecretKey.toString()),
      ethers.utils.formatBytes32String(wonSecretKey.toString()),
    ],
  });
  await hre.run(`verify:verify`, {
    address: stakingContract.address,
    constructorArguments: [stakingToken.address, gameContract.address],
  });
  await hre.run(`verify:verify`, {
    address: wordContract.address,
    constructorArguments: [subscriptionId],
  });

  //CALL AN IMPORTANT FUNCTION IN THE STAKIINGtOKEN
  try{
    await stakingToken.send95PercentTo(gameContract.address)
    console.log("successfully funded gameContract")
  }catch(err){
    console.log("ERROR IS _____", err)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
