require('@nomiclabs/hardhat-waffle');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    }
  },

  solidity: {
    compilers: [
      {
        version: '0.5.16'
      },
      {
        version: '0.8.0'
      },
      {
        version: '0.6.6'
      }
    ],
    overrides: {
      'contracts/periphery/libraries/SwipSwapOracleLibrary.sol': {
        version: '0.5.16',
        settings: {}
      },
      'contracts/periphery/libraries/SwipSwapLibrary.sol': {
        version: '0.5.16',
        settings: {}
      },
      '@uniswap/lib/contracts/libraries/BitMath.sol': {
        version: '0.6.6',
        settings: {}
      },
      '@uniswap/lib/contracts/libraries/FixedPoint.sol': {
        version: '0.6.6',
        settings: {}
      },
      '@uniswap/lib/contracts/libraries/FullMath.sol': {
        version: '0.6.6',
        settings: {}
      }
      // 'contracts/periphery/SwipSwapRouter01.sol': {
      //   version: '0.6.6',
      //   settings: {}
      // },
      // 'contracts/periphery/SwipSwapRouter01.sol': {
      //   version: '0.6.6',
      //   settings: {}
      // },
      // 'contracts/periphery/SwipSwapRouter01.sol': {
      //   version: '0.6.6',
      //   settings: {}
      // }
    }
  }
};
