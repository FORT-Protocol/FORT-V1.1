// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

/// @dev Base contract of Hedge
contract ChainParameter {

    // Block time. ethereum 14 seconds, BSC 3 seconds, polygon 2.2 seconds
    uint constant BLOCK_TIME = 14;

    // Minimal exercise block period. 180000
    // TODO: 180000
    uint constant MIN_PERIOD = 10;

    // TODO: 180000
    uint constant MIN_EXERCISE_BLOCK = 10;
}
