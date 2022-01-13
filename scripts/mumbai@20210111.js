// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require('hardhat');

exports.deploy = async function() {
    
    const eth = { address: '0x0000000000000000000000000000000000000000' };
    const TestERC20 = await ethers.getContractFactory('TestERC20');
    const NestPriceFacade = await ethers.getContractFactory('NestPriceFacade');
    const HedgeGovernance = await ethers.getContractFactory('HedgeGovernance');
    const DCU = await ethers.getContractFactory('DCU');
    const HedgeDAO = await ethers.getContractFactory('HedgeDAO');
    const HedgeOptions = await ethers.getContractFactory('HedgeOptions');
    const HedgeFutures = await ethers.getContractFactory('HedgeFutures');
    const HedgeVaultForStaking = await ethers.getContractFactory('HedgeVaultForStaking');
    const HedgeSwap = await ethers.getContractFactory('HedgeSwap');

    console.log('** 开始部署合约 mumbai@20210111.js **');
    
    // nest: 0x58694D405C8Cd917880FC1E23729fc0B90B7732c
    // usdt: 0xd32502b39da054dfF448AaBc1cb8210C756535f6
    // pusd: 0xEfF166764c1eF0e768D57FfEd7736f6C11eE6A4f
    // peth: 0xDdBF1D99A1f92Ee7c20E39B34001fA0784714043
    // nestGovernance: 0xF0737e3C98f1Ee41251681e2C6ad53Ab92AB0AEa
    // nestLedger: 0xbe388405c5f091f46DA440652f776c9832e0d1c3
    // nestBatchMining: 0xD3E0Effa6A9cEC78C95c1FD0BbcCCA5929068B83
    // proxyAdmin: 0xAc88d1fBF58E2646E0F4FF60aa436a70753885D9
    
    // dcu: 0x51EFE1E589354e1f24C7d4533D21F74f973c6eED
    // nestPriceFacade: 0xD3E0Effa6A9cEC78C95c1FD0BbcCCA5929068B83
    // hedgeGovernance: 0x906F3320286eCf8e7524e48Af2d62598F65bf1b2
    // hedgeOptions: 0x6636F38F59Db0d3dD2f53e6cA4831EB2B5A1047c
    // hedgeFutures: 0x8f89663562dDD4519566e590C18ec892134A0cdD
    // hedgeSwap: 0x82502A8f52BF186907BD0E12c8cEe612b4C203d1
    // proxyAdmin: 0x48f62fe14722455C5519303C2Eb89046107a3fD1

    // 1. 部署依赖合约
    const nest = await TestERC20.attach('0x58694D405C8Cd917880FC1E23729fc0B90B7732c');
    console.log('nest: ' + nest.address);

    //const usdt = await TestERC20.deploy('USDT', 'USDT', 6);
    const usdt = await TestERC20.attach('0xd32502b39da054dfF448AaBc1cb8210C756535f6');
    console.log('usdt: ' + usdt.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0x51EFE1E589354e1f24C7d4533D21F74f973c6eED');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    const nestPriceFacade = await NestPriceFacade.attach('0xD3E0Effa6A9cEC78C95c1FD0BbcCCA5929068B83');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const hedgeGovernance = await upgrades.deployProxy(HedgeGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const hedgeGovernance = await HedgeGovernance.attach('0x906F3320286eCf8e7524e48Af2d62598F65bf1b2');
    console.log('hedgeGovernance: ' + hedgeGovernance.address);

    // const hedgeDAO = await upgrades.deployProxy(HedgeDAO, [hedgeGovernance.address], { initializer: 'initialize' });
    // //const hedgeDAO = await HedgeDAO.attach('0x0000000000000000000000000000000000000000');
    // console.log('hedgeDAO: ' + hedgeDAO.address);

    //const hedgeOptions = await upgrades.deployProxy(HedgeOptions, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeOptions = await HedgeOptions.attach('0x6636F38F59Db0d3dD2f53e6cA4831EB2B5A1047c');
    console.log('hedgeOptions: ' + hedgeOptions.address);

    //const hedgeFutures = await upgrades.deployProxy(HedgeFutures, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeFutures = await HedgeFutures.attach('0x8f89663562dDD4519566e590C18ec892134A0cdD');
    console.log('hedgeFutures: ' + hedgeFutures.address);

    // const hedgeVaultForStaking = await upgrades.deployProxy(HedgeVaultForStaking, [hedgeGovernance.address], { initializer: 'initialize' });
    // //const hedgeVaultForStaking = await HedgeVaultForStaking.attach('0x0000000000000000000000000000000000000000');
    // console.log('hedgeVaultForStaking: ' + hedgeVaultForStaking.address);

    //const hedgeSwap = await upgrades.deployProxy(HedgeSwap, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeSwap = await HedgeSwap.attach('0x82502A8f52BF186907BD0E12c8cEe612b4C203d1');
    console.log('hedgeSwap: ' + hedgeSwap.address);

    // // await hedgeGovernance.initialize('0x0000000000000000000000000000000000000000');
    // console.log('1. dcu.initialize(hedgeGovernance.address)');
    // await dcu.initialize(hedgeGovernance.address);
    // // await hedgeDAO.initialize(hedgeGovernance.address);
    // // await hedgeOptions.initialize(hedgeGovernance.address);
    // // await hedgeFutures.initialize(hedgeGovernance.address);
    // // await hedgeVaultForStaking.initialize(hedgeGovernance.address);

    // console.log('2. hedgeGovernance.setBuiltinAddress()');
    // await hedgeGovernance.setBuiltinAddress(
    //     dcu.address,
    //     '0x0000000000000000000000000000000000000000',
    //     hedgeOptions.address,
    //     hedgeFutures.address,
    //     '0x0000000000000000000000000000000000000000', //hedgeVaultForStaking.address,
    //     nestPriceFacade.address
    // );

    // console.log('3. dcu.update()');
    // await dcu.update(hedgeGovernance.address);
    // console.log('4. hedgeDAO.update()');
    // await hedgeDAO.update(hedgeGovernance.address);
    // console.log('5. hedgeOptions.update()');
    // await hedgeOptions.update(hedgeGovernance.address);
    // console.log('6. hedgeFutures.update()');
    // await hedgeFutures.update(hedgeGovernance.address);
    // // console.log('7. hedgeVaultForStaking.update()');
    // // await hedgeVaultForStaking.update(hedgeGovernance.address);
    // console.log('8. hedgeSwap.update()');
    // await hedgeSwap.update(hedgeGovernance.address);

    // // // console.log('8. hedgeOptions.setConfig()');
    // // // await hedgeOptions.setConfig(eth.address, { 
    // // //     sigmaSQ: '45659142400', 
    // // //     miu: '467938556917', 
    // // //     minPeriod: 6000 
    // // // });
    // // // console.log('8.1. hedgeOptions.setConfig()');
    // // // await hedgeOptions.setConfig(hbtc.address, { 
    // // //     sigmaSQ: '45659142400', 
    // // //     miu: '467938556917', 
    // // //     minPeriod: 6000 
    // // // });

    // console.log('9. dcu.setMinter(hedgeOptions.address, 1)');
    // await dcu.setMinter(hedgeOptions.address, 1);
    // console.log('10. dcu.setMinter(hedgeFutures.address, 1)');
    // await dcu.setMinter(hedgeFutures.address, 1);
    // console.log('11. dcu.setMinter(hedgeSwap.address, 1)');
    // await dcu.setMinter(hedgeSwap.address, 1);
    // //await usdt.transfer(usdt.address, 0);
    // //await usdt.transfer(usdt.address, 0);
    // await hedgeOptions.setUsdtTokenAddress(usdt.address);
    // await hedgeFutures.setUsdtTokenAddress(usdt.address);

    // console.log('8.2 create lever');
    // await hedgeFutures.create(eth.address, 1, true);
    // await hedgeFutures.create(eth.address, 2, true);
    // await hedgeFutures.create(eth.address, 3, true);
    // await hedgeFutures.create(eth.address, 4, true);
    // await hedgeFutures.create(eth.address, 5, true);
    // await hedgeFutures.create(eth.address, 1, false);
    // await hedgeFutures.create(eth.address, 2, false);
    // await hedgeFutures.create(eth.address, 3, false);
    // await hedgeFutures.create(eth.address, 4, false);
    // await hedgeFutures.create(eth.address, 5, false);

    console.log('---------- OK ----------');
    
    const contracts = {
        eth: eth,
        usdt: usdt,
        nest: nest,

        hedgeGovernance: hedgeGovernance,
        dcu: dcu,
        //hedgeDAO: hedgeDAO,
        hedgeOptions: hedgeOptions,
        hedgeFutures: hedgeFutures,
        //hedgeVaultForStaking: hedgeVaultForStaking,
        nestPriceFacade: nestPriceFacade,
        hedgeSwap: hedgeSwap,

        BLOCK_TIME: 3
    };

    return contracts;
};