pragma solidity =0.5.16;

interface ISwipSwapCallee {
    function SwipSwapCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external;
}
