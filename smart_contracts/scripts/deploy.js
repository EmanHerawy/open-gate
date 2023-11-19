// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");
const { network, ethers }= require("hardhat");
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    
    const accounts = await ethers.getSigners();
    const router = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
    const subscriptionId = 20;
    // const _checkLogic=`${}`
    // variables go here 


    /*******************************get Artifacts ******************************* */
    const DAOToken = await hre.ethers.getContractFactory("DAOToken");
    const Registration = await hre.ethers.getContractFactory("Registration");
    const ContributionPool = await hre.ethers.getContractFactory("ContributionPool");
     

    const token = await DAOToken.deploy(accounts[0], accounts[0]);
    await token.deployed();
    await token.mint(accounts[0], 1000000000000000000000000000);

    const register = await Registration.deploy(token.address,100);
    await register.deployed();
    /**address oracle, address _registration, address _token,uint64 _subscriptionId,  string memory _checkLogic) */
    const pool = await ContributionPool.deploy(router, register.address, token.address, subscriptionId);
    await pool.deployed();


    console.log("pool deployed to:", pool.address);

    // add to minter role 
    await token.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", pool.address)


    


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });