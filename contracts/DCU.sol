// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./FortBase.sol";

/// @dev DCU代币
contract DCU is FortBase, ERC20("Decentralized Currency Unit", "DCU") {

    // 保存地址权限标记。第一位表示mint权限，第二位表示burn权限
    mapping(address=>uint) _flags;

    constructor() {
    }

    /// @dev 设置挖矿权限
    /// @param account 目标账号
    /// @param flag 挖矿权限标记，第一位表示mint权限，第二位表示burn权限
    function setMinter(address account, uint flag) external onlyGovernance {
        _flags[account] = flag;
    }

    /// @dev 检查挖矿权限
    /// @param account 目标账号
    /// @return flag 挖矿权限标记，第一位表示mint权限，第二位表示burn权限
    function checkMinter(address account) external view returns (uint) {
        return _flags[account];
    }

    /// @dev 铸币
    /// @param to 接受地址
    /// @param value 铸币数量
    function mint(address to, uint value) external {
        require(_flags[msg.sender] & 0x01 == 0x01, "DCU:!mint");
        _mint(to, value);
    }

    /// @dev 销毁
    /// @param from 目标地址
    /// @param value 销毁数量
    function burn(address from, uint value) external {
        require(_flags[msg.sender] & 0x02 == 0x02, "DCU:!burn");
        _burn(from, value);
    }
}