const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('HedgeOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const HedgeOptions = await ethers.getContractFactory('HedgeOptions');
        const HedgeFutures = await ethers.getContractFactory('HedgeFutures');

        const { 
            eth, usdt, dcu, 
            cofi,
            pusd,
            peth,

            hedgeGovernance,
            hedgeOptions, hedgeFutures,
            nestPriceFacade, hedgeSwap
        } = await deploy();

        console.log('ok');

        // const newHedgeOptions = await HedgeOptions.deploy();
        // console.log('newHedgeOptions: ' + newHedgeOptions.address);
        
        const newHedgeFutures = await HedgeFutures.deploy();
        console.log('newHedgeFutures: ' + newHedgeFutures.address);

        return;

        //await nest.approve(hedgeSwap.address, toBigInt(100000000));
        //await hedgeSwap.setNestTokenAddress(nest.address);
        //await hedgeSwap.deposit(1);

        //await usdt.approve('0x4A448cBb12e449D7031f36C8122eCE6dDdf9cc84', toBigInt(10000000));
        await usdt.transfer(owner.address, toBigInt(10000000));
        console.log(await usdt.balanceOf(owner.address) + 'usdt');
        return;

        const ONE_MONTH = 200000;
        const ONE_YEAR = ONE_MONTH * 12;
        const TWO_YEAR = ONE_YEAR * 2;

        let xtokens = [
            nest.address,
            nhbtc.address,
            cofi.address,
            pusd.address,
            peth.address,
            nest.address
        ];

        let cycles = [
            ONE_MONTH,
            ONE_MONTH,
            ONE_MONTH,
            ONE_MONTH,
            ONE_MONTH,
            TWO_YEAR
        ];

        let weights = [
            2000000,
            500000,
            500000,
            500000,
            500000,
            36000000
        ];

    });
});
