import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_URL,
      accounts: [process.env.PK, process.env.PK_HELPER, process.env.PK_NON_HOLDER]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGON_SCAN_KEY
  }
};

export default config;
