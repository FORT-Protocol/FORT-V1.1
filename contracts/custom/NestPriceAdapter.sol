// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../interfaces/INestOpenPrice.sol";
import "../interfaces/INestBatchPrice2.sol";

import "./FortFrequentlyUsed.sol";

// /// @dev Base contract of Fort
// contract NestPriceAdapter is FortFrequentlyUsed {

//     // ETH/USDT price channel id
//     uint constant ETH_USDT_CHANNEL_ID = 0;

//     // Query latest 2 price
//     function _lastPriceList(address tokenAddress, uint fee, address payback) internal returns (uint[] memory prices) {
//         require(tokenAddress == address(0), "HO:not allowed!");
//         prices = INestOpenPrice(NEST_OPEN_PRICE).lastPriceList {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, 2, payback);

//         prices[1] = _toUSDTPrice(prices[1]);
//         prices[3] = _toUSDTPrice(prices[3]);
//     }

//     // Query latest price
//     function _latestPrice(address tokenAddress, uint fee, address payback) internal returns (uint oraclePrice) {
//         require(tokenAddress == address(0), "HO:not allowed!");
//         //uint tokenAmount = 1 ether;

//         (, uint rawPrice) = INestOpenPrice(NEST_OPEN_PRICE).latestPrice {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, payback);

//         oraclePrice = _toUSDTPrice(rawPrice);
//     }

//     // Find price by blockNumber
//     function _findPrice(address tokenAddress, uint blockNumber, uint fee, address payback) internal returns (uint oraclePrice) {
//         require(tokenAddress == address(0), "HO:not allowed!");
        
//         (, uint rawPrice) = INestOpenPrice(NEST_OPEN_PRICE).findPrice {
//             value: fee
//         } (ETH_USDT_CHANNEL_ID, blockNumber, payback);

//         oraclePrice = _toUSDTPrice(rawPrice);
//     }

//     // Convert to usdt based price
//     function _toUSDTPrice(uint rawPrice) internal pure returns (uint) {
//         return 2000 ether * 1 ether / rawPrice;
//     }
// }

/// @dev Base contract of Fort
contract NestPriceAdapter is FortFrequentlyUsed {

    // ETH/USDT price channel id
    uint constant ETH_USDT_CHANNEL_ID = 0;

    // ETH/USDT price pair index
    uint constant ETH_USDT_PAIR_INDEX = 0;

    // Post unit: 2000usd
    uint constant POST_UNIT = 2000 * USDT_BASE;

    function _pairIndices() private pure returns (uint[] memory pairIndices) {
        pairIndices = new uint[](1);
        pairIndices[0] = ETH_USDT_PAIR_INDEX;
    }

    // Query latest 2 price
    function _lastPriceList(address tokenAddress, uint fee, address payback) internal returns (uint[] memory prices) {
        require(tokenAddress == address(0), "HO:not allowed!");

        prices = INestBatchPrice2(NEST_OPEN_PRICE).lastPriceList {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), 2, payback);

        prices[1] = _toUSDTPrice(prices[1]);
        prices[3] = _toUSDTPrice(prices[3]);
    }

    // Query latest price
    function _latestPrice(address tokenAddress, uint fee, address payback) internal returns (uint oraclePrice) {
        require(tokenAddress == address(0), "HO:not allowed!");
        uint[] memory prices = INestBatchPrice2(NEST_OPEN_PRICE).lastPriceList {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), 1, payback);

        oraclePrice = _toUSDTPrice(prices[1]);
    }

    // Find price by blockNumber
    function _findPrice(address tokenAddress, uint blockNumber, uint fee, address payback) internal returns (uint oraclePrice) {
        require(tokenAddress == address(0), "HO:not allowed!");
        
        uint[] memory prices = INestBatchPrice2(NEST_OPEN_PRICE).findPrice {
            value: fee
        } (ETH_USDT_CHANNEL_ID, _pairIndices(), blockNumber, payback);

        oraclePrice = _toUSDTPrice(prices[1]);
    }

    // Convert to usdt based price
    function _toUSDTPrice(uint rawPrice) internal pure returns (uint) {
        return POST_UNIT * 1 ether / rawPrice;
    }
}
