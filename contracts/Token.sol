// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    address public admin;

    constructor(string memory name, string memory symbol, uint256 initialSupply, address _owner) ERC20(name, symbol) {
        _mint(_owner, initialSupply * 10**18);
        admin = _owner;
    }

    function refund(address account, uint256 amount) public returns (bool) {
        _burn(account,amount);
        return true;
    }
}


