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
      let reserves = await pair.getReserves();

      expect(reserves[0]).to.equal(0);
      expect(reserves[1]).to.equal(0);

      const token0Amount = 10000;
      const token1Amount = 10000;
      const pairTokenAmount = 9000;

      await token0.transfer(pair.address, 10000);
      await token1.transfer(pair.address, 10000);

      let balance = await pair.balanceOf(owner.address);

      expect(balance).to.equal(0);
      await pair.mint(owner.address);
      balance = await pair.balanceOf(owner.address);
      expect(balance).to.equal(pairTokenAmount);

      reserves = await pair.getReserves();
      expect(reserves[0]).to.equal(token0Amount);
      expect(reserves[1]).to.equal(token1Amount);
    });

    it('returns the tokens to the owner after burning', async function () {
      let reserves = await pair.getReserves();

      expect(reserves[0]).to.equal(0);
      expect(reserves[1]).to.equal(0);

      const token0Amount = 10000;
      const token1Amount = 10000;
      const pairTokenAmount = 9000;

      let originalToken0Balance = await token0.balanceOf(owner.address);
      let originalToken1Balance = await token1.balanceOf(owner.address);

      await token0.transfer(pair.address, token0Amount);
      await token1.transfer(pair.address, token1Amount);

      let balance = await pair.balanceOf(owner.address);

      expect(balance).to.equal(0);
      await pair.mint(owner.address);
      balance = await pair.balanceOf(owner.address);
      expect(balance).to.equal(pairTokenAmount);

      reserves = await pair.getReserves();
      expect(reserves[0]).to.equal(token0Amount);
      expect(reserves[1]).to.equal(token1Amount);

      await pair.transfer(pair.address, pairTokenAmount);
      await pair.burn(owner.address);
      balance = await pair.balanceOf(owner.address);
      expect(balance).to.equal(0);

      let token0Balance = await token0.balanceOf(owner.address);
      let token1Balance = await token1.balanceOf(owner.address);

      expect(token0Balance).to.equal(originalToken0Balance - 1000);
      expect(token1Balance).to.equal(originalToken1Balance - 1000);
    });
  });
});
