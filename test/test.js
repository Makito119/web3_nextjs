const Web3 = require('web3');

const ubcoinJson = require('../build/contracts/ZenCoin.json');

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://polygon-mumbai.infura.io/v3/81984a3dbd7d4446886a8add0f51aa79`),
);
//testnet mainnet
const ubContractAddresss = '0xA0fb1d7876A37Feb068Bed848f120eD06d5F38E1'; // 永続的
const WalletAddress = '0x2D83a1b9D5649d324d623D792D7CC60a835aBA51'; // My address
//const toWallet = ''; //infuraのエンドポイント


const contract = new web3.eth.Contract(ubcoinJson.abi, ubContractAddresss);
(async () => {
  //console.log("🚀 ~ file: test.js ~ line 13 ~ instance", instance)
  //let instance = await web3.eth.getAccounts(WalletAddress);
    const balanceUB = await contract.methods.balanceOf(WalletAddress).call();
  const balance = await web3.eth.getBalance(WalletAddress);

  console.log('🚀 ~ file: test.js ~ line 20 ~ balanceUB', balanceUB);
  console.log('🚀 ~ file: test.js ~ line 22 ~ balance', balance);

  //console.log(contract)

  const balanceUB1 = web3.utils.fromWei(balanceUB)
  const balance1 = web3.utils.fromWei(balance)
  console.log("🚀 ~ file: test.js ~ line 27 ~ balanceUB1", balanceUB1)
  console.log("🚀 ~ file: test.js ~ line 29 ~ balance1", balance1)
  
})();