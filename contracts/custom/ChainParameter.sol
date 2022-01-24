// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

/// @dev Base contract of Fort
contract ChainParameter {

    // 区块时间（毫秒），以太坊取14秒，BSC取3秒，polygon取2.2秒
    uint constant BLOCK_TIME = 2200;

    // 期权行权最小间隔	1200000	区块数	行权时间和当前时间最小间隔区块数，统一设置
    uint constant MIN_PERIOD = 1200000;
}
