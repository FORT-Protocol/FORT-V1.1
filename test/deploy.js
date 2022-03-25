const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');
const { ethers, upgrades } = require('hardhat');

describe('FortOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const FortOptions = await ethers.getContractFactory('FortOptions');
        const FortFutures = await ethers.getContractFactory('FortFutures');

        const { 
            eth, usdt, dcu, hbtc,
            cofi,
            pusd,
            peth,

            fortGovernance,
            fortOptions, fortFutures,
            nestPriceFacade, fortSwap
        } = await deploy();

        console.log('ok');

        // await fortGovernance.setGovernance('0x688f016CeDD62AD1d8dFA4aBcf3762ab29294489', 1);
        // await fortGovernance.setGovernance('0xd9f3aA57576a6da995fb4B7e7272b4F16f04e681', 1);
        // await dcu.setMinter('0x688f016CeDD62AD1d8dFA4aBcf3762ab29294489', 3);
        //await dcu.setMinter(owner.address, 3);

        //await dcu.mint(owner.address, toBigInt(100000));
    });
});
