# ERC-1155 Token Bound Account
ERC-1155 token bound account is an approximation to an implementation of ERC-6551 supporting ERC-1155 tokens instead ERC-721.
## Setup
- Clone the repo:
```
git clone https://github.com/jvaleskadevs/erc1155-token-bound-account.git
```
- Install dependencies:
```
npm install
```
- Copy the `.env.sample` and fill it with your environment variables:
```
cp .env.sample .env
```
You will need 3 private keys (signer, helper and non-holder), an RPC url and an optional PolygonScan apiKey.

## Deploy
- Deploy ERC-6551 Registry:
```
npx hardhat run scripts/deployRegistry.ts
```
- Deploy ERC-1155 Token Bound Account implementation:
```
npx hardhat run scripts/deployAccount.ts
```
- Deploy the ERC-1155 NFTs variants, the erc1155BoundedAccount implementation will be bounded to them:
```
npx hardhat run scripts/deployNFTs.ts
```
It will deploy an ERC-721 NFT contract too, we will be minting some of these NFTs to test our ERC-1155 Token Bounded Account.

## Minting the ERC-1155 tokens to bound accounts to
First, we need to mint the ERC-1155 tokens to bound our smart accounts to them.
For testing I have been minting the ERC-1155 tokens trough PolygonScan.
But, a script to do that can be found at `scripts/mintERC1155Nfts.ts`, fill it with the addresses from `deployNfts.ts` and run it:
```
npx hardhat run scripts/mintERC1155Nfts.ts
```
It includes the addresses of `ERC1155FirstMinter` and `ERC1155LimitedSupply`, feel free to use them, but be aware that some tokenIds may have been minted previously. The `ERC1155Ownable` is not included. Obviously, it implements an `onlyOwner` modifier.

## Create Accounts
After that, we are ready to create our Token Bounded Accounts through the ERC6551Registry contract. 
For testing I have been creating the Token Bounded Accounts trough PolygonScan.
(tomorrow I will provide an script to do that too, in the meantime you may use PolygonScan to call the`createAccount` function)
The transaction parameters should look like that:
```
createAccount(
  implementationAddress, // the erc1155BoundedAccount address from the deployAccount script.
  80001, // chainId, polygon Mumbai.
  nftContractAddress, // address of the erc1155 nft contract to bound the accounts to.
  tokenId, // erc1155 ID of the NFT to bound the account to
  0, // a random salt, any value.
  0x, // initData
)
```
After successfully confirm the transaction, check the address of your account in the event logs in PolygonScan.

## Test
- Minting some NFTs (ERC-721) from our ERC-1155 Token Bounded Account:
```
npx hardhat run scripts/executeMintFromSmartAccount.ts
```
This script includes the ability to connect to any of our Token Bounded Account variants, (ERC1155Ownable, ERC1155OnlyFirstMinter or/and ERC1155LimitedSupply). Just comment/uncomment the `accountAddress` variable with the right one address.
These addresses are easy to find in the Event Logs of the `createAccount` transaction.

- The `useAccount` script does some tests over the signature's validation.

