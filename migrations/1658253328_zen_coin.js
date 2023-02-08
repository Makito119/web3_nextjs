const zenCoin = artifacts.require('ZenCoin');

module.exports = function(deployer) {
  const initSupply = 10000000;

  deployer.deploy(zenCoin, initSupply);
  // Use deployer to state migration tasks.
};
