const { parseEther } = require('ethers/lib/utils')

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy,get, execute } = deployments
  const { deployer } = await getNamedAccounts()
   let register = await get('Registration')
   let token = await get('DAOToken')
   const router = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
  const subscriptionId = 20;
  const github = "https://github.com/foundry-rs/foundry";
  const prUrl = "https://github.com/foundry-rs/foundry/pull/6354";
  const bugbounty = 2;
      const _checkLogic=`const repo = args[0];
const prNum = args[1];
const token = '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'; 

if (!token) {
  throw Error("Missing secret: github token");
}

const getPrDetailsUrl = repo
  .replace("https://github.com/", "https://api.github.com/repos/") + '/pulls/' + prNum

const headers = {
  Authorization: 'token ' + token,
  Accept: "application/vnd.github.mockingbird-preview",
};

let apiResponse = await Functions.makeHttpRequest({ url: getPrDetailsUrl, headers });


if (apiResponse.error) {
  console.error(apiResponse.error);
  throw Error("Request failed");
}

const { data } = apiResponse;


const { merged, user, created_at } = data;

if (!merged) {
  throw new Error('Pull request #' + prNum + 'is not merged or could be closed');
}

return Functions.encodeString(JSON.stringify({
  created_at,
  user: user.login,
}));
`
    // variables go here 
  // const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
 const pool= await deploy('ContributionPool', {
    from: deployer,
    args: [
     
     
   router, register.address, token.address, subscriptionId, _checkLogic
    ],
    log: true,
 })
  
   await execute('DAOToken', {from: deployer, log: true},'mint',deployer,10000)

 await execute('DAOToken', {from: deployer, log: true},"grantRole",'0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', pool.address)
await execute('Registration', {from: deployer, log: true},'joinAsContributor',"DaniPopes")
 await execute('Registration', {from: deployer, log: true},'joinAsOpenSourceProjectCreator')
 await execute('ContributionPool', {from: deployer, value:30, log: true},'listRepo',github,bugbounty)
 await execute('ContributionPool', {from: deployer, log: true},'claim',github,prUrl)
}
 module.exports.tags = ['ContributionPool']