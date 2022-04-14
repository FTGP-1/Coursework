const chai = require('chai');
const { expect } = chai;
const BN = require('bn.js');
const { Contract } = require('ethers');
const FACTORY = artifacts.require("./tokenFactory.sol");
const TOKEN = artifacts.require("./Token.sol");
const ICO = artifacts.require("./ICO.sol");

chai.use(require('chai-bn')(BN));

contract("ICO", async accounts => {
    let Token;
    let ICO;
});