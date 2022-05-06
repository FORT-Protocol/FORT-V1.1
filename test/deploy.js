const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('HedgeOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const FortOptions = await ethers.getContractFactory('FortOptions');
        const FortFutures = await ethers.getContractFactory('FortFutures');

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

        if (false) {
            // 1. Remove fortOptions and fortFutures from DCU minters
        }

        if (false) {
            // 2. Deploy and update FortOptions

            // 2.1. Deploy FortOptions
            const newFortOptions = await FortOptions.deploy();
            console.log('newFortOptions: ' + newFortOptions.address);

            // 2.2. Verify contract code

            // 2.3. Update

            // 2.4. Register ETH ans HBTC
            console.log('7. fortOptions.register(eth.address)');
            await fortOptions.register(eth.address, {
                channelId: 0,
                pairIndex: 1,
                
                sigmaSQ: 45659142400n,
                miuLong: 64051194700n,
                miuShort: 0n
            });
            console.log('8. fortOptions.register(hbtc.address)');
            await fortOptions.register(hbtc.address, {
                channelId: 0,
                pairIndex: 0,
                
                sigmaSQ: 31708924900n,
                miuLong: 64051194700n,
                miuShort: 0n
            });

            // 2.5. Check
        }

        if (false) {
            // 3. Deploy and update FortFutures

            // 3.1. Deploy FortFutures
            const newFortFutures = await FortFutures.deploy();
            console.log('newFortFutures: ' + newFortFutures.address);

            // 3.2. Verify contract code
            // 3.3. Update

            // 3.4. Register ETH and HBTC
            console.log('9. fortFutures.register(eth.address)');
            await fortFutures.register(eth.address, {
                channelId: 0,
                pairIndex: 1,
                
                sigmaSQ: 45659142400n,
                miuLong: 64051194700n,
                miuShort: 0n
            });
            console.log('10. fortFutures.register(hbtc.address)');
            await fortFutures.register(hbtc.address, {
                channelId: 0,
                pairIndex: 0,
                
                sigmaSQ: 31708924900n,
                miuLong: 64051194700n,
                miuShort: 0n
            });

            // 3.5. Register levels for HBTC
            console.log('13. create hbtc long lever');
            await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], true);
            console.log('14. create hbtc short lever');
            await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], false);

            // 3.6. Check
        }
    });
});
