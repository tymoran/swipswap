const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deploy(contractName, ...args) {
  let Contract = await ethers.getContractFactory(contractName);
  return Contract.deploy(...args);
}

describe('SwipSwapPair', function () {
  let owner;
  let addr1;
  let addr2;

  let factory;
  let token0;
  let token1;

  let pairAddress;
  let pair;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    factory = await deploy('SwipSwapFactory', owner.address);

    token0 = await deploy('SwipSwapToken');
    token1 = await deploy('SwipSwapToken');

    await factory.createPair(token0.address, token1.address);

    pairAddress = await factory.getPair(token0.address, token1.address);
    pair = await ethers.getContractAt('SwipSwapPair', pairAddress);
  });

  describe('Pair reserves', () => {
    it('returns up to date reserves after minting', async function () {
      //
    });
  });
});
