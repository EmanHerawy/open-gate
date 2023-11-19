const { parseEther } = require('ethers/lib/utils')

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy,get } = deployments
  const { deployer } = await getNamedAccounts()
   let token = await get('DAOToken')

  // const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
  await deploy('Registration', {
    from: deployer,
    args: [
     
     
      token.address,
      100,
    ],
    log: true,
  })
 }
module.exports.tags = ['Registration']