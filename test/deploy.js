const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('FortOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const FortOptions = await ethers.getContractFactory('FortOptions');
        const FortFutures = await ethers.getContractFactory('FortFutures');

        const { 
            eth, usdt, dcu, 
            cofi,
            pusd,
            peth,

            fortGovernance,
            fortOptions, fortFutures,
            nestPriceFacade, fortSwap
        } = await deploy();

        console.log('ok');

        // const newFortOptions = await FortOptions.deploy();
        // console.log('newFortOptions: ' + newFortOptions.address);

        // const newFortFutures = await FortFutures.deploy();
        // console.log('newFortFutures: ' + newFortFutures.address);

        return;

        //await nest.approve(fortSwap.address, toBigInt(100000000));
        //await fortSwap.setNestTokenAddress(nest.address);
        //await fortSwap.deposit(1);

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
