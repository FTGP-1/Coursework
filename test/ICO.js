const chai = require('chai');
const { expect } = chai;
const BN = require('bn.js');
const { Contract } = require('ethers');
const FACTORY = artifacts.require("./tokenFactory.sol");
const TOKEN = artifacts.require("./Token.sol");
const ICO = artifacts.require("./ICO.sol");

chai.use(require('chai-bn')(BN));

contract("ICO", async(accounts) => {
    let Factory;

    before('Create ICO and Token using Factory Contract.', async () => {

    Factory = await FACTORY.deployed();
    });

    it('Should permit token transfer to ICO instance.', async () => {
        Token = await Factory.genToken(
            "BrisToken",
            "BRS",
            new BN('1000'),
            accounts[1],
          );
        const tokInst = await TOKEN.at(Token.logs[0].args.tokenAdd);
        
        Ico = await Factory.genICO(
            tokInst.address,
            100,
            100,
            {from: accounts[0]}
          );
        const icoInst = await ICO.at(Ico.logs[0].args.ICOAddress);
    
        const bal0 = await tokInst.balanceOf.call(accounts[1]);
        expect(bal0).to.be.a.bignumber.that.equals('1000000000000000000000');

        const initialTrans = await tokInst.transfer(icoInst.address, new BN('1000000000000000000000'), {from: accounts[1]});
        // expect(initialTrans).to.equal(true);
        const icoBal = await tokInst.balanceOf.call(icoInst.address);
        expect(icoBal).to.be.a.bignumber.that.equals('1000000000000000000000');
    });

    it('Should facilitate token purchase.', async () => {
        const tokInst = await TOKEN.at(Token.logs[0].args.tokenAdd);
        const icoInst = await ICO.at(Ico.logs[0].args.ICOAddress);

        const Price = await icoInst.price.call();
        const purch = await icoInst.buyTokens(1, { from: accounts[2], value: Price });

        const bal2 = await tokInst.balanceOf.call(accounts[2]);
        expect(bal2).to.be.a.bignumber.that.equals('1000000000000000000');

        const tokSold = await icoInst.tokensSold.call()
        expect(tokSold).to.be.a.bignumber.that.equals('1');
    });

    it('Should permit refund for failed sale.', async () => {
        const tokInst = await TOKEN.at(Token.logs[0].args.tokenAdd);
        const icoInst = await ICO.at(Ico.logs[0].args.ICOAddress);

        const endf = await icoInst.endSale({from: accounts[0]})
        const refund = await icoInst.refund(1, {from: accounts[2]});
        const bal22 = await tokInst.balanceOf.call(accounts[2]);
        expect(bal22).to.be.a.bignumber.that.equals('0');
    });

    it('Should pay token owner when sale ended.', async () => {
        Token2 = await Factory.genToken(
            "Bris2oken",
            "BR2",
            new BN('1000'),
            accounts[1],
          );
        const tokInst2 = await TOKEN.at(Token2.logs[0].args.tokenAdd);
        
        Ico2 = await Factory.genICO(
            tokInst2.address,
            new BN('10000000000000000'),
            100,
            {from: accounts[0]},
          );
        const icoInst2 = await ICO.at(Ico2.logs[0].args.ICOAddress);

        const initialTrans2 = await tokInst2.transfer(icoInst2.address, new BN('1000000000000000000000'), {from: accounts[1]});
        const icoBal2 = await tokInst2.balanceOf.call(icoInst2.address);
        expect(icoBal2).to.be.a.bignumber.that.equals('1000000000000000000000');
        
        const price2 = await icoInst2.price.call();
        const purch2 = await icoInst2.buyTokens(100, {from: accounts[4], value: 100*price2});

        const bal4 = await tokInst2.balanceOf.call(accounts[4]);
        expect(bal4).to.be.a.bignumber.that.equals('100000000000000000000');
        
        const end = await icoInst2.endSale({from: accounts[0]});
        const bal1 = await tokInst2.balanceOf.call(accounts[1]);

        expect(bal1).to.be.a.bignumber.that.equals('900000000000000000000')

    });
});