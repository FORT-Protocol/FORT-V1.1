// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.6;

import "./interfaces/IFortMapping.sol";

import "./FortBase.sol";

/// @dev The contract is for Fort builtin contract address mapping
abstract contract FortMapping is FortBase, IFortMapping {

    /// @dev Address of dcu token contract
    address _dcuToken;

    /// @dev IFortDAO implementation contract address
    address _fortDAO;

    /// @dev IFortOptions implementation contract address
    address _fortOptions;

    /// @dev IFortFutures implementation contract address
    address _fortFutures;

    /// @dev IFortVaultForStaking implementation contract address
    address _fortVaultForStaking;

    /// @dev INestPriceFacade implementation contract address
    address _nestPriceFacade;

    /// @dev Address registered in the system
    mapping(string=>address) _registeredAddress;

    /// @dev Set the built-in contract address of the system
    /// @param dcuToken Address of dcu token contract
    /// @param fortDAO IFortDAO implementation contract address
    /// @param fortOptions IFortOptions implementation contract address for Fort
    /// @param fortFutures IFortFutures implementation contract address
    /// @param fortVaultForStaking IFortVaultForStaking implementation contract address
    /// @param nestPriceFacade INestPriceFacade implementation contract address
    function setBuiltinAddress(
        address dcuToken,
        address fortDAO,
        address fortOptions,
        address fortFutures,
        address fortVaultForStaking,
        address nestPriceFacade
    ) external override onlyGovernance {

        if (dcuToken != address(0)) {
            _dcuToken = dcuToken;
        }
        if (fortDAO != address(0)) {
            _fortDAO = fortDAO;
        }
        if (fortOptions != address(0)) {
            _fortOptions = fortOptions;
        }
        if (fortFutures != address(0)) {
            _fortFutures = fortFutures;
        }
        if (fortVaultForStaking != address(0)) {
            _fortVaultForStaking = fortVaultForStaking;
        }
        if (nestPriceFacade != address(0)) {
            _nestPriceFacade = nestPriceFacade;
        }
    }

    /// @dev Get the built-in contract address of the system
    /// @return dcuToken Address of dcu token contract
    /// @return fortDAO IFortDAO implementation contract address
    /// @return fortOptions IFortOptions implementation contract address
    /// @return fortFutures IFortFutures implementation contract address
    /// @return fortVaultForStaking IFortVaultForStaking implementation contract address
    /// @return nestPriceFacade INestPriceFacade implementation contract address
    function getBuiltinAddress() external view override returns (
        address dcuToken,
        address fortDAO,
        address fortOptions,
        address fortFutures,
        address fortVaultForStaking,
        address nestPriceFacade
    ) {
        return (
            _dcuToken,
            _fortDAO,
            _fortOptions,
            _fortFutures,
            _fortVaultForStaking,
            _nestPriceFacade
        );
    }

    /// @dev Get address of dcu token contract
    /// @return Address of dcu token contract
    function getDCUTokenAddress() external view override returns (address) { return _dcuToken; }

    /// @dev Get IFortDAO implementation contract address
    /// @return IFortDAO implementation contract address
    function getFortDAOAddress() external view override returns (address) { return _fortDAO; }

    /// @dev Get IFortOptions implementation contract address
    /// @return IFortOptions implementation contract address
    function getFortOptionsAddress() external view override returns (address) { return _fortOptions; }

    /// @dev Get IFortFutures implementation contract address
    /// @return IFortFutures implementation contract address
    function getFortFuturesAddress() external view override returns (address) { return _fortFutures; }

    /// @dev Get IFortVaultForStaking implementation contract address
    /// @return IFortVaultForStaking implementation contract address
    function getFortVaultForStakingAddress() external view override returns (address) { return _fortVaultForStaking; }

    /// @dev Get INestPriceFacade implementation contract address
    /// @return INestPriceFacade implementation contract address
    function getNestPriceFacade() external view override returns (address) { return _nestPriceFacade; }

    /// @dev Registered address. The address registered here is the address accepted by Fort system
    /// @param key The key
    /// @param addr Destination address. 0 means to delete the registration information
    function registerAddress(string calldata key, address addr) external override onlyGovernance {
        _registeredAddress[key] = addr;
    }

    /// @dev Get registered address
    /// @param key The key
    /// @return Destination address. 0 means empty
    function checkAddress(string calldata key) external view override returns (address) {
        return _registeredAddress[key];
    }
}