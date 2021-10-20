const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('HedgeOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        const TestERC20 = await ethers.getContractFactory('TestERC20');

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
            nestPriceFacade
        } = await deploy();

        console.log('部署完成');

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

        // // 2. 设置挖矿启动参数
        // // 取一个好数字，锁仓准备取为 13408888 ~ 13458888
        // console.log('9.hedgeVaultForStaking.setConfig()');
        // await hedgeVaultForStaking.setConfig(100000000000000000n, 13408888, 13458888 - TWO_YEAR);
        // console.log('10.hedgeVaultForStaking.batchSetPoolWeight()');
        // await hedgeVaultForStaking.batchSetPoolWeight([nest.address], [TWO_YEAR], [36000000]);

        // console.log('11.hedgeVaultForStaking.setConfig()');
        // await hedgeVaultForStaking.setConfig(100000000000000000n, 13408888, 13458888 - ONE_MONTH);
        // console.log('12.hedgeVaultForStaking.batchSetPoolWeight()');
        // await hedgeVaultForStaking.batchSetPoolWeight([
        //     nest.address,
        //     nhbtc.address,
        //     cofi.address,
        //     pusd.address,
        //     peth.address
        // ], [
        //     ONE_MONTH,
        //     ONE_MONTH,
        //     ONE_MONTH,
        //     ONE_MONTH,
        //     ONE_MONTH
        // ], [
        //     2000000,
        //     500000,
        //     500000,
        //     500000,
        //     500000
        // ]);

        // console.log('13.hedgeVaultForStaking.setConfig()');
        // await hedgeVaultForStaking.setConfig(100000000000000000n, 13408888, 13458888);

        let total = 0n;
        for (var i = 0; i < xtokens.length; ++i) {
            let xi = await hedgeVaultForStaking.getChannelInfo(xtokens[i], cycles[i]);
            total += BigInt(xi.totalRewards);
            
            let token = await TestERC20.attach(xtokens[i]);
            console.log({
                name: await token.name(),
                cycle: cycles[i],
                totalRewards: xi.totalRewards.toString(),
                totalStaked: xi.totalStaked.toString(),
                unlockBlock: xi.unlockBlock.toString()
            });
        }

        console.log('total: ' + total);

        return;

        let ba = await hedgeGovernance.getBuiltinAddress();
        console.log(ba);
        expect(ba.dcuToken).to.eq(dcu.address);
        expect(ba.hedgeVaultForStaking).to.eq(hedgeVaultForStaking.address);
        expect(ba.nestPriceFacade).to.eq(nestPriceFacade.address);
        
        expect(await hedgeGovernance.getDCUTokenAddress()).to.eq(dcu.address);
        expect(await hedgeGovernance.getHedgeVaultForStakingAddress()).to.eq(hedgeVaultForStaking.address);
        expect(await hedgeGovernance.getNestPriceFacade()).to.eq(nestPriceFacade.address);

        console.log('minter1: ' + await dcu.checkMinter(owner.address));
        console.log('minter2: ' + await dcu.checkMinter(hedgeVaultForStaking.address));

        console.log(await hedgeVaultForStaking.getConfig());
    });
});
