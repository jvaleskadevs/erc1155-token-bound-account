import { ethers } from "hardhat";

async function main() {
  const [signer, helper] = await ethers.getSigners();
   
  // Mint ERC1155 Ownable
  const ERC1155Ownable = ""; // address from deployNFTs.ts
  let nft = await ethers.getContractAt(
    "ERC1155Ownable", ERC1155Ownable
  );
  
  try {
    let tx = await nft.mint(
      signer.address, // to
      42n, // id
      1n,  // amount
      "0x42" // data
    );
    
    await tx.wait();
    
    console.log(tx);
  } catch (err) {
    console.log("ERC1155Ownable Signer failed");
  }
  
  try {
    let tx = await nft.mint(
      helper.address, // to
      42n, // id
      1n,  // amount
      "0x42" // data
    );
    
    await tx.wait();
    
    console.log(tx);
  } catch (err) {
    console.log(err);
    console.log("ERC1155Ownable Helper failed");
  }
  
  // Mint ERC1155 FirstMinter
  const ERC1155FirstMinter = 
    "0x65A868c2944f21fc6b9A79e2E864FDdaf7b6c377"; // address from deployNFTs.ts
  
  nft = await ethers.getContractAt(
    "ERC1155OnlyFirstMinter", ERC1155FirstMinter
  );
  
  // signer
  try {
    let tx = await nft.mint(
      signer.address, // to
      42n, // id
      1n,  // amount
      "0x42" // data
    );
    
    await tx.wait();
    
    console.log(tx);
  } catch (err) {
    console.log("ERC1155FirstMinter Signer failed");
  }  
  
  // helper
  try {
    let tx = await nft.mint(
      helper.address, // to
      42n, // id
      1n,  // amount
      "0x42" // data
    );
    
    await tx.wait();
    
    console.log(tx);
  } catch (err) {
    console.log("ERC1155FirstMinter Helper failed");
  } 

  // Mint ERC1155 Limited Supply
  const ERC1155LimitedSupply  = 
    "0x0B1a5c603d79AfC6B0D2B7ba3CE8dA196449Fc4A"; // address from deployNFTs.ts
  nft = await ethers.getContractAt(
    "ERC1155LimitedSupply", ERC1155LimitedSupply
  );
  
  // signer
  try {
    let tx = await nft.mint(
      signer.address, // to
      42n, // id
      1n,  // amount
      "0x42" // data
    );
    
    await tx.wait();
    
    console.log(tx);
  } catch (err) {
    console.log("ERC1155LimitedSupply failed");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
