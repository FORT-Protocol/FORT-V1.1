// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../FortBase.sol";

// /// @dev Base contract of Fort
// contract FortFrequentlyUsed is FortBase {

//     // Address of DCU contract
//     address constant DCU_TOKEN_ADDRESS = 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF;

//     // Address of NestOpenPrice contract
//     address constant NEST_OPEN_PRICE = 0xE544cF993C7d477C7ef8E91D28aCA250D135aa03;
    
//     // USDT base
//     uint constant USDT_BASE = 1 ether;
// }

/// @dev Base contract of Fort
contract FortFrequentlyUsed is FortBase {

    // Address of DCU contract
    address DCU_TOKEN_ADDRESS;

    // Address of NestOpenPrice contract
    address NEST_OPEN_PRICE;
    
    address USDT_TOKEN_ADDRESS;

    // USDT base
    uint constant USDT_BASE = 1 ether;

    // TODO:
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
