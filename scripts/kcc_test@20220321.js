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

    console.log('** Deploy: kcc_test@20220321.js **');
    
    // nest: 0xE2975bf674617bbCE57D2c72dCfC926716D8AC1F
    // usdt: 0x17322b20752cC7d6094209f6Fa73275375Cf7B27
    // hbtc: 0x5cbb73B367FD69807381d06BC2041BEc86d8487d
    // nestGovernance: 0xEB8b3c263A32C3f098Fb0Da0F7855E2E98D75971
    // nestBatchMining: 0xF331D5C0E36Cc8a575D185b1D513715be55087E4

    //     ** Deploy: kcc_test@20220321.js **
    // nest: 0xE2975bf674617bbCE57D2c72dCfC926716D8AC1F
    // usdt: 0x17322b20752cC7d6094209f6Fa73275375Cf7B27
    // hbtc: 0x5cbb73B367FD69807381d06BC2041BEc86d8487d
    // dcu: 0x934D8Ec0B9199c7742215ec803A8dcA5d98C1a02
    // nestPriceFacade: 0xF331D5C0E36Cc8a575D185b1D513715be55087E4
    // fortGovernance: 0x4FFED6AE89fA86Ce1cb732caB11899fB695ad265
    // fortDAO: 0xEfDeFDAC7d73A03f05e16743Eed28816F0c63D82
    // fortOptions: 0x5F1ae37aF4716d12E336d706E2D9bDdA710425c5
    // fortFutures: 0xBa2064BbD49454517A9dBba39005bf46d31971f8

    //const nest = await TestERC20.deploy('NEST', 'NEST', 18);
    const nest = await TestERC20.attach('0xE2975bf674617bbCE57D2c72dCfC926716D8AC1F');
    console.log('nest: ' + nest.address);

    //const usdt = await TestERC20.deploy('USDT', 'USDT', 6);
    const usdt = await TestERC20.attach('0x17322b20752cC7d6094209f6Fa73275375Cf7B27');
    console.log('usdt: ' + usdt.address);

    //const hbtc = await TestERC20.deploy('HBTC', 'HBTC', 18);
    const hbtc = await TestERC20.attach('0x5cbb73B367FD69807381d06BC2041BEc86d8487d');
    console.log('hbtc: ' + hbtc.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0x934D8Ec0B9199c7742215ec803A8dcA5d98C1a02');
    console.log('dcu: ' + dcu.address);

    //const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    const nestPriceFacade = await NestPriceFacade.attach('0xF331D5C0E36Cc8a575D185b1D513715be55087E4');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const fortGovernance = await upgrades.deployProxy(FortGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const fortGovernance = await FortGovernance.attach('0x4FFED6AE89fA86Ce1cb732caB11899fB695ad265');
    console.log('fortGovernance: ' + fortGovernance.address);

    //const fortDAO = await upgrades.deployProxy(FortDAO, [fortGovernance.address], { initializer: 'initialize' });
    const fortDAO = await FortDAO.attach('0xEfDeFDAC7d73A03f05e16743Eed28816F0c63D82');
    console.log('fortDAO: ' + fortDAO.address);

    //const fortOptions = await upgrades.deployProxy(FortOptions, [fortGovernance.address], { initializer: 'initialize' });
    const fortOptions = await FortOptions.attach('0x5F1ae37aF4716d12E336d706E2D9bDdA710425c5');
    console.log('fortOptions: ' + fortOptions.address);

    //const fortFutures = await upgrades.deployProxy(FortFutures, [fortGovernance.address], { initializer: 'initialize' });
    const fortFutures = await FortFutures.attach('0xBa2064BbD49454517A9dBba39005bf46d31971f8');
    console.log('fortFutures: ' + fortFutures.address);

    // const fortVaultForStaking = await upgrades.deployProxy(FortVaultForStaking, [fortGovernance.address], { initializer: 'initialize' });
    // //const fortVaultForStaking = await FortVaultForStaking.attach('0x0000000000000000000000000000000000000000');
    // console.log('fortVaultForStaking: ' + fortVaultForStaking.address);

    // const fortSwap = await upgrades.deployProxy(FortSwap, [fortGovernance.address], { initializer: 'initialize' });
    // //const fortSwap = await FortSwap.attach('0x0000000000000000000000000000000000000000');
    // console.log('fortSwap: ' + fortSwap.address);

    // // await fortGovernance.initialize('0x0000000000000000000000000000000000000000');
    // console.log('1. dcu.initialize(fortGovernance.address)');
    // await dcu.initialize(fortGovernance.address);

    console.log('2. fortGovernance.setBuiltinAddress()');
    await fortGovernance.setBuiltinAddress(
        dcu.address,
        fortDAO.address,
        fortOptions.address,
        fortFutures.address,
        '0x0000000000000000000000000000000000000000',
        nestPriceFacade.address
    );

    // // console.log('3. dcu.update()');
    // // await dcu.update(fortGovernance.address);
    // // console.log('4. fortDAO.update()');
    // // await fortDAO.update(fortGovernance.address);
    console.log('5. fortOptions.update()');
    await fortOptions.update(fortGovernance.address);
    console.log('6. fortFutures.update()');
    await fortFutures.update(fortGovernance.address);
    // console.log('7. fortVaultForStaking.update()');
    // // await fortVaultForStaking.update(fortGovernance.address);
    // // console.log('8. fortVaultForStaking.update()');
    // // await fortSwap.update(fortGovernance.address);

    // console.log('9. dcu.setMinter(fortOptions.address, 3)');
    // await dcu.setMinter(fortOptions.address, 3);
    // console.log('10. dcu.setMinter(fortFutures.address, 3)');
    // await dcu.setMinter(fortFutures.address, 3);
    // //console.log('11. dcu.setMinter(fortVaultForStaking.address, 3)');
    // //await dcu.setMinter(fortVaultForStaking.address, 3);

    // await fortOptions.register(eth.address, {
    //     channelId: 0,
    //     pairIndex: 0,
        
    //     sigmaSQ: 45659142400n,
    //     miuLong: 64051194700n,
    //     miuShort: 0n
    // });
    // await fortOptions.register(hbtc.address, {
    //     channelId: 0,
    //     pairIndex: 1,
        
    //     sigmaSQ: 31708924900n,
    //     miuLong: 64051194700n,
    //     miuShort: 0n
    // });

    // await fortFutures.register(eth.address, {
    //     channelId: 0,
    //     pairIndex: 0,
        
    //     sigmaSQ: 45659142400n,
    //     miuLong: 64051194700n,
    //     miuShort: 0n
    // });
    // await fortFutures.register(hbtc.address, {
    //     channelId: 0,
    //     pairIndex: 1,
        
    //     sigmaSQ: 31708924900n,
    //     miuLong: 64051194700n,
    //     miuShort: 0n
    // });

    // console.log('8.2 create lever');
    // await fortFutures.create(eth.address, [1, 2, 3, 4, 5], true);
    // await fortFutures.create(eth.address, [1, 2, 3, 4, 5], false);

    // await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], true);
    // await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], false);

    console.log('---------- OK ----------');
    
    const BLOCK_TIME = 3;
    const MIU_LONG = 3 / 10000 / 86400;
    const MIU_SHORT = 0;

    const contracts = {
        eth: eth,
        usdt: usdt,
        hbtc: hbtc,

        fortGovernance: fortGovernance,
        dcu: dcu,
        fortDAO: fortDAO,
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