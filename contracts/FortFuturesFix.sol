// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "./custom/ChainParameter.sol";
import "./custom/HedgeFrequentlyUsed.sol";
import "./custom/FortPriceAdapter.sol";

/// @dev Futures
contract FortFuturesFix is ChainParameter, HedgeFrequentlyUsed, FortPriceAdapter {

    /// @dev Account information
    struct Account {
        // Amount of margin
        uint128 balance;
        // Base price
        uint64 basePrice;
        // Base block
        uint32 baseBlock;
    }

    /// @dev Future information
    struct FutureInfo {
        // Target token address
        address tokenAddress; 
        // Lever of future
        uint32 lever;
        // true: call, false: put
        bool orientation;

        // Token index in _tokenConfigs
        uint16 tokenIndex;
        
        // Account mapping
        mapping(address=>Account) accounts;
    }

    // Minimum balance quantity. If the balance is less than this value, it will be liquidated
    uint constant MIN_VALUE = 10 ether;

    // Mapping from composite key to future index
    mapping(uint=>uint) _futureMapping;

    // PlaceHolder
    mapping(address=>uint) _bases;

    // Future array
    FutureInfo[] _futures;

    // token to index mapping
    mapping(address=>uint) _tokenMapping;

    // Token configs
    TokenConfig[] _tokenConfigs;

    constructor() {
    }

    /// @dev Returns the current value of the specified future
    /// @param index Index of future
    /// @param oraclePrice Current price from oracle
    /// @param addr Target address
    function balanceOf(uint index, uint oraclePrice, address addr) external view returns (uint) {
        FutureInfo storage fi = _futures[index];
        Account memory account = fi.accounts[addr];
        return _balanceOf(
            _tokenConfigs[fi.tokenIndex],
            uint(account.balance), 
            _decodeFloat(account.basePrice), 
            uint(account.baseBlock),
            oraclePrice, 
            fi.orientation, 
            uint(fi.lever)
        );
    }

    /// @dev Fix basePrice for addr
    /// @param index Index of future
    /// @param addr Target address
    function fix(uint index, address addr) external onlyGovernance {
        Account storage account = _futures[index].accounts[addr];
        account.basePrice = _encodeFloat(_decodeFloat(account.basePrice) * 1e12);
    }

    /// @dev Encode the uint value as a floating-point representation in the form of fraction * 16 ^ exponent
    /// @param value Destination uint value
    /// @return float format
    function _encodeFloat(uint value) private pure returns (uint64) {

        uint exponent = 0; 
        while (value > 0x3FFFFFFFFFFFFFF) {
            value >>= 4;
            ++exponent;
        }
        return uint64((value << 6) | exponent);
    }

    /// @dev Decode the floating-point representation of fraction * 16 ^ exponent to uint
    /// @param floatValue fraction value
    /// @return decode format
    function _decodeFloat(uint64 floatValue) private pure returns (uint) {
        return (uint(floatValue) >> 6) << ((uint(floatValue) & 0x3F) << 2);
    }

    // Calculate net worth
    function _balanceOf(
        TokenConfig memory tokenConfig,
        uint balance,
        uint basePrice,
        uint baseBlock,
        uint oraclePrice, 
        bool ORIENTATION, 
        uint LEVER
    ) private view returns (uint) {

        if (balance > 0) {
            uint left;
            uint right;
            // Call
            if (ORIENTATION) {
                left = balance + (LEVER << 64) * balance * oraclePrice / basePrice
                        / _expMiuT(uint(tokenConfig.miuLong), baseBlock);
                right = balance * LEVER;
            } 
            // Put
            else {
                left = balance * (1 + LEVER);
                right = (LEVER << 64) * balance * oraclePrice / basePrice 
                        / _expMiuT(uint(tokenConfig.miuShort), baseBlock);
            }

            if (left > right) {
                balance = left - right;
            } else {
                balance = 0;
            }
        }

        return balance;
    }

    // Calculate e^μT
    function _expMiuT(uint miu, uint baseBlock) private view returns (uint) {
        // return _toUInt(ABDKMath64x64.exp(
        //     _toInt128((orientation ? MIU_LONG : MIU_SHORT) * (block.number - baseBlock) * BLOCK_TIME)
        // ));

        // Using approximate algorithm: x*(1+rt)
        return miu * (block.number - baseBlock) * BLOCK_TIME + 0x10000000000000000;
    }
}
