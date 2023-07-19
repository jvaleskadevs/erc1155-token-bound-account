import { ethers } from "hardhat";

async function main() {
  const ERC1155BoundedAccount = await ethers.deployContract("ERC1155BoundedAccount");

  await ERC1155BoundedAccount.waitForDeployment();

  console.log(
    `ERC1155BoundedAccount deployed to ${ERC1155BoundedAccount.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
