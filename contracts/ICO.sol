// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Token.sol";

contract ICO {
    address admin;
    Token public token;
    uint256 public price;
    uint256 public tokensSold;
    uint256 public minThreshold;
    bool public saleFailed;
    bool public saleEnded;

    event Sell(address _buyer, uint256 _amount);
    event SaleEnded(bool saleFailed);
    event Refund(address _refundee, uint256 amount);

    constructor (Token _tokenContract, uint256 _tokenPrice, uint256 _min, address owner) {
        admin = owner;
        token = _tokenContract;
        price = _tokenPrice;
        minThreshold = _min;
        saleFailed = false;
        saleEnded = false;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        // This is just a safe multiplication - reminiscient of that in DSMath library. 
        // Not entirely sure of it's necessity but is proper practice.
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(saleEnded == false);
        require(msg.value == multiply(_numberOfTokens, price), 'Please ensure that call value is the product of the number of tokens you wish to purchase, and the price of the token.');
        require(token.balanceOf(address(this)) >= _numberOfTokens * 10 ** 18);
        require(token.transfer(msg.sender, _numberOfTokens * 10 **18));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function refund(uint256 amount) public payable {
        address payable account = payable(msg.sender);
        require(saleFailed == true, 'Sale has not yet ended. Refund option not available');
        require(token.refund(account, amount * 10 ** 18),'You have insufficient tokens for this transaction. Please enter a lower amount.');
        account.transfer(multiply(amount,price));

        tokensSold -= amount;
        emit Refund(msg.sender, amount);
    }

    function endSale() public payable {
        require(msg.sender == admin, 'Only the admin account can end the ICO.');

        if (tokensSold >= minThreshold) {
            address payable tokenAdmin = payable(token.admin());
            require(token.transfer(tokenAdmin, token.balanceOf(address(this))));

            // Just transfer the balance to the admin
            tokenAdmin.transfer(address(this).balance);
        } else {
            saleFailed = true;
        }
        saleEnded = true;
        emit SaleEnded(saleFailed);

    }
}