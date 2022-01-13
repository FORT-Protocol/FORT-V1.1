// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../interfaces/INestOpenPrice.sol";
import "../interfaces/INestBatchPrice2.sol";

import "./HedgeFrequentlyUsed.sol";

// /// @dev Base contract of Hedge
// contract NestPriceAdapter is HedgeFrequentlyUsed {

//     // ETH/USDT报价通道id
//     uint constant ETH_USDT_CHANNEL_ID = 0;

//     // 查询最新的两个价格
//     function _lastPriceList(address tokenAddress, uint fee, address payback) internal returns (uint[] memory prices) {
//         require(tokenAddress == address(0), "HO:not allowed!");
//         prices = INestOpenPrice(NEST_OPEN_PRICE).lastPriceList {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, 2, payback);

//         prices[1] = _toUSDTPrice(prices[1]);
//         prices[3] = _toUSDTPrice(prices[3]);
//     }

//     // 查询token价格
//     function _latestPrice(address tokenAddress, uint fee, address payback) internal returns (uint oraclePrice) {
//         require(tokenAddress == address(0), "HO:not allowed!");
//         // 1.1. 获取token相对于eth的价格
//         //uint tokenAmount = 1 ether;

//         // 1.2. 获取usdt相对于eth的价格
//         (, uint rawPrice) = INestOpenPrice(NEST_OPEN_PRICE).latestPrice {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, payback);

//         // 1.3. 将token价格转化为以usdt为单位计算的价格
//         oraclePrice = _toUSDTPrice(rawPrice);
//     }

//     // 查找价格
//     function _findPrice(address tokenAddress, uint blockNumber, uint fee, address payback) internal returns (uint oraclePrice) {
//         require(tokenAddress == address(0), "HO:not allowed!");
        
//         // 3.2. 获取usdt相对于eth的价格
//         (, uint rawPrice) = INestOpenPrice(NEST_OPEN_PRICE).findPrice {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, blockNumber, payback);

//         // 将token价格转化为以usdt为单位计算的价格
//         oraclePrice = _toUSDTPrice(rawPrice);
//     }

//     // 转为USDT价格
//     function _toUSDTPrice(uint rawPrice) internal pure returns (uint) {
//         return 2000 ether * 1 ether / rawPrice;
//     }
// }

/// @dev Base contract of Hedge
contract NestPriceAdapter is HedgeFrequentlyUsed {

    // ETH/USDT报价通道id
    uint constant ETH_USDT_CHANNEL_ID = 0;

    // ETH/USDT报价对编号
    uint constant ETH_USDT_PAIR_INDEX = 0;

    // 报价单位2000 USDT
    uint constant POST_UNIT = 2000 * USDT_BASE;

    function _pairIndices() private pure returns (uint[] memory pairIndices) {
        pairIndices = new uint[](1);
        pairIndices[0] = ETH_USDT_PAIR_INDEX;
    }

    // 查询最新的两个价格
    function _lastPriceList(address tokenAddress, uint fee, address payback) internal returns (uint[] memory prices) {
        require(tokenAddress == address(0), "HO:not allowed!");

        prices = INestBatchPrice2(NEST_OPEN_PRICE).lastPriceList {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), 2, payback);

        prices[1] = _toUSDTPrice(prices[1]);
        prices[3] = _toUSDTPrice(prices[3]);
    }

    // 查询token价格
    function _latestPrice(address tokenAddress, uint fee, address payback) internal returns (uint oraclePrice) {
        require(tokenAddress == address(0), "HO:not allowed!");
        // 1. 获取usdt相对于eth的价格
        uint[] memory prices = INestBatchPrice2(NEST_OPEN_PRICE).lastPriceList {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), 1, payback);

        // 2. 将token价格转化为以usdt为单位计算的价格
        oraclePrice = _toUSDTPrice(prices[1]);
    }

    // 查找价格
    function _findPrice(address tokenAddress, uint blockNumber, uint fee, address payback) internal returns (uint oraclePrice) {
        require(tokenAddress == address(0), "HO:not allowed!");
        
        // 获取usdt相对于eth的价格
        uint[] memory prices = INestBatchPrice2(NEST_OPEN_PRICE).findPrice {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), blockNumber, payback);

        // 将token价格转化为以usdt为单位计算的价格
        oraclePrice = _toUSDTPrice(prices[1]);
    }

    // 转为USDT价格
    function _toUSDTPrice(uint rawPrice) internal pure returns (uint) {
        return POST_UNIT * 1 ether / rawPrice;
    }
}
