import { ethers } from "hardhat";

async function main() {

  const [signer, helper, nonHolder] = await ethers.getSigners();
  console.log(signer.address);
  console.log(helper.address);
  console.log(nonHolder.address);
  
  const account = await ethers.getContractAt(
    "ERC1155BoundedAccount", "0x66962EcB61eD95b455955955f1768ce8b7A17BFE"
  );
  
  /*  SEND MATIC FROM ERC1155BoundedAccount to Helper EOA
  let tx = await account.executeCall(
    "0xC774bc140b6F2dbe71ED15668c7D1FAD526aCba7",
    ethers.parseEther("0.001"),
    "0x00"
  );
  
  await tx.wait();
  
  console.log(tx);
  */
  
  const message = "Hello world!";
  console.log(message);
  const messageHash = ethers.hashMessage(ethers.toUtf8Bytes(message));
  console.log(messageHash);

  const signature = await signer.signMessage(message);
  console.log(ethers.verifyMessage(message, signature));
  
  
  let tx = await account.isValidSignature(
    messageHash, signature
  );
  
  console.log(tx);
  
  const signatureHelper = await helper.signMessage(message);
  console.log(ethers.verifyMessage(message, signatureHelper));
  
  
  tx = await account.isValidSignature(
    messageHash, signatureHelper
  );
  
  console.log(tx);
  
  const signatureNonHolder = await nonHolder.signMessage(message);
  console.log(ethers.verifyMessage(message, signatureNonHolder));
  
  
  tx = await account.isValidSignature(
    messageHash, signatureNonHolder
  );
  
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
