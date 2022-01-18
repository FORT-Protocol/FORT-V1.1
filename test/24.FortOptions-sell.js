const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('FortOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        
        const { eth, usdt, hbtc, dcu, fortOptions, fortFutures, nestPriceFacade } = await deploy();

        await dcu.setMinter(owner.address, 1);
        await dcu.mint(owner.address, '10000000000000000000000000');
        
        console.log('owner: ' + toDecimal(await dcu.balanceOf(owner.address) )+ 'dcu');
        console.log('owner: ' + owner.address);

        await nestPriceFacade.setPrice(hbtc.address, '74000000000000000', 1);
        await nestPriceFacade.setPrice(usdt.address, '3510000000', 1);

        const BLOCK = 100000;
        await fortOptions.open(eth.address, '2450000000', true, BLOCK, toBigInt(1000), {
            value: toBigInt(0.01)
        });
        // let fot = await fortOptions.getOptionInfo(
        //     eth.address,
        //     '2450000000',
        //     true,
        //     BLOCK
        // );
        let fot = { index: 0 };

        console.log('owner: ' + toDecimal(await dcu.balanceOf(owner.address)) + 'dcu');
        console.log('owner: ' + toDecimal(await fortOptions.balanceOf(fot.index, owner.address)) + '(fot)');
        console.log();

        await fortOptions.sell(fot.index, await fortOptions.balanceOf(fot.index, owner.address), { value: toBigInt(0.01) });
        console.log('卖出后');
        console.log('owner: ' + toDecimal(await dcu.balanceOf(owner.address)) + 'dcu');
        console.log('owner: ' + toDecimal(await fortOptions.balanceOf(fot.index, owner.address)) + '(fot)');
    });
});
