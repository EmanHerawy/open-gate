import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import dotenv from 'dotenv';
dotenv.config();

// import './tasks/index.ts';

const settings = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};
const config: HardhatUserConfig = {
    namedAccounts: {
    deployer: 0,
  },
  solidity: {

    compilers: [
      {
        version: '0.8.18',
        settings,
      },
      {
        version: '0.7.6',
        settings,
      },
      {
        version: '0.4.24',
        settings,
      },
    ],
  },
  networks: {
     hardhat: {
      saveDeployments: true,
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/tCbwTAqlofFnmbVORepuHNcsrjNXWdRJ',
      accounts: [process.env.PRIVATE_KEY || ''],
      saveDeployments: true,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [process.env.PRIVATE_KEY || ''],
      saveDeployments: true,
    },
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
    deploy: 'deploy',
    deployments: 'deployments',
    tests: './test',
    cache: './cache',
    artifacts: './build/artifacts',
  },
  
};

export default config;
