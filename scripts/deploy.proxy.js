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
    const FortOptions = await ethers.getContractFactory('FortOptions');
    const FortFutures = await ethers.getContractFactory('FortFutures');
    const HedgeVaultForStaking = await ethers.getContractFactory('HedgeVaultForStaking');

    console.log('** Deploy: deploy.proxy.js **');
    
    const usdt = await TestERC20.deploy('USDT', 'USDT', 6);
    //const usdt = await TestERC20.attach('0x0000000000000000000000000000000000000000');
    console.log('usdt: ' + usdt.address);

    const hbtc = await TestERC20.deploy('HBTC', 'HBTC', 18);
    //const hbtc = await TestERC20.attach('0x0000000000000000000000000000000000000000');
    console.log('hbtc: ' + hbtc.address);

    const dcu = await DCU.deploy();
    //const dcu = await DCU.attach('0x0000000000000000000000000000000000000000');
    console.log('dcu: ' + dcu.address);

    const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    //const nestPriceFacade = await NestPriceFacade.attach('0x0000000000000000000000000000000000000000');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    const hedgeGovernance = await upgrades.deployProxy(HedgeGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    //const hedgeGovernance = await HedgeGovernance.attach('0x0000000000000000000000000000000000000000');
    console.log('hedgeGovernance: ' + hedgeGovernance.address);

    const hedgeDAO = await upgrades.deployProxy(HedgeDAO, [hedgeGovernance.address], { initializer: 'initialize' });
    //const hedgeDAO = await HedgeDAO.attach('0x0000000000000000000000000000000000000000');
    console.log('hedgeDAO: ' + hedgeDAO.address);

    const fortOptions = await upgrades.deployProxy(FortOptions, [hedgeGovernance.address], { initializer: 'initialize' });
    //const fortOptions = await FortOptions.attach('0x0000000000000000000000000000000000000000');
    console.log('fortOptions: ' + fortOptions.address);

    const fortFutures = await upgrades.deployProxy(FortFutures, [hedgeGovernance.address], { initializer: 'initialize' });
    //const fortFutures = await FortFutures.attach('0x0000000000000000000000000000000000000000');
    console.log('fortFutures: ' + fortFutures.address);

    const hedgeVaultForStaking = await upgrades.deployProxy(HedgeVaultForStaking, [hedgeGovernance.address], { initializer: 'initialize' });
    //const hedgeVaultForStaking = await HedgeVaultForStaking.attach('0x0000000000000000000000000000000000000000');
    console.log('hedgeVaultForStaking: ' + hedgeVaultForStaking.address);

    // await hedgeGovernance.initialize('0x0000000000000000000000000000000000000000');
    console.log('1. dcu.initialize(hedgeGovernance.address)');
    await dcu.initialize(hedgeGovernance.address);

    console.log('2. hedgeGovernance.setBuiltinAddress()');
    await hedgeGovernance.setBuiltinAddress(
        dcu.address,
        hedgeDAO.address,
        fortOptions.address,
        fortFutures.address,
        hedgeVaultForStaking.address,
        nestPriceFacade.address
    );

    console.log('3. dcu.update()');
    await dcu.update(hedgeGovernance.address);
    console.log('4. hedgeDAO.update()');
    await hedgeDAO.update(hedgeGovernance.address);
    console.log('5. fortOptions.update()');
    await fortOptions.update(hedgeGovernance.address);
    console.log('6. fortFutures.update()');
    await fortFutures.update(hedgeGovernance.address);
    console.log('7. hedgeVaultForStaking.update()');
    await hedgeVaultForStaking.update(hedgeGovernance.address);

    // 2.4. Register ETH ans HBTC
    console.log('7. fortOptions.register(eth.address)');
    await fortOptions.register(eth.address, {
        channelId: 0,
        pairIndex: 1,
        
        sigmaSQ: 45659142400n,
        miuLong: 64051194700n,
        miuShort: 0n
    });

    console.log('8. fortOptions.register(hbtc.address)');
    await fortOptions.register(hbtc.address, {
        channelId: 0,
        pairIndex: 0,
        
        sigmaSQ: 31708924900n,
        miuLong: 64051194700n,
        miuShort: 0n
    });
    
    // 3.4. Register ETH and HBTC
    console.log('9. fortFutures.register(eth.address)');
    await fortFutures.register(eth.address, {
        channelId: 0,
        pairIndex: 1,
        
        sigmaSQ: 45659142400n,
        miuLong: 64051194700n,
        miuShort: 0n
    });
    console.log('10. fortFutures.register(hbtc.address)');
    await fortFutures.register(hbtc.address, {
        channelId: 0,
        pairIndex: 0,
        
        sigmaSQ: 31708924900n,
        miuLong: 64051194700n,
        miuShort: 0n
    });

    console.log('9. dcu.setMinter(fortOptions.address, 1)');
    await dcu.setMinter(fortOptions.address, 1);
    console.log('10. dcu.setMinter(fortFutures.address, 1)');
    await dcu.setMinter(fortFutures.address, 1);
    console.log('11. dcu.setMinter(hedgeVaultForStaking.address, 1)');
    await dcu.setMinter(hedgeVaultForStaking.address, 1);

    console.log('8.2 create lever');
    
    // 3.5. Register levels for ETH
    console.log('13. create eth long lever');
    await fortFutures.create(eth.address, [1, 2, 3, 4, 5], true);
    console.log('14. create eth short lever');
    await fortFutures.create(eth.address, [1, 2, 3, 4, 5], false);
    
    // 3.5. Register levels for HBTC
    console.log('13. create hbtc long lever');
    await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], true);
    console.log('14. create hbtc short lever');
    await fortFutures.create(hbtc.address, [1, 2, 3, 4, 5], false);
    console.log('---------- OK ----------');
    
    const BLOCK_TIME = 14;
    const MIU_LONG = 3 / 10000 / 86400;
    const MIU_SHORT = 0;

    const contracts = {
        eth: eth,
        usdt: usdt,
        hbtc: hbtc,

        hedgeGovernance: hedgeGovernance,
        dcu: dcu,
        hedgeDAO: hedgeDAO,
        fortOptions: fortOptions,
        fortFutures: fortFutures,
        hedgeVaultForStaking: hedgeVaultForStaking,
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