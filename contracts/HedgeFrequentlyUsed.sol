// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "./interfaces/IHedgeGovernance.sol";

import "./HedgeBase.sol";

// /// @dev Base contract of Hedge
// contract HedgeFrequentlyUsed is HedgeBase {

//     // Address of DCU contract
//     address constant DCU_TOKEN_ADDRESS = 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF;

//     // Address of NestPriceFacade contract
//     address constant NEST_PRICE_FACADE_ADDRESS = 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A;
    
//     // USDT代币地址
//     address constant USDT_TOKEN_ADDRESS = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

//     // USDT代币的基数
//     uint constant USDT_BASE = 1000000;
// }

// TODO: 代码改为上面的常量
/// @dev Base contract of Hedge
contract HedgeFrequentlyUsed is HedgeBase {

    // Address of DCU contract
    //address constant DCU_TOKEN_ADDRESS = ;
    address DCU_TOKEN_ADDRESS;

    // Address of NestPriceFacade contract
    //address constant NEST_PRICE_FACADE_ADDRESS = 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A;
    address NEST_PRICE_FACADE_ADDRESS;
    
    // USDT代币地址
    //address constant USDT_TOKEN_ADDRESS = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    address USDT_TOKEN_ADDRESS;

    // USDT代币的基数
    uint constant USDT_BASE = 1000000;

    /// @dev Rewritten in the implementation contract, for load other contract addresses. Call 
    ///      super.update(newGovernance) when overriding, and override method without onlyGovernance
    /// @param newGovernance IHedgeGovernance implementation contract address
    function update(address newGovernance) public override {

        super.update(newGovernance);
        (
            DCU_TOKEN_ADDRESS,//address dcuToken,
            ,//address hedgeDAO,
            ,//address hedgeOptions,
            ,//address hedgeFutures,
            ,//address hedgeVaultForStaking,
            NEST_PRICE_FACADE_ADDRESS //address nestPriceFacade
        ) = IHedgeGovernance(newGovernance).getBuiltinAddress();
    }

    // 测试方法
    function setUsdtTokenAddress(address usdtTokenAddress) external {
        USDT_TOKEN_ADDRESS = usdtTokenAddress;
    }
}