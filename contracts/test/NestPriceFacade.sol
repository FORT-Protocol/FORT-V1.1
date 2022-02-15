// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "../interfaces/INestPriceFacade.sol";
import "../interfaces/INestOpenPrice.sol";

import "hardhat/console.sol";

contract NestPriceFacade is INestPriceFacade, INestOpenPrice {
    
    struct Price {
        uint price;
        uint dbn;
    }

    mapping(address=>Price) _prices;

    constructor(address defaultAddress) {
        DEFAULT_ADDRESS = defaultAddress;
    }

    function setPrice(address token, uint price, uint dbn) external {
        _prices[token] = Price(price, dbn);
    }

    /// @dev Get the latest effective price
    /// @param tokenAddress Destination token address
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function latestPriceView(address tokenAddress) public view returns (uint blockNumber, uint price) {
        //require(tokenAddress != address(0));
        //return (block.number - 1, 2700 * 1000000);

        Price memory p = _prices[tokenAddress];
        if (p.price == 0) {
            p = Price(2700 * 1 ether, 1);
        }

        return (block.number - p.dbn, p.price);
    }

    /// @dev Find the price at block number
    /// @param tokenAddress Destination token address
    /// @param height Destination block number
    /// @param payback As the charging fee may change, it is suggested that the caller pay more fees, 
    /// and the excess fees will be returned through this address
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function findPrice(
        address tokenAddress, 
        uint height, 
        address payback
    ) external payable override returns (uint blockNumber, uint price) {

        if (msg.value > 0.01 ether) {
            payable(payback).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "NestPriceFacade:Error fee");
        }

        require(height > 0);
        // if (height > 90) {
        //     return (height - 1, 2450000000);
        // }
        return latestPriceView(tokenAddress);
    }

    /// @dev Get the latest trigger price
    /// @param tokenAddress Destination token address
    /// @param payback As the charging fee may change, it is suggested that the caller pay more fees, 
    /// and the excess fees will be returned through this address
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function triggeredPrice(
        address tokenAddress, 
        address payback
    ) external payable override returns (uint blockNumber, uint price) {

        if (msg.value > 0.01 ether) {
            payable(payback).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "NestPriceFacade:Error fee");
        }

        // if (block.number > 90) {
        //     return (block.number - 1, 450000000);
        // }
        return latestPriceView(tokenAddress);
    }

    /// @dev Get the latest trigger price
    /// @param tokenAddress Destination token address
    /// @param payback As the charging fee may change, it is suggested that the caller pay more fees, 
    /// and the excess fees will be returned through this address
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function latestPrice(
        address tokenAddress, 
        address payback
    ) external payable override returns (uint blockNumber, uint price) {

        if (msg.value > 0.01 ether) {
            payable(payback).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "NestPriceFacade:Error fee");
        }

        // if (block.number > 90) {
        //     return (block.number - 1, 450000000);
        // }
        return latestPriceView(tokenAddress);
    }

    /// @dev Get the full information of latest trigger price
    /// @param tokenAddress Destination token address
    /// @param payback As the charging fee may change, it is suggested that the caller pay more fees, 
    /// and the excess fees will be returned through this address
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    /// @return avgPrice Average price
    /// @return sigmaSQ The square of the volatility (18 decimal places). The current implementation 
    /// assumes that the volatility cannot exceed 1. Correspondingly, when the return value is equal to 
    /// 999999999999996447, it means that the volatility has exceeded the range that can be expressed
    function triggeredPriceInfo(
        address tokenAddress, 
        address payback
    ) external payable override returns (uint blockNumber, uint price, uint avgPrice, uint sigmaSQ) {

        if (msg.value > 0.01 ether) {
            payable(payback).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "NestPriceFacade:Error fee");
        }

        (blockNumber, price) = latestPriceView(tokenAddress);
        if (tokenAddress == 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9) {
            return (blockNumber, price, price * 10000 / 10000, 10853469234);
        }
        return (blockNumber, price, price * 9500 / 10000, 10853469234);
    }

    /// @dev Returns lastPriceList and triggered price info
    /// @param tokenAddress Destination token address
    /// @param count The number of prices that want to return
    /// @param payback As the charging fee may change, it is suggested that the caller pay more fees, and the excess fees will be returned through this address
    /// @return prices An array which length is num * 2, each two element expresses one price like blockNumber|price
    /// @return triggeredPriceBlockNumber The block number of triggered price
    /// @return triggeredPriceValue The token triggered price. (1eth equivalent to (price) token)
    /// @return triggeredAvgPrice Average price
    /// @return triggeredSigmaSQ The square of the volatility (18 decimal places). The current implementation assumes that 
    ///         the volatility cannot exceed 1. Correspondingly, when the return value is equal to 999999999999996447,
    ///         it means that the volatility has exceeded the range that can be expressed
    function lastPriceListAndTriggeredPriceInfo(
        address tokenAddress, 
        uint count, 
        address payback
    ) 
    external 
    payable 
    override
    returns (
        uint[] memory prices,
        uint triggeredPriceBlockNumber,
        uint triggeredPriceValue,
        uint triggeredAvgPrice,
        uint triggeredSigmaSQ
    ) {
        if (msg.value > 0.01 ether) {
            payable(payback).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "CoFiXController: Error fee");
        }

        return lastPriceListAndTriggeredPriceInfoView(tokenAddress, count);
    }

    /// @dev Get the last (num) effective price
    /// @param tokenAddress Destination token address
    /// @param count The number of prices that want to return
    /// @param paybackAddress As the charging fee may change, it is suggested that the caller pay more fees, 
    /// and the excess fees will be returned through this address
    /// @return prices An array which length is num * 2, each two element expresses one price like blockNumber|price
    function lastPriceList(
        address tokenAddress, 
        uint count, 
        address paybackAddress
    ) external payable override returns (uint[] memory prices) {
        if (msg.value > 0.01 ether) {
            payable(paybackAddress).transfer(msg.value - 0.01 ether);
        } else {
            require(msg.value == 0.01 ether, "CoFiXController: Error fee");
        }

        (
            prices,
            ,//uint triggeredPriceBlockNumber,
            ,//uint triggeredPriceValue,
            ,//uint triggeredAvgPrice,
            //uint triggeredSigmaSQ
        ) = lastPriceListAndTriggeredPriceInfoView(tokenAddress, count);
    }

    /// @dev Returns lastPriceList and triggered price info
    /// @param tokenAddress Destination token address
    /// @param count The number of prices that want to return
    /// @return prices An array which length is num * 2, each two element expresses one price like blockNumber｜price
    /// @return triggeredPriceBlockNumber The block number of triggered price
    /// @return triggeredPriceValue The token triggered price. (1eth equivalent to (price) token)
    /// @return triggeredAvgPrice Average price
    /// @return triggeredSigmaSQ The square of the volatility (18 decimal places). The current implementation assumes that 
    ///         the volatility cannot exceed 1. Correspondingly, when the return value is equal to 999999999999996447,
    ///         it means that the volatility has exceeded the range that can be expressed
    function lastPriceListAndTriggeredPriceInfoView(
        address tokenAddress, 
        uint count
    ) 
    public 
    view
    returns (
        uint[] memory prices,
        uint triggeredPriceBlockNumber,
        uint triggeredPriceValue,
        uint triggeredAvgPrice,
        uint triggeredSigmaSQ
    ) {
        (uint bn, uint price) = latestPriceView(tokenAddress);
        prices = new uint[](count <<= 1);
        for (uint i = 0; i < count;) {
            prices[i] = bn - i;
            //prices[i + 1] = price + i * 1.79e6;
            prices[i + 1] = price + i * 1.789e6;
            i += 2; 
        }
        return (prices, bn, price, price * 9500 / 10000, 10853469234);
    }

    ////////////////////////////////////////////////////////////////////////

    /// @dev Get the latest trigger price
    /// @param channelId Price channel id
    /// @param payback Address to receive refund
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function triggeredPrice(uint channelId, address payback) external payable override returns (uint blockNumber, uint price) {

    }

    /// @dev Get the full information of latest trigger price
    /// @param channelId Price channel id
    /// @param payback Address to receive refund
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    /// @return avgPrice Average price
    /// @return sigmaSQ The square of the volatility (18 decimal places). The current implementation assumes that 
    ///         the volatility cannot exceed 1. Correspondingly, when the return value is equal to 999999999999996447,
    ///         it means that the volatility has exceeded the range that can be expressed
    function triggeredPriceInfo(uint channelId, address payback) external payable override returns (
        uint blockNumber,
        uint price,
        uint avgPrice,
        uint sigmaSQ
    ) {

    }

    /// @dev Find the price at block number
    /// @param channelId Price channel id
    /// @param height Destination block number
    /// @param payback Address to receive refund
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function findPrice(
        uint channelId,
        uint height, 
        address payback
    ) external payable override returns (uint blockNumber, uint price) {
        require(channelId >= 0);
        require(height >= 0);

        if (msg.value > 0.005 ether) {
            payable(payback).transfer(msg.value - 0.005 ether);
        } else {
            require(msg.value == 0.005 ether, "CoFiXController: Error fee");
        }

        // if (height > 90) {
        //     return (height - 1, 2450000000);
        // }
        (blockNumber, price) = latestPriceView(DEFAULT_ADDRESS);
        price = _toETHPrice(price);
    }

    address DEFAULT_ADDRESS;

    function _toETHPrice(uint price) private pure returns (uint) {
        return 2000 ether * 1 ether / price;
    }

    /// @dev Get the latest effective price
    /// @param channelId Price channel id
    /// @param payback Address to receive refund
    /// @return blockNumber The block number of price
    /// @return price The token price. (1eth equivalent to (price) token)
    function latestPrice(uint channelId, address payback) external payable override returns (uint blockNumber, uint price) {
        require(channelId >= 0);

        if (msg.value > 0.005 ether) {
            payable(payback).transfer(msg.value - 0.005 ether);
        } else {
            require(msg.value == 0.005 ether, "CoFiXController: Error fee");
        }

        // if (block.number > 90) {
        //     return (block.number - 1, 450000000);
        // }
        (blockNumber, price) = latestPriceView(DEFAULT_ADDRESS);
        price = _toETHPrice(price);
    }

    /// @dev Get the last (num) effective price
    /// @param channelId Price channel id
    /// @param count The number of prices that want to return
    /// @param payback Address to receive refund
    /// @return An array which length is num * 2, each two element expresses one price like blockNumber|price
    function lastPriceList(uint channelId, uint count, address payback) external payable override returns (uint[] memory) {
        require(channelId >= 0);

        if (msg.value > 0.005 ether) {
            payable(payback).transfer(msg.value - 0.005 ether);
        } else {
            require(msg.value == 0.005 ether, "CoFiXController: Error fee");
        }

        (
            uint[] memory prices,
            ,//uint triggeredPriceBlockNumber,
            ,//uint triggeredPriceValue,
            ,//uint triggeredAvgPrice,
            //uint triggeredSigmaSQ
        ) = lastPriceListAndTriggeredPriceInfoView(DEFAULT_ADDRESS, count);

        prices[1] = _toETHPrice(prices[1]);
        prices[3] = _toETHPrice(prices[3]);

        return prices;
    }

    /// @dev Returns the results of latestPrice() and triggeredPriceInfo()
    /// @param channelId Price channel id
    /// @param payback Address to receive refund
    /// @return latestPriceBlockNumber The block number of latest price
    /// @return latestPriceValue The token latest price. (1eth equivalent to (price) token)
    /// @return triggeredPriceBlockNumber The block number of triggered price
    /// @return triggeredPriceValue The token triggered price. (1eth equivalent to (price) token)
    /// @return triggeredAvgPrice Average price
    /// @return triggeredSigmaSQ The square of the volatility (18 decimal places). The current implementation 
    /// assumes that the volatility cannot exceed 1. Correspondingly, when the return value is equal to 
    /// 999999999999996447, it means that the volatility has exceeded the range that can be expressed
    function latestPriceAndTriggeredPriceInfo(uint channelId, address payback) external payable override
    returns (
        uint latestPriceBlockNumber,
        uint latestPriceValue,
        uint triggeredPriceBlockNumber,
        uint triggeredPriceValue,
        uint triggeredAvgPrice,
        uint triggeredSigmaSQ
    ) {

    }

    /// @dev Returns lastPriceList and triggered price info
    /// @param channelId Price channel id
    /// @param count The number of prices that want to return
    /// @param payback Address to receive refund
    /// @return prices An array which length is num * 2, each two element expresses one price like blockNumber|price
    /// @return triggeredPriceBlockNumber The block number of triggered price
    /// @return triggeredPriceValue The token triggered price. (1eth equivalent to (price) token)
    /// @return triggeredAvgPrice Average price
    /// @return triggeredSigmaSQ The square of the volatility (18 decimal places). The current implementation 
    /// assumes that the volatility cannot exceed 1. Correspondingly, when the return value is equal to 
    /// 999999999999996447, it means that the volatility has exceeded the range that can be expressed
    function lastPriceListAndTriggeredPriceInfo(uint channelId, uint count, address payback) external payable override
    returns (
        uint[] memory prices,
        uint triggeredPriceBlockNumber,
        uint triggeredPriceValue,
        uint triggeredAvgPrice,
        uint triggeredSigmaSQ
    ) {
        require(channelId >= 0);

        if (msg.value > 0.005 ether) {
            payable(payback).transfer(msg.value - 0.005 ether);
        } else {
            require(msg.value == 0.005 ether, "CoFiXController: Error fee");
        }

        (uint bn, uint price) = latestPriceView(DEFAULT_ADDRESS);
        prices = new uint[](count <<= 1);
        for (uint i = 0; i < count;) {
            prices[i] = bn - i;
            //prices[i + 1] = price + i * 1.79e6;
            prices[i + 1] = price + i * 1.789e6;
            i += 2; 
        }
        uint avgPrice = price * 9500 / 10000;
        for (uint i = 1; i < prices.length; i += 2) {
            prices[i] = _toETHPrice(prices[i]);
        }
        avgPrice = _toETHPrice(avgPrice);

        return (prices, bn, price, avgPrice, 10853469234);
    }
}