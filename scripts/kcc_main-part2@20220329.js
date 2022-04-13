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

    console.log('** Deploy: kcc_main-part2@20220329.js **');
    
    //     ** Deploy: kcc_main-part1@20220328.js **
    // dcu: 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF
    // fortGovernance: 0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8
    // proxyAdmin: 0xB16260599777EFFB17fd2a8fD30c449e5b71C088

    // PETH:0x6cce8b9da777Ab10B11f4EA8510447431ED6ad1E
    // PUSD:0x0C4CD7cA70172Af5f4BfCb7b0ACBf6EdFEaFab31
    // PBTC:0x32D4a9a94537a88118e878c56b93009Af234A6ce
    // NEST:0x98f8669F6481EbB341B522fCD3663f79A3d1A6A7

    const pbtc = await TestERC20.attach('0x32D4a9a94537a88118e878c56b93009Af234A6ce');
    console.log('pbtc: ' + pbtc.address);

    //const dcu = await DCU.deploy();
    const dcu = await DCU.attach('0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF');
    console.log('dcu: ' + dcu.address);

    // TODO: 确定地址
    //const nestPriceFacade = await NestPriceFacade.deploy(usdt.address);
    const nestPriceFacade = await NestPriceFacade.attach('0x0000000000000000000000000000000000000000');
    console.log('nestPriceFacade: ' + nestPriceFacade.address);

    //const fortGovernance = await upgrades.deployProxy(FortGovernance, ['0x0000000000000000000000000000000000000000'], { initializer: 'initialize' });
    const fortGovernance = await FortGovernance.attach('0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8');
    console.log('fortGovernance: ' + fortGovernance.address);

    const fortOptions = await upgrades.deployProxy(FortOptions, [fortGovernance.address], { initializer: 'initialize' });
    //const fortOptions = await FortOptions.attach('0x0000000000000000000000000000000000000000');
    console.log('fortOptions: ' + fortOptions.address);

    const fortFutures = await upgrades.deployProxy(FortFutures, [fortGovernance.address], { initializer: 'initialize' });
    //const fortFutures = await FortFutures.attach('0x0000000000000000000000000000000000000000');
    console.log('fortFutures: ' + fortFutures.address);

    console.log('2. fortGovernance.setBuiltinAddress()');
    await fortGovernance.setBuiltinAddress(
        dcu.address,
        '0x0000000000000000000000000000000000000000',
        fortOptions.address,
        fortFutures.address,
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000'
    );

    // console.log('5. fortOptions.update()');
    // await fortOptions.update(fortGovernance.address);
    // console.log('6. fortFutures.update()');
    // await fortFutures.update(fortGovernance.address);

    console.log('7. fortOptions.register(eth.address)');
    await fortOptions.register(eth.address, {
        channelId: 0,
        pairIndex: 0,
        
        sigmaSQ: 45659142400n,
        miuLong: 64051194700n,
        miuShort: 0n
    });
    console.log('8. fortOptions.register(pbtc.address)');
    await fortOptions.register(pbtc.address, {
        channelId: 0,
        pairIndex: 2,
        
        sigmaSQ: 31708924900n,
        miuLong: 64051194700n,
        miuShort: 0n
    });

    console.log('9. fortFutures.register(eth.address)');
    await fortFutures.register(pth.address, {
        channelId: 0,
        pairIndex: 0,
        
        sigmaSQ: 45659142400n,
        miuLong: 64051194700n,
        miuShort: 0n
    });
    console.log('10. fortFutures.register(hbtc.address)');
    await fortFutures.register(pbtc.address, {
        channelId: 0,
        pairIndex: 2,
        
        sigmaSQ: 31708924900n,
        miuLong: 64051194700n,
        miuShort: 0n
    });

    console.log('11. create eth long lever');
    await fortFutures.create(eth.address, [1, 2, 3, 4, 5], true);
    console.log('12. create eth short lever');
    await fortFutures.create(eth.address, [1, 2, 3, 4, 5], false);

    console.log('13. create pbtc long lever');
    await fortFutures.create(pbtc.address, [1, 2, 3, 4, 5], true);
    console.log('14. create pbtc short lever');
    await fortFutures.create(pbtc.address, [1, 2, 3, 4, 5], false);

    // TODO: 放到最后执行
    // console.log('15. dcu.setMinter(fortOptions.address, 3)');
    // await dcu.setMinter(fortOptions.address, 3);
    // console.log('16. dcu.setMinter(fortFutures.address, 3)');
    // await dcu.setMinter(fortFutures.address, 3);

    console.log('---------- OK ----------');
    
    const BLOCK_TIME = 3;
    const MIU_LONG = 3 / 10000 / 86400;
    const MIU_SHORT = 0;

    const contracts = {
        eth: eth,
        pbtc: pbtc,

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