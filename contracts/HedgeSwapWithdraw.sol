// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./libs/TransferHelper.sol";

import "./HedgeFrequentlyUsed.sol";

/// @dev This contract is for withdraw from HedgeSwap pool
contract HedgeSwapWithdraw is HedgeFrequentlyUsed {

    // NEST token address
    address constant NEST_TOKEN_ADDRESS = 0x04abEdA201850aC0124161F037Efd70c74ddC74C;

    // K value, 15000000 nest and 15000000 dcu
    uint constant K = 15000000 ether * 15000000 ether;

    constructor() {
    }

    /// @dev Withdraw half of the funds from the fund pool and other proportions for cross to BSC chain
    function withdraw() external onlyGovernance {
        uint balance0 = IERC20(NEST_TOKEN_ADDRESS).balanceOf(address(this));
        uint balance1 = IERC20( DCU_TOKEN_ADDRESS).balanceOf(address(this));
        
        TransferHelper.safeTransfer(NEST_TOKEN_ADDRESS, msg.sender, balance0 >> 1);
        TransferHelper.safeTransfer( DCU_TOKEN_ADDRESS, msg.sender, balance1 >> 1);
        
        balance0 = IERC20(NEST_TOKEN_ADDRESS).balanceOf(address(this));
        balance1 = IERC20( DCU_TOKEN_ADDRESS).balanceOf(address(this));
        
        require(balance0 * balance1 > K - 1 ether * 1 ether 
             && balance0 * balance1 < K + 1 ether * 1 ether, "HSW:balance error");
    }
}
