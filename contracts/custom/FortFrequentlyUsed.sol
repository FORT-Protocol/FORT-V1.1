// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../FortBase.sol";

/// @dev Base contract of Fort
contract FortFrequentlyUsed is FortBase {

    // Address of DCU contract
    address constant DCU_TOKEN_ADDRESS = 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF;

    // Address of NestOpenPrice contract
    address constant NEST_OPEN_PRICE = 0x7DBe94A4D6530F411A1E7337c7eb84185c4396e6;
    
    // USDT base
    uint constant USDT_BASE = 1 ether;
}