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
    const FortGovernance = await ethers.getContractFactory('FortGovernance');
    const DCU = await ethers.getContractFactory('DCU');
    const FortDAO = await ethers.getContractFactory('FortDAO');
    const FortOptions = await ethers.getContractFactory('FortOptions');
    const FortFutures = await ethers.getContractFactory('FortFutures');
    const FortVaultForStaking = await ethers.getContractFactory('FortVaultForStaking');
    const FortSwap = await ethers.getContractFactory('FortSwap');

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
    // fortGovernance: 0x906F3320286eCf8e7524e48Af2d62598F65bf1b2
    // fortOptions: 0x6636F38F59Db0d3dD2f53e6cA4831EB2B5A1047c
    // fortFutures: 0x8f89663562dDD4519566e590C18ec892134A0cdD
    // fortSwap: 0x82502A8f52BF186907BD0E12c8cEe612b4C203d1
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

    //const fortGovernance = await upgrades.deployProxy(FortGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const fortGovernance = await FortGovernance.attach('0x906F3320286eCf8e7524e48Af2d62598F65bf1b2');
    console.log('fortGovernance: ' + fortGovernance.address);

    // const fortDAO = await upgrades.deployProxy(FortDAO, [fortGovernance.address], { initializer: 'initialize' });
    // //const fortDAO = await FortDAO.attach('0x0000000000000000000000000000000000000000');
    // console.log('fortDAO: ' + fortDAO.address);

    //const fortOptions = await upgrades.deployProxy(FortOptions, [fortGovernance.address], { initializer: 'initialize' });
    const fortOptions = await FortOptions.attach('0x6636F38F59Db0d3dD2f53e6cA4831EB2B5A1047c');
    console.log('fortOptions: ' + fortOptions.address);

    //const fortFutures = await upgrades.deployProxy(FortFutures, [fortGovernance.address], { initializer: 'initialize' });
    const fortFutures = await FortFutures.attach('0x8f89663562dDD4519566e590C18ec892134A0cdD');
    console.log('fortFutures: ' + fortFutures.address);

    // const fortVaultForStaking = await upgrades.deployProxy(FortVaultForStaking, [fortGovernance.address], { initializer: 'initialize' });
    // //const fortVaultForStaking = await FortVaultForStaking.attach('0x0000000000000000000000000000000000000000');
    // console.log('fortVaultForStaking: ' + fortVaultForStaking.address);

    //const fortSwap = await upgrades.deployProxy(FortSwap, [fortGovernance.address], { initializer: 'initialize' });
    const fortSwap = await FortSwap.attach('0x82502A8f52BF186907BD0E12c8cEe612b4C203d1');
    console.log('fortSwap: ' + fortSwap.address);

    // // await fortGovernance.initialize('0x0000000000000000000000000000000000000000');
    // console.log('1. dcu.initialize(fortGovernance.address)');
    // await dcu.initialize(fortGovernance.address);
    // // await fortDAO.initialize(fortGovernance.address);
    // // await fortOptions.initialize(fortGovernance.address);
    // // await fortFutures.initialize(fortGovernance.address);
    // // await fortVaultForStaking.initialize(fortGovernance.address);

    // console.log('2. fortGovernance.setBuiltinAddress()');
    // await fortGovernance.setBuiltinAddress(
    //     dcu.address,
    //     '0x0000000000000000000000000000000000000000',
    //     fortOptions.address,
    //     fortFutures.address,
    //     '0x0000000000000000000000000000000000000000', //fortVaultForStaking.address,
    //     nestPriceFacade.address
    // );

    // console.log('3. dcu.update()');
    // await dcu.update(fortGovernance.address);
    // console.log('4. fortDAO.update()');
    // await fortDAO.update(fortGovernance.address);
    // console.log('5. fortOptions.update()');
    // await fortOptions.update(fortGovernance.address);
    // console.log('6. fortFutures.update()');
    // await fortFutures.update(fortGovernance.address);
    // // console.log('7. fortVaultForStaking.update()');
    // // await fortVaultForStaking.update(fortGovernance.address);
    // console.log('8. fortSwap.update()');
    // await fortSwap.update(fortGovernance.address);

    // // // console.log('8. fortOptions.setConfig()');
    // // // await fortOptions.setConfig(eth.address, { 
    // // //     sigmaSQ: '45659142400', 
    // // //     miu: '467938556917', 
    // // //     minPeriod: 6000 
    // // // });
    // // // console.log('8.1. fortOptions.setConfig()');
    // // // await fortOptions.setConfig(hbtc.address, { 
    // // //     sigmaSQ: '45659142400', 
    // // //     miu: '467938556917', 
    // // //     minPeriod: 6000 
    // // // });

    // console.log('9. dcu.setMinter(fortOptions.address, 1)');
    // await dcu.setMinter(fortOptions.address, 1);
    // console.log('10. dcu.setMinter(fortFutures.address, 1)');
    // await dcu.setMinter(fortFutures.address, 1);
    // console.log('11. dcu.setMinter(fortSwap.address, 1)');
    // await dcu.setMinter(fortSwap.address, 1);
    // //await usdt.transfer(usdt.address, 0);
    // //await usdt.transfer(usdt.address, 0);
    // await fortOptions.setUsdtTokenAddress(usdt.address);
    // await fortFutures.setUsdtTokenAddress(usdt.address);

    // console.log('8.2 create lever');
    // await fortFutures.create(eth.address, 1, true);
    // await fortFutures.create(eth.address, 2, true);
    // await fortFutures.create(eth.address, 3, true);
    // await fortFutures.create(eth.address, 4, true);
    // await fortFutures.create(eth.address, 5, true);
    // await fortFutures.create(eth.address, 1, false);
    // await fortFutures.create(eth.address, 2, false);
    // await fortFutures.create(eth.address, 3, false);
    // await fortFutures.create(eth.address, 4, false);
    // await fortFutures.create(eth.address, 5, false);

    console.log('---------- OK ----------');
    
    const contracts = {
        eth: eth,
        usdt: usdt,
        nest: nest,

        fortGovernance: fortGovernance,
        dcu: dcu,
        //fortDAO: fortDAO,
        fortOptions: fortOptions,
        fortFutures: fortFutures,
        //fortVaultForStaking: fortVaultForStaking,
        nestPriceFacade: nestPriceFacade,
        fortSwap: fortSwap,

        BLOCK_TIME: 3
    };

    return contracts;
};