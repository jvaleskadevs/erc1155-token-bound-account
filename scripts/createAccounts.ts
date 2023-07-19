import { ethers } from "hardhat";

async function main() {
  const [signer, helper] = await ethers.getSigners();
  
  const ERC6551Registry = 
    "0x23f5fa4cc4f21d6afdd44f95927693cb115b22fd"; // address from deployRegistry.ts
  const ercRegistry6551 = await ethers.getContractAt(
    "ERC6551Registry", ERC6551Registry
  );
  const erc1155BoundedAccountImplAddr =
    "0x6606FD7d36a6968e0ED9a7Fc2ECD15A9eF899538"; // address from deployAccount.ts
    
  // Create account bounded to ERC1155 Ownable
  const ERC1155Ownable = 
    ""; // address from deployNFTs.ts
  try {
    const tx = await ercRegistry6551.createAccount(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155Ownable,
      42, // ID
      0, // random salt
      "0x" // initData
    );
    //console.log(tx);
    
    const accountAddress = await ercRegistry6551.account(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155Ownable,
      42, // ID
      0 // random salt
    );
    
    console.log(`ERC1155Ownable bounded account created at:\n${accountAddress}`);
  } catch (err) {
    console.log(err);
    console.log(`ERC1155Ownable failed`);
  }
  
  // Create account bounded to ERC1155 First Minter
  const ERC1155FirstMinter = 
    "0x65A868c2944f21fc6b9A79e2E864FDdaf7b6c377"; // address from deployNFTs.ts
  try {
    const tx = await ercRegistry6551.createAccount(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155FirstMinter,
      42, // ID
      0, // random salt
      "0x" // initData
    );
    //console.log(tx);
    
    const accountAddress = await ercRegistry6551.account(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155FirstMinter,
      42, // ID
      0 // random salt
    );
    
    console.log(`ERC1155FirstMinter bounded account created at:\n${accountAddress}`);
  } catch (err) {
    console.log(err);
    console.log(`ERC1155FirstMinter failed`);
  }
  
  // Create account bounded to ERC1155 Limited Supply
  const ERC1155LimitedSupply  = 
    "0x0B1a5c603d79AfC6B0D2B7ba3CE8dA196449Fc4A"; // address from deployNFTs.ts
  try {
    const tx = await ercRegistry6551.createAccount(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155LimitedSupply,
      42, // ID
      0, // random salt
      "0x" // initData
    );
    //console.log(tx);
    
    const accountAddress = await ercRegistry6551.account(
      erc1155BoundedAccountImplAddr,
      80001, // chainId
      ERC1155LimitedSupply,
      42, // ID
      0 // random salt
    );
    
    console.log(`ERC1155LimitedSupply bounded account created at:\n${accountAddress}`);
  } catch (err) {
    console.log(err);
    console.log(`ERC1155LimitedSupply failed`);
  }  
}  

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
