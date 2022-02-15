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
    const HedgeSwapWithdraw = await ethers.getContractFactory('HedgeSwapWithdraw');
    const HedgeSwap = await ethers.getContractFactory('HedgeSwap');

    console.log('** Deploy: mainnet-withdraw@20211127.js **');
    
    // nest     0x04abEdA201850aC0124161F037Efd70c74ddC74C  One months    2000000
    // nhbtc    0x1F832091fAf289Ed4f50FE7418cFbD2611225d46  One months    500000
    // cofi     0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1  One months    500000
    // pusd     0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0  One months    500000
    // fortube  0x1FCdcE58959f536621d76f5b7FfB955baa5A672F  ----    0
    // nest     0x04abEdA201850aC0124161F037Efd70c74ddC74C  Two years     36000000
    // peth     0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD  One months    500000
    // 2021-10-14 12:02

    // ** Deploy: part3-mainnet@20211020.js **
    // nest: 0x04abEdA201850aC0124161F037Efd70c74ddC74C
    // nhbtc: 0x1F832091fAf289Ed4f50FE7418cFbD2611225d46
    // cofi: 0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1
    // pusd: 0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0
    // fortube: 0x1FCdcE58959f536621d76f5b7FfB955baa5A672F
    // peth: 0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD
    // dcu: 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF
    // nestPriceFacade: 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A
    // hedgeGovernance: 0xfD6dF48df7E0989355B23f200d0D454b9101d17D
    // hedgeOptions: 0x6C844d364c2836f2111891111F25C7a24da976A9
    // hedgeFutures: 0x622f1CB39AdE2131061C68E61334D41321033ab4
    // hedgeVaultForStaking: 0xE3940A3E94bca34B9175d156a5E9C5728dFE922F
    // proxyAdmin: 0x39016AeAe6F975796BFC007c7aA655fB691Fc6e8
    // hedgeSwap: 0x6e7fd4BA02A5a7a75Ea3CcE37e221dC144D606Dd

    //const nest = await TestERC20.deploy('NEST', 'NEST', 18);
    const nest = await TestERC20.attach('0x04abEdA201850aC0124161F037Efd70c74ddC74C');
    console.log('nest: ' + nest.address);

    //const nhbtc = await TestERC20.deploy('NHBTC', 'NEST', 18);
    const nhbtc = await TestERC20.attach('0x1F832091fAf289Ed4f50FE7418cFbD2611225d46');
    console.log('nhbtc: ' + nhbtc.address);

    //const cofi = await TestERC20.deploy('COFI', 'COFI', 18);
    const cofi = await TestERC20.attach('0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1');
    console.log('cofi: ' + cofi.address);

    //const pusd = await TestERC20.deploy('PUSD', 'PUSD', 18);
    const pusd = await TestERC20.attach('0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0');
    console.log('pusd: ' + pusd.address);

    //const fortube = await TestERC20.deploy('FORTUBE', 'FORTUBE', 18);
    const fortube = await TestERC20.attach('0x1FCdcE58959f536621d76f5b7FfB955baa5A672F');
    console.log('fortube: ' + fortube.address);

    //const peth = await TestERC20.deploy('PETH', 'PETH', 18);
    const peth = await TestERC20.attach('0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD');
    console.log('peth: ' + peth.address);

    // //const usdt = await TestERC20.deploy('USDT', 'USDT', 6);
    // const usdt = await TestERC20.attach('0xdAC17F958D2ee523a2206206994597C13D831ec7');
    // console.log('usdt: ' + usdt.address);

    // //const hbtc = await TestERC20.deploy('HBTC', 'HBTC', 18);
    // const hbtc = await TestERC20.attach('0x0316EB71485b0Ab14103307bf65a021042c6d380');
    // console.log('hbtc: ' + hbtc.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy();
    const nestPriceFacade = await NestPriceFacade.attach('0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const hedgeGovernance = await upgrades.deployProxy(HedgeGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const hedgeGovernance = await HedgeGovernance.attach('0xfD6dF48df7E0989355B23f200d0D454b9101d17D');
    console.log('hedgeGovernance: ' + hedgeGovernance.address);

    // const hedgeDAO = await upgrades.deployProxy(HedgeDAO, [hedgeGovernance.address], { initializer: 'initialize' });
    // //const hedgeDAO = await HedgeDAO.attach('0x0000000000000000000000000000000000000000');
    // console.log('hedgeDAO: ' + hedgeDAO.address);

    //const hedgeOptions = await upgrades.deployProxy(HedgeOptions, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeOptions = await HedgeOptions.attach('0x6C844d364c2836f2111891111F25C7a24da976A9');
    console.log('hedgeOptions: ' + hedgeOptions.address);

    //const hedgeFutures = await upgrades.deployProxy(HedgeFutures, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeFutures = await HedgeFutures.attach('0x622f1CB39AdE2131061C68E61334D41321033ab4');
    console.log('hedgeFutures: ' + hedgeFutures.address);

    //const hedgeVaultForStaking = await upgrades.deployProxy(HedgeVaultForStaking, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeVaultForStaking = await HedgeVaultForStaking.attach('0xE3940A3E94bca34B9175d156a5E9C5728dFE922F');
    console.log('hedgeVaultForStaking: ' + hedgeVaultForStaking.address);

    //const hedgeSwap = await upgrades.deployProxy(HedgeSwap, [hedgeGovernance.address], { initializer: 'initialize' });
    const hedgeSwap = await HedgeSwap.attach('0x6e7fd4BA02A5a7a75Ea3CcE37e221dC144D606Dd');
    console.log('hedgeSwap: ' + hedgeSwap.address);

    // const hedgeSwapWithdraw = await HedgeSwapWithdraw.deploy();
    // console.log('hedgeSwapWithdraw: ' + hedgeSwapWithdraw.address);
    
    // const newHedgeSwap = await HedgeSwap.deploy();
    // console.log('newHedgeSwap: ' + await newHedgeSwap.address);

    console.log('---------- OK ----------');
    
    const contracts = {
        eth: eth,
        nest: nest,
        nhbtc: nhbtc,
        cofi: cofi,
        pusd: pusd,
        fortube: fortube,
        peth,

        hedgeGovernance: hedgeGovernance,
        dcu: dcu,
        // hedgeDAO: hedgeDAO,
        // hedgeOptions: hedgeOptions,
        // hedgeFutures: hedgeFutures,
        hedgeVaultForStaking: hedgeVaultForStaking,
        nestPriceFacade: nestPriceFacade,
        hedgeSwap: hedgeSwap
    };

    return contracts;
};