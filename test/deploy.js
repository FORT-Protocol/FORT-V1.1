const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('HedgeOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const TestERC20 = await ethers.getContractFactory('TestERC20');
        const HedgeOptions = await ethers.getContractFactory('HedgeOptions');
        const HedgeFutures = await ethers.getContractFactory('HedgeFutures');

        const { 
            eth, usdt, dcu, 
            nest,
            nhbtc,
            cofi,
            pusd,
            fortube,
            peth,

            hedgeGovernance,
            hedgeOptions, hedgeFutures, hedgeVaultForStaking,
            nestPriceFacade, hedgeSwap
        } = await deploy();
       
        console.log('ok');

        // const newHedgeOptions = await HedgeOptions.deploy({ nonce: 72 });
        // console.log('newHedgeOptions: ' + newHedgeOptions.address);

        const newHedgeFutures = await HedgeFutures.deploy({ nonce: 74 });
        console.log('newHedgeFutures: ' + newHedgeFutures.address);
        
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
