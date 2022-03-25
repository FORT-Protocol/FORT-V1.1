// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;


import "./DCU.sol";

/// @dev KCCDCU token
contract KCCDCU is DCU {

    event LogSwapin(bytes32 indexed txhash, address indexed account, uint amount);

    event LogSwapout(address indexed account, address indexed bindaddr, uint amount);

    function Swapin(bytes32 txhash, address account, uint256 amount) external returns (bool) {
        require(_flags[msg.sender] & 0x01 == 0x01, 'DCU:!mint');
        _mint(account, amount);
        emit LogSwapin(txhash, account, amount);
        return true;
    }

    function Swapout(uint256 amount, address bindaddr) external returns (bool) {
        require(bindaddr != address(0), "DCU:address(0x0)");
        _burn(msg.sender, amount);
        emit LogSwapout(msg.sender, bindaddr, amount);
        return true;
    }
}