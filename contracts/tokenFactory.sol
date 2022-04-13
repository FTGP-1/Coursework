// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";
import "./ICO.sol";

contract tokenFactory {

    address admin;
    constructor() {
        admin = msg.sender;
    }

    event TokenCreated(address tokenAdd);
    event ICOCreated(address ICOAddress);

    function genToken (string calldata name, string calldata symbol, uint256 supply, address owner) public returns (address tokenAdd) {
        require(msg.sender == admin);

        Token tok = new Token(name, symbol, supply, owner);

        emit TokenCreated(address(tok));
        return address(tok);
    }

    function genICO (Token _tokenContract, uint256 _tokenPrice, uint256 _min, address owner) public returns (address ICOAddress) {
        require(msg.sender == admin);

        ICO ico = new ICO(_tokenContract, _tokenPrice, _min, msg.sender);

        emit ICOCreated(address(ico));
        return address(ico);
    }
}

// tokenFactory.deployed().then(function(f){tokf=f;})
// tokf.genToken("Sally","SLY",1000).then(function(t) {tok = t;})