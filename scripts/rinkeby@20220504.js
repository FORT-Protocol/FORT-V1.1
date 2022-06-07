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

    console.log('** Deploy: rinkeby@20220504.js **');
        
    //     ** Deploy: rinkeby@20211004.js **
    // usdt: 0x2d750210c0b5343a0b79beff8F054C9add7d2411
    // hbtc: 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B
    // dcu: 0xc408edF487e98bB932eD4A8983038FF19352eDbd
    // nestPriceFacade: 0xc08E6A853241B9a08225EECf93F3b279FA7A1bE7
    // fortGovernance: 0xA2B48399a579335eF7D410B9C0B50E59E126C48a
    // fortDAO: 0x5769c37289C9dCfe1AD141773a9ED5aA89c2e069
    // fortOptions: 0x702F97D4991e2155576548989fEdEE3971705465
    // fortFutures: 0x3Db207CadA55e556ab7A8534A7a6aD9EFfc27B01
    // fortVaultForStaking: 0x5cA5E616310c0Cca41B7E4329021C17a5a79a0F1

    // nest: 0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25
    // nhbtc: 0x801b69dA3210BAB7482E21085cd2A14d77b23475
    // cofi: 0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B
    // pusd: 0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575
    // fortube: 0x37591670bCc04af593287fbc16C58F12f0B57881
    // usdt: 0x2d750210c0b5343a0b79beff8F054C9add7d2411
    // hbtc: 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B
    // dcu: 0xc408edF487e98bB932eD4A8983038FF19352eDbd
    // nestPriceFacade: 0xc08E6A853241B9a08225EECf93F3b279FA7A1bE7
    // fortGovernance: 0xA2B48399a579335eF7D410B9C0B50E59E126C48a
    // fortDAO: 0x5769c37289C9dCfe1AD141773a9ED5aA89c2e069
    // fortOptions: 0x702F97D4991e2155576548989fEdEE3971705465
    // fortFutures: 0x3Db207CadA55e556ab7A8534A7a6aD9EFfc27B01
    // fortVaultForStaking: 0x5cA5E616310c0Cca41B7E4329021C17a5a79a0F1
    // hedgeSwap: 0x0A94eB67c4bfA14094D6aAF0D1fEc8AfD0E7A25b
    // proxyAdmin: 0xf870dE82463896d2BC7b369eAEfFcCED03139968

    const nest = await TestERC20.attach('0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25'); //.deploy('NEST', 'NEST', 18);
    console.log('nest: ' + nest.address);

    const nhbtc = await TestERC20.attach('0x801b69dA3210BAB7482E21085cd2A14d77b23475');
    console.log('nhbtc: ' + nhbtc.address);

    const cofi = await TestERC20.attach('0x61EA050b28Ccca539F0faf79Fd26F6Df31b9f15B'); //.deploy('COFI', 'COFI', 18);
    console.log('cofi: ' + cofi.address);

    const pusd = await TestERC20.attach('0x5407cab67ad304FB8A4aC46D83b3Dd63A9dbA575');
    console.log('pusd: ' + pusd.address);

    const fortube = await TestERC20.attach('0x37591670bCc04af593287fbc16C58F12f0B57881');
    console.log('fortube: ' + fortube.address);

    //const usdt = await TestERC20.deploy('USDT', 'USDT', 6);
    const usdt = await TestERC20.attach('0x2d750210c0b5343a0b79beff8F054C9add7d2411');
    console.log('usdt: ' + usdt.address);

    //const hbtc = await TestERC20.deploy('HBTC', 'HBTC', 18);
    const hbtc = await TestERC20.attach('0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B');
    console.log('hbtc: ' + hbtc.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0xc408edF487e98bB932eD4A8983038FF19352eDbd');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy();
    const nestPriceFacade = await NestPriceFacade.attach('0xc08E6A853241B9a08225EECf93F3b279FA7A1bE7');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const fortGovernance = await upgrades.deployProxy(FortGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const fortGovernance = await FortGovernance.attach('0xA2B48399a579335eF7D410B9C0B50E59E126C48a');
    console.log('fortGovernance: ' + fortGovernance.address);

    //const fortDAO = await upgrades.deployProxy(FortDAO, [fortGovernance.address], { initializer: 'initialize' });
    const fortDAO = await FortDAO.attach('0x5769c37289C9dCfe1AD141773a9ED5aA89c2e069');
    console.log('fortDAO: ' + fortDAO.address);

    //const fortOptions = await upgrades.deployProxy(FortOptions, [fortGovernance.address], { initializer: 'initialize' });
    const fortOptions = await FortOptions.attach('0x702F97D4991e2155576548989fEdEE3971705465');
    console.log('fortOptions: ' + fortOptions.address);

    //const fortFutures = await upgrades.deployProxy(FortFutures, [fortGovernance.address], { initializer: 'initialize' });
    const fortFutures = await FortFutures.attach('0x3Db207CadA55e556ab7A8534A7a6aD9EFfc27B01');
    console.log('fortFutures: ' + fortFutures.address);

    //const fortVaultForStaking = await upgrades.deployProxy(FortVaultForStaking, [fortGovernance.address], { initializer: 'initialize' });
    const fortVaultForStaking = await FortVaultForStaking.attach('0x5cA5E616310c0Cca41B7E4329021C17a5a79a0F1');
    console.log('fortVaultForStaking: ' + fortVaultForStaking.address);

    console.log('---------- OK ----------');

    const contracts = {
        eth: eth,
        usdt: usdt,
        hbtc: hbtc,
        nest: nest,
        nhbtc: nhbtc,
        cofi: cofi,
        pusd: pusd,
        fortube: fortube,
        peth: fortube,

        fortGovernance: fortGovernance,
        dcu: dcu,
        fortDAO: fortDAO,
        fortOptions: fortOptions,
        fortFutures: fortFutures,
        fortVaultForStaking: fortVaultForStaking,
        nestPriceFacade: nestPriceFacade,
        //hedgeSwap: hedgeSwap
    };

    return contracts;
};