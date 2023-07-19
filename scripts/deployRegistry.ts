import { ethers } from "hardhat";

async function main() {
  const ERC6551Registry = await ethers.deployContract("ERC6551Registry");

  await ERC6551Registry.waitForDeployment();

  console.log(
    `ERC6551Registry deployed to ${ERC6551Registry.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
