const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('deploy', function() {
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
            nestPriceFacade, hedgeSwap
        } = await deploy();

        console.log('ok');

        // if (false) {
        //     // 1. Remove fortOptions and fortFutures from DCU minters
        // }

        // if (false) {
        //     // 2. Deploy and update FortOptions

        //     // 2.1. Deploy FortOptions
        //     // const newFortOptions = await FortOptions.deploy();
        //     // console.log('newFortOptions: ' + newFortOptions.address);

        //     // return;

        //     // 2.2. Verify contract code

        //     // 2.3. Update implementation
        //     // Proxy: 0x6C844d364c2836f2111891111F25C7a24da976A9
        //     // ProxyAdmin: 0x39016AeAe6F975796BFC007c7aA655fB691Fc6e8

        //     // 2.4. Register ETH ans HBTC
        //     // console.log('7. fortOptions.register(eth.address)');
        //     // await fortOptions.register(eth.address, {
        //     //     channelId: 0,
        //     //     pairIndex: 1,
                
        //     //     sigmaSQ: 45659142400n,
        //     //     miuLong: 64051194700n,
        //     //     miuShort: 0n
        //     // }, { nonce: 90 });
        //     // return;
        //     // console.log('8. fortOptions.register(hbtc.address)');
        //     // await fortOptions.register('0x0316EB71485b0Ab14103307bf65a021042c6d380', {
        //     //     channelId: 0,
        //     //     pairIndex: 0,
                
        //     //     sigmaSQ: 31708924900n,
        //     //     miuLong: 64051194700n,
        //     //     miuShort: 0n
        //     // });

        //     // 2.5. Check
        //     return;
        // }

        if (true) {
            // 3. Deploy and update FortFutures

            // 3.1. Deploy FortFutures
            // const newFortFutures = await FortFutures.deploy();
            // console.log('newFortFutures: ' + newFortFutures.address);

            // 3.2. Verify contract code
            
            // 3.3. Update implementation
            // Proxy: 0x622f1CB39AdE2131061C68E61334D41321033ab4
            // ProxyAdmin: 0x39016AeAe6F975796BFC007c7aA655fB691Fc6e8

            // 3.4. Register ETH and HBTC
            // console.log('9. fortFutures.register(eth.address)');
            // await fortFutures.register(eth.address, {
            //     channelId: 0,
            //     pairIndex: 1,
                
            //     sigmaSQ: 45659142400n,
            //     miuLong: 64051194700n,
            //     miuShort: 0n
            // });
            // return;
            // console.log('10. fortFutures.register(hbtc.address)');
            // await fortFutures.register('0x0316EB71485b0Ab14103307bf65a021042c6d380', {
            //     channelId: 0,
            //     pairIndex: 0,
                
            //     sigmaSQ: 31708924900n,
            //     miuLong: 64051194700n,
            //     miuShort: 0n
            // });
            // return;

            // 3.5. Register levels for HBTC
            // console.log('13. create hbtc long lever');
            // await fortFutures.create('0x0316EB71485b0Ab14103307bf65a021042c6d380', [1, 2, 3, 4, 5], true);
            // return;
            // console.log('14. create hbtc short lever');
            // await fortFutures.create('0x0316EB71485b0Ab14103307bf65a021042c6d380', [1, 2, 3, 4, 5], false);

            // 3.6. Check
        }
    });
});
