import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
    const router = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
    const subscriptionId = 20;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
