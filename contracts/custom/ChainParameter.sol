// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

/// @dev Base contract of Fort
contract ChainParameter {

    // Block time. ethereum 14 seconds, BSC 3 seconds, polygon 2.2 seconds
    uint constant BLOCK_TIME = 2200;

    // Minimal exercise block period. 1200000
    uint constant MIN_PERIOD = 1200000;
}
