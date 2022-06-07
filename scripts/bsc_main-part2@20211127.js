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
    const HedgeSwap = await ethers.getContractFactory('HedgeSwap');

    console.log('** Deploy: bsc_main-part2@20211127.js **');
        
    // dcu: 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF
    // hedgeGovernance: 0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8
    // nestOpenMining: 0x09CE0e021195BA2c1CDE62A8B187abf810951540

    //     ** Deploy: bsc_main-part2@20211127.js **
    // dcu: 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF
    // hedgeGovernance: 0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8
    // nestPriceFacade: 0x09CE0e021195BA2c1CDE62A8B187abf810951540
    // hedgeOptions: 0x284935F8C571d054Df98eDA8503ea13cde5fd8Cc
    // hedgeFutures: 0x8c5052f7747D8Ebc2F069286416b6aE8Ad3Cc149
    // hedgeSwap: 0x2Cd1Bf9345E969b5DFc6D88000475aD6d487363A
    // proxyAdmin: 0xB16260599777EFFB17fd2a8fD30c449e5b71C088

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF');
    console.log('dcu: ' + dcu.address);

    //const hedgeGovernance = await upgrades.deployProxy(HedgeGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const hedgeGovernance = await HedgeGovernance.attach('0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8');
    console.log('hedgeGovernance: ' + hedgeGovernance.address);

    //const nestPriceFacade = await NestPriceFacade.deploy();
    const nestPriceFacade = await NestPriceFacade.attach('0x09CE0e021195BA2c1CDE62A8B187abf810951540');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const hedgeOptions = await upgrades.deployProxy(HedgeOptions, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeOptions = await HedgeOptions.attach('0x284935F8C571d054Df98eDA8503ea13cde5fd8Cc');
    console.log('hedgeOptions: ' + hedgeOptions.address);

    //const hedgeFutures = await upgrades.deployProxy(HedgeFutures, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeFutures = await HedgeFutures.attach('0x8c5052f7747D8Ebc2F069286416b6aE8Ad3Cc149');
    console.log('hedgeFutures: ' + hedgeFutures.address);

    //const hedgeSwap = await upgrades.deployProxy(HedgeSwap, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeSwap = await HedgeSwap.attach('0x2Cd1Bf9345E969b5DFc6D88000475aD6d487363A');
    console.log('hedgeSwap: ' + hedgeSwap.address);

    console.log('---------- OK ----------');
    
    const contracts = {
        dcu: dcu,
        hedgeGovernance: hedgeGovernance,

        hedgeOptions: hedgeOptions,
        hedgeFutures: hedgeFutures,
        hedgeSwap: hedgeSwap,

        nestPriceFacade: nestPriceFacade
    };

    return contracts;
};