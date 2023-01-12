// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../common/UniversalUpgradeable.sol";

contract FeeVault is UniversalUpgradeable {
    function initialize(address owner) public virtual initializer {
        __UniversalUpgradeable_init(owner);
    }

    function execute(address target, bytes calldata data, uint256 value) public payable onlyOwner {
        (bool success, ) = target.call{ value: value }(data);
        require(success, "FeeVault: execute failed");
    }

    receive() external payable {}
}
