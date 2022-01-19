// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../interfaces/IFortGovernance.sol";

import "../FortBase.sol";

// /// @dev Base contract of Fort
// contract FortFrequentlyUsed is FortBase {

//     // Address of DCU contract
//     address constant DCU_TOKEN_ADDRESS = 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF;

//     // Address of NestOpenPrice contract
//     address constant NEST_OPEN_PRICE = 0x09CE0e021195BA2c1CDE62A8B187abf810951540;
    
//     // TODO: 改为 1000000
//     // USDT代币的基数
//     uint constant USDT_BASE = 1 ether;
// }

// TODO: 主网部署时，需要使用上面的常量版本
/// @dev Base contract of Fort
contract FortFrequentlyUsed is FortBase {

    // Address of DCU contract
    //address constant DCU_TOKEN_ADDRESS = ;
    address DCU_TOKEN_ADDRESS;

    // Address of NestPriceFacade contract
    //address constant NEST_OPEN_PRICE = 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A;
    address NEST_OPEN_PRICE;

    // USDT代币的基数
    // TODO: 改为 1000000
    uint constant USDT_BASE = 1 ether;

    /// @dev Rewritten in the implementation contract, for load other contract addresses. Call 
    ///      super.update(newGovernance) when overriding, and override method without onlyGovernance
    /// @param newGovernance IFortGovernance implementation contract address
    function update(address newGovernance) public override {

        super.update(newGovernance);
        (
            DCU_TOKEN_ADDRESS,//address dcuToken,
            ,//address fortDAO,
            ,//address fortOptions,
            ,//address fortFutures,
            ,//address fortVaultForStaking,
            NEST_OPEN_PRICE //address nestPriceFacade
        ) = IFortGovernance(newGovernance).getBuiltinAddress();
    }
}
