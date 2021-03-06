const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('16.FortBase-test', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        
        const { 
            eth, usdt, hbtc, dcu, 
            fortOptions, fortFutures, nestPriceFacade, fortGovernance,
            fortVaultForStaking, fortDAO, USDT_DECIMALS
        } = await deploy();

        await dcu.setMinter(owner.address, 1);
        await dcu.mint(owner.address, '10000000000000000000000000');
        
        console.log('owner: ' + toDecimal(await dcu.balanceOf(owner.address) )+ 'dcu');
        console.log('owner: ' + owner.address);

        const NestPriceFacade = await ethers.getContractFactory('NestPriceFacade');
        await nestPriceFacade.setPrice(hbtc.address, '74000000000000000', 1);
        await nestPriceFacade.setPrice(usdt.address, '3510000000', 1);

        const getAccountInfo = async function(account) {
            let acc = account;
            account = account.address;
            return {
                eth: toDecimal(acc.ethBalance ? await acc.ethBalance() : await ethers.provider.getBalance(account)),
                usdt: toDecimal(await usdt.balanceOf(account), USDT_DECIMALS),
                dcu: toDecimal(await dcu.balanceOf(account), 18),
            };
        }
        const getStatus = async function() {
            return {
                height: await ethers.provider.getBlockNumber(),
                owner: await getAccountInfo(owner),
                dcu: await getAccountInfo(dcu),
                fortDAO: await getAccountInfo(fortDAO),
            };
        }

        const cfg = async function(tokenAddress) {
            let c = await fortOptions.getConfig(tokenAddress);
            return {
                sigmaSQ: c.sigmaSQ.toString(),
                miu: c.miu.toString(),
                minPeriod: c.minPeriod.toString()
            }
        }
        
        const align = function(price) {
            let decimals = 0;
            while (price >= 10000000) {
                price = Math.floor(price / 10);
                ++decimals;
            }
            return price * 10 ** decimals;
        }

        if (true) {
            console.log('1. initialize');
            await dcu.update(eth.address);
            await dcu.initialize(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
            await dcu.update(fortGovernance.address);
        }

        if (false) {
            console.log('2. migrate');
            console.log(await getStatus());

            await dcu.test({ value: toBigInt(57) });
            await usdt.transfer(dcu.address, toBigInt(100, USDT_DECIMALS));
            await dcu.transfer(dcu.address, toBigInt(200));
            console.log(await getStatus());

            await dcu.migrate(usdt.address, toBigInt(50, USDT_DECIMALS));
            await dcu.migrate(dcu.address, toBigInt(150));
            await dcu.migrate(eth.address, toBigInt(26));
            console.log(await getStatus());

            await dcu.migrate(usdt.address, toBigInt(50, USDT_DECIMALS));
            await dcu.migrate(dcu.address, toBigInt(50));
            await dcu.migrate(eth.address, toBigInt(31));
            console.log(await getStatus());
        }
    });
});
