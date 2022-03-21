// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./FortBase.sol";

/// @dev DCU token
contract DCU is FortBase, ERC20("Decentralized Currency Unit", "DCU") {

    /// @dev Mining permission flag change event
    /// @param account Target address
    /// @param oldFlag Old flag
    /// @param newFlag New flag
    event MinterChanged(address account, uint oldFlag, uint newFlag);

    // Flags for account
    mapping(address=>uint) _flags;

    constructor() {
    }

    /// @dev Set mining permission flag
    /// @param account Target address
    /// @param flag Mining permission flag
    function setMinter(address account, uint flag) external onlyGovernance {
        emit MinterChanged(account, _flags[account], flag);
        _flags[account] = flag;
    }

    /// @dev Check mining permission flag
    /// @param account Target address
    /// @return flag Mining permission flag
    function checkMinter(address account) external view returns (uint) {
        return _flags[account];
    }

    /// @dev Mint DCU
    /// @param to Target address
    /// @param value Mint amount
    function mint(address to, uint value) external {
        require(_flags[msg.sender] & 0x01 == 0x01, "DCU:!mint");
        _mint(to, value);
    }

    /// @dev Burn DCU
    /// @param from Target address
    /// @param value Burn amount
    function burn(address from, uint value) external {
        require(_flags[msg.sender] & 0x02 == 0x02, "DCU:!burn");
        _burn(from, value);
    }
}