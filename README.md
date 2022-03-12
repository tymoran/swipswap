# SwipSwap

> 🚨 THIS IS A WORK IN PROGRESS, _DO NOT DEPLOY_ IN A REAL SETTING <br />
> 🚨 I REPEAT, _DO NOT DEPLOY_ IN A REAL SETTING <br />
> 🚨 THE AUTHOR BEARS NO RESPONSIBILITY WHATSOEVER ARISING FROM USING THIS PROJECT <br />

A complete DEX implementation in Solidity.

Initially based on [Uniswap V2](https://github.com/Uniswap/), this project has the long-term goal of providing a fully tested and community maintained DEX under an MIT license, a license more compatible with business.

For the time being, it is GPLv3 licensed as long as it contains UniswapV2 derived code.

`SwipSwapToken` is based on the [basic ERC20 token](https://github.com/tymoran/basic-erc20-token).

This project is _not affiliated_ with Uniswap or Uniswap's team.

Stack:

- Hardhat (build tool & local EVM)
- Ethers (web3 library)
- OpenZeppelin (base contracts)
- Chai (testing)

## Usage instructions

The swap contracts are located in `contracts/core`, and the router is in `contracts/periphery/SwipSwapRouter01.sol`.

### Compiling the contracts

Run `npm run compile` to compile the contracts and build the ABI, which will be located in `artifacts/contracts`.

### Running tests

Run `npm run test` to execute the test suite, located at the `test` folder.

### Deploying the contracts

Deployment is currently only possible on the local network backed by hardhat. See the section below.

### Connect to the local network

Run `npm run node` which will launch a local network backed by hardhat and display several test wallets. The first wallet is the owner of the contract by default.

After that, running `npm run deploy:local` will deploy the swap contracts on it and display the contract and owner addresses.

You can then connect to the local network on which the contract is deployed on `localhost:8545` and use your preferred web3 client with any of the wallets above.

## License

GPLv3 License

Copyright (c) 2022 tymoran - tymoran.com
