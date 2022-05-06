const { expect } = require('chai');
const { deploy } = require('../scripts/deploy.js');
const { toBigInt, toDecimal, showReceipt, snd, tableSnd, d1, Vc, Vp } = require('./utils.js');

describe('HedgeOptions', function() {
    it('First', async function() {
        var [owner, addr1, addr2] = await ethers.getSigners();
        
        const { eth, usdt, hbtc, dcu, fortOptions, fortFutures, nestPriceFacade, USDT_DECIMALS } = await deploy();

        const BLOCK = 100000;
        
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
                addr1: await getAccountInfo(addr1),
            };
        }

        const cfg = async function(tokenAddress) {
            let c = await hedgeOptions.getConfig(tokenAddress);
            return {
                sigmaSQ: c.sigmaSQ.toString(),
                miu: c.miu.toString(),
                minPeriod: c.minPeriod.toString()
            }
        }

        if (true) {
           console.log('1. list futures');

           //const optionCount = await hedgeOptions.getOptionCount();
           //console.log('optionCount: ' + optionCount);
           const futures = await fortFutures.find(0, 10, 1000, '0xa74abcda97da5e15344c64244c65f4f8c7cbce77');

           for(var i = 0; i < futures.length; ++i) {
               const o = futures[i];
               const option = {
                   index: o.index.toString(),
                   tokenAddress: o.tokenAddress.toString(),
                   lever: o.lever.toString(),
                   orientation: o.orientation.toString(),
                   balance: o.balance.toString(),
                   basePrice: o.basePrice.toString(),
                   baseBlock: o.baseBlock.toString(),
               }
               console.log(option);
               
            //    uint index;
            //    address tokenAddress;
            //    uint lever;
            //    bool orientation;
               
            //    uint balance;
            //    // Base price
            //    uint basePrice;
            //    // Base block
            //    uint baseBlock;
           }
        }
    });
});
