const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');
const { ethers, upgrades } = require('hardhat');

describe('FortOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        
        const { 
            eth, usdt, hbtc, dcu, fortOptions, fortFutures, fortLPGuarantee, fortPRC,
            nestPriceFacade, fortGovernance, BLOCK_TIME, USDT_DECIMALS 
        } = await deploy();

        await nestPriceFacade.setPrice(hbtc.address, '74000000000000000', 1);
        //await nestPriceFacade.setPrice(usdt.address, '3510000000', 1);

        const getAccountInfo = async function(account) {
            let acc = account;
            account = account.address;
            return {
                eth: toDecimal(acc.ethBalance ? await acc.ethBalance() : await ethers.provider.getBalance(account)),
                dcu: toDecimal(await dcu.balanceOf(account), 18),
                fortPRC: toDecimal(await fortPRC.balanceOf(account))
            };
        }
        const getStatus = async function() {
            return {
                height: await ethers.provider.getBlockNumber(),
                owner: await getAccountInfo(owner),
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
            // let decimals = 0;
            // while (price >= 10000000) {
            //     price = Math.floor(price / 10);
            //     ++decimals;
            // }
            // return price * 10 ** decimals;
            return price;
        }

        await dcu.setMinter(owner.address, 1);
        await dcu.mint(owner.address, toBigInt(10000000));
        await fortPRC.setMinter(owner.address, 1);
        await fortPRC.mint(owner.address, toBigInt(10000));

        console.log(await getStatus());

        if (true) {
            console.log('1. roll');
            await fortPRC.roll44(10000, 30000);
            console.log(await getStatus());
        }
        if (false) {
            console.log('2. claim');
            for (var i = 0; i < 256; ++i) {
                console.log('gained: ' + (await fortPRC.list44(0, 1, 0))[0].gained.toString());
                await dcu.transfer(owner.address, 0);
            }
            await fortPRC.claim(0);
            console.log(await getStatus());
        }
        if (true) {
            console.log('3. batchClaim');
            for (var i = 0; i < 256; ++i) {
                console.log('gained: ' + (await fortPRC.list44(0, 1, 0))[0].gained.toString());
                await dcu.transfer(owner.address, 0);
            }
            await fortPRC.batchClaim44([0]);
            console.log(await getStatus());
        }
    });
});