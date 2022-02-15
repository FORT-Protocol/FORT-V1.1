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
    //const FortSwap = await ethers.getContractFactory('FortSwap');

    console.log('**  Deploy: polygon_main@20220122.js **');
    
    // dcu: 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF
    // nestPriceFacade: 0x09CE0e021195BA2c1CDE62A8B187abf810951540
    // fortGovernance: 0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8
    // fortOptions: 0x01ffb51Da9bf237fC6dDB7940dd7Edc859dBFE82
    // fortFutures: 0x284935F8C571d054Df98eDA8503ea13cde5fd8Cc
    // proxyAdmin: 0xB16260599777EFFB17fd2a8fD30c449e5b71C088

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    const nestPriceFacade = await NestPriceFacade.attach('0x09CE0e021195BA2c1CDE62A8B187abf810951540');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const fortGovernance = await upgrades.deployProxy(FortGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const fortGovernance = await FortGovernance.attach('0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8');
    console.log('fortGovernance: ' + fortGovernance.address);

    //const fortOptions = await upgrades.deployProxy(FortOptions, [fortGovernance.address], { initializer: 'initialize' });
    const fortOptions = await FortOptions.attach('0x01ffb51Da9bf237fC6dDB7940dd7Edc859dBFE82');
    console.log('fortOptions: ' + fortOptions.address);

    //const fortFutures = await upgrades.deployProxy(FortFutures, [fortGovernance.address], { initializer: 'initialize' });
    const fortFutures = await FortFutures.attach('0x284935F8C571d054Df98eDA8503ea13cde5fd8Cc');
    console.log('fortFutures: ' + fortFutures.address);

    console.log('2. fortGovernance.setBuiltinAddress()');
    await fortGovernance.setBuiltinAddress(
        dcu.address,
        '0x0000000000000000000000000000000000000000',
        fortOptions.address,
        fortFutures.address,
        '0x0000000000000000000000000000000000000000',
        nestPriceFacade.address
    );

    // console.log('9. dcu.setMinter(fortOptions.address, 3)');
    // await dcu.setMinter(fortOptions.address, 3, { nonce: 11 });
    // console.log('10. dcu.setMinter(fortFutures.address, 3)');
    // await dcu.setMinter(fortFutures.address, 3, { nonce: 12 });

    // console.log('8.2 create lever');
    // console.log('9.1 create(eth.address, 1, true)');
    // await fortFutures.create(eth.address, 1, true, { nonce: 13 });
    
    // console.log('9.2 create(eth.address, 2, true)');
    // await fortFutures.create(eth.address, 2, true, { nonce: 14 });
    
    // console.log('9.3 create(eth.address, 3, true)');
    // await fortFutures.create(eth.address, 3, true, { nonce: 15 });
    
    // console.log('9.4 create(eth.address, 4, true)');
    // await fortFutures.create(eth.address, 4, true, { nonce: 16 });
    
    // console.log('9.5 create(eth.address, 5, true)');
    // await fortFutures.create(eth.address, 5, true, { nonce: 17 });
    
    // console.log('9.6 create(eth.address, 1, false)');
    // await fortFutures.create(eth.address, 1, false, { nonce: 18 });
    
    // console.log('9.7 create(eth.address, 2, false)');
    // await fortFutures.create(eth.address, 2, false, { nonce: 19 });
    
    // console.log('9.8 create(eth.address, 3, false)');
    // await fortFutures.create(eth.address, 3, false, { nonce: 20 });
    
    // console.log('9.9 create(eth.address, 4, false)');
    // await fortFutures.create(eth.address, 4, false, { nonce: 21 });
    
    // console.log('9.10 create(eth.address, 5, false)');
    // await fortFutures.create(eth.address, 5, false, { nonce: 22 });

    console.log('---------- OK ----------');
    
    const BLOCK_TIME = 2.2;
    const MIU_LONG = 3 / 10000 / 86400;
    const MIU_SHORT = 0;

    const contracts = {
        eth: eth,

        fortGovernance: fortGovernance,
        dcu: dcu,
        fortOptions: fortOptions,
        fortFutures: fortFutures,
        nestPriceFacade: nestPriceFacade,

        BLOCK_TIME: BLOCK_TIME,
        USDT_DECIMALS: 18,

        MIU_LONG: MIU_LONG,
        MIU_SHORT: MIU_SHORT,
        miuT: function(orientation, blocks) {
            return Math.exp((orientation ? MIU_LONG : MIU_SHORT) * blocks * BLOCK_TIME);
        }
    };

    return contracts;
};