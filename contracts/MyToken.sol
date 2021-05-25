//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";


contract MyToken is ERC20Upgradeable {
  function initialize() public initializer {
    __ERC20_init("MyToken", "MTK");
  }
}
