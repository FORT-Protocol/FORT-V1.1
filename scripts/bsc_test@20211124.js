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

    console.log('** Deploy: bsc_test@20211123.js **');
    
    // nest: 0x821edD79cc386E56FeC9DA5793b87a3A52373cdE
    // pusd: 0x3DA5c9aafc6e6D6839E62e2fB65825869019F291
    // peth: 0xc39dC1385a44fBB895991580EA55FC10e7451cB3
    // nestGovernance: 0x5691dc0770D55B9469a3242DA282754687687935
    // nestLedger: 0x78D5E2fC85969e51580fd2C0Fd6D056a444167cE
    // nestOpenMining: 0xF2f9E62f52389EF223f5Fa8b9926e95386935277

    //     ** Deploy: bsc_test@20211123.js **
    // usdt: 0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc
    // dcu: 0x5Df87aE415206707fd52aDa20a5Eac2Ec70e8dbb
    // nestPriceFacade: 0xF2f9E62f52389EF223f5Fa8b9926e95386935277
    // hedgeGovernance: 0x38831FF0d6133D2d45C2eb876602C0249BA601eE
    // hedgeDAO: 0x81c952c4EEE91DF16A7908E1869a31E438FbCE44
    // hedgeOptions: 0x19465d54ba7c492174127244cc26dE49F0cC1F1f
    // hedgeFutures: 0xFD42E41B96BC69e8B0763B2Ed75CD50347b9778D
    // hedgeSwap: 0xD83C860d3A27cC5EddaB68EaBFCF9cc8ad38F15D
    // proxyAdmin: 0xB5604C3C3AE902513731037B9c7368842582642e

    const nest = await TestERC20.attach('0x821edD79cc386E56FeC9DA5793b87a3A52373cdE');
    console.log('nest: ' + nest.address);

    //const usdt = await TestERC20.deploy('USDT', 'USDT', 18);
    const usdt = await TestERC20.attach('0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc');
    console.log('usdt: ' + usdt.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0x5Df87aE415206707fd52aDa20a5Eac2Ec70e8dbb');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    const nestPriceFacade = await NestPriceFacade.attach('0xF2f9E62f52389EF223f5Fa8b9926e95386935277');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const hedgeGovernance = await upgrades.deployProxy(HedgeGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const hedgeGovernance = await HedgeGovernance.attach('0x38831FF0d6133D2d45C2eb876602C0249BA601eE');
    console.log('hedgeGovernance: ' + hedgeGovernance.address);

    //const hedgeDAO = await upgrades.deployProxy(HedgeDAO, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeDAO = await HedgeDAO.attach('0x81c952c4EEE91DF16A7908E1869a31E438FbCE44');
    console.log('hedgeDAO: ' + hedgeDAO.address);

    //const hedgeOptions = await upgrades.deployProxy(HedgeOptions, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeOptions = await HedgeOptions.attach('0x19465d54ba7c492174127244cc26dE49F0cC1F1f');
    console.log('hedgeOptions: ' + hedgeOptions.address);

    //const hedgeFutures = await upgrades.deployProxy(HedgeFutures, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeFutures = await HedgeFutures.attach('0xFD42E41B96BC69e8B0763B2Ed75CD50347b9778D');
    console.log('hedgeFutures: ' + hedgeFutures.address);

    //const hedgeSwap = await upgrades.deployProxy(HedgeSwap, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeSwap = await HedgeSwap.attach('0xD83C860d3A27cC5EddaB68EaBFCF9cc8ad38F15D');
    console.log('hedgeSwap: ' + hedgeSwap.address);

    console.log('---------- OK ----------');
    
    const contracts = {
        eth: eth,
        usdt: usdt,
        nest: nest,

        hedgeGovernance: hedgeGovernance,
        dcu: dcu,
        hedgeDAO: hedgeDAO,
        hedgeOptions: hedgeOptions,
        hedgeFutures: hedgeFutures,
        //hedgeVaultForStaking: hedgeVaultForStaking,
        nestPriceFacade: nestPriceFacade,
        hedgeSwap: hedgeSwap,

        BLOCK_TIME: 3
    };

    return contracts;
};