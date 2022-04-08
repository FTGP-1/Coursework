const chai = require('chai');
const { expect } = chai;
const BN = require('bn.js');
const FACTORY = artifacts.require("./tokenFactory.sol");
const TOKEN = artifacts.require("./Token.sol");

chai.use(require('chai-bn')(BN));

contract("Factory", async accounts => {
    let Factory;
    let Token;
  
    before("Create new instance of factory contract", async () => {
      Factory = await FACTORY.deployed();
    });
  
    it("Should use factory to deploy new ERC20 token", async () => {
      Token = await Factory.genToken(
        "Demo Token",
        "DMO",
        new BN('1'),
      );
      const TokenInstance = await TOKEN.at(Token.logs[0].args.tokenAdd);
      const balance = await TokenInstance.balanceOf.call(accounts[0]);
      expect(balance).to.be.a.bignumber.that.equals('1000000000000000000')
    });

});