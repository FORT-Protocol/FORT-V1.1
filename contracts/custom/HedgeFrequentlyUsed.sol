// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../HedgeBase.sol";

/// @dev Base contract of Hedge
contract HedgeFrequentlyUsed is HedgeBase {

    // Address of DCU contract
    address constant DCU_TOKEN_ADDRESS = 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF;

    // Address of NestOpenPrice contract
    address constant NEST_OPEN_PRICE = 0xE544cF993C7d477C7ef8E91D28aCA250D135aa03;
    
    // USDT base
    uint constant USDT_BASE = 1 ether;
}