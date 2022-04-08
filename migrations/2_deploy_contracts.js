
//var Token = artifacts.require("./Token.sol")
var tokenFactory = artifacts.require("./tokenFactory.sol")

module.exports = function(deployer) {
    //deployer.deploy(Token);
    deployer.deploy(tokenFactory);
};
