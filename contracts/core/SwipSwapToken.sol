// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SwipSwapToken
 * @dev Simple ERC20 Token yields 1000000 tokens pre-assigned to its creator.
 */
contract SwipSwapToken is ERC20 {
    // modify token name
    string public constant NAME = "Token";
    // modify token symbol
    string public constant SYMBOL = "TKN";
    // modify token decimals
    uint8 public constant DECIMALS = 0;
    // modify initial token supply
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10**uint256(DECIMALS)); // 1000000 tokens

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20(NAME, SYMBOL) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
}
