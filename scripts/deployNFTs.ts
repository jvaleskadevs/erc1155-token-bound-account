import { ethers } from "hardhat";

async function main() {
  // deploy NFT ERC1155 Ownable variant
  const ERC1155Ownable = await ethers.deployContract("ERC1155Ownable");

  await ERC1155Ownable.waitForDeployment();

  console.log(
    `ERC1155Ownable deployed to ${ERC1155Ownable.target}`
  );
  
  // deploy NFT ERC1155 OnlyFirstMinter variant
  const ERC1155OnlyFirstMinter = await ethers.deployContract("ERC1155OnlyFirstMinter");

  await ERC1155OnlyFirstMinter.waitForDeployment();

  console.log(
    `ERC1155OnlyFirstMinter deployed to ${ERC1155OnlyFirstMinter.target}`
  );
  
  // deploy NFT ERC1155 LimitedSupply variant
  const ERC1155LimitedSupply = await ethers.deployContract("ERC1155LimitedSupply");

  await ERC1155LimitedSupply.waitForDeployment();

  console.log(
    `ERC1155LimitedSupply deployed to ${ERC1155LimitedSupply.target}`
  );

  // deploy NFT ERC721 Mintable NFT for testing our accounts
  const ERC721Mintable = await ethers.deployContract("ERC721Mintable");

  await ERC721Mintable.waitForDeployment();

  console.log(
    `ERC721Mintable deployed to ${ERC721Mintable.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
