import { ethers } from "hardhat";

async function main() {
  const [signer, helper, nonHolder] = await ethers.getSigners();
   
  // ERC721 Mintable 
  const ERC721Mintable = "0x6bf3640F53D67cFF564272675181C5d6AF92C868";
  const ERC721MintableABI = ["function safeMint(address to) public"];
  const ERC721MintableIface = new ethers.Interface(ERC721MintableABI);
  
  // ERC1155 Bounded Account
  // Comment and uncomment to test different variants of ERC1155
  // ERC1155Ownable
  //const accountAddress = "0xd6fd74cab0929a7e79fb3ba97152b1cdedded824";
  // ERC1155OnlyFirstMinter
  //const accountAddress = "0x3653936b6689c584ac5d678ac6d6c25330d4604f";
  // ERC1155LimitedSupply
  const accountAddress = "0x2bb2f060c1d60e0c201afd1960f12bb3983164c1";
  const account = await ethers.getContractAt(
    "ERC1155BoundedAccount", accountAddress
  );
   
  // Mint with the signer signature
  // ERC1155Ownable · the account should mint
  // ERC1155OnlyFirstMinter · the account should mint
  // ERC1155LimitedSupply · the account should mint
  try {
    let tx = await account.executeCall(
      ERC721Mintable,
      0n,
      ERC721MintableIface.encodeFunctionData(
        "safeMint",
        [account.target],
        0n
      )
    );
    
    await tx.wait();
    
    console.log("Tx 0:");
    console.log(tx);
  } catch (err) {
    console.log("Tx 0: failed");
  }
  
  // Mint with the helper signature
  // ERC1155Ownable · the account should mint
  // ERC1155OnlyFirstMinter · the account should mint
  // ERC1155LimitedSupply · helper is a non holder, should fail!
  try {
    let tx = await account.connect(helper).executeCall(
      ERC721Mintable,
      0n,
      ERC721MintableIface.encodeFunctionData(
        "safeMint",
        [account.target],
        0n
      )
    );
    
    await tx.wait();
    
    console.log("Tx 1:");
    console.log(tx);
  } catch (err) {
    console.log("Tx 1: failed");
  }    
  
  // Mint with a non holder signature
  // the next call SHOULD revert and break the script execution
  // Not token owner error, for all ERC1155 samples
  try { 
    let tx = await account.connect(nonHolder).executeCall(
      ERC721Mintable,
      0n,
      ERC721MintableIface.encodeFunctionData(
        "safeMint",
        [account.target],
        0n
      )
    );
    
    await tx.wait();
    
    console.log("Tx 2:");
    console.log(tx);
  } catch (err) {
    console.log("Tx 2: failed");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
