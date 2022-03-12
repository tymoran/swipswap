const { expect } = require('chai');

async function deploy(contractName, ...args) {
  let Contract = await ethers.getContractFactory(contractName);
  return Contract.deploy(...args);
}

describe('SwipSwapFactory', function () {
  let owner;
  let addr1;
  let addr2;

  let factory;
  let token0;
  let token1;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    factory = await deploy('SwipSwapFactory', owner.address);
    token0 = await deploy('SwipSwapLP');
    token1 = await deploy('SwipSwapLP');
  });

  describe('Deployment', () => {
    it('should set feeToSetter address to the owner address', async function () {
      expect(await factory.feeToSetter()).to.equal(owner.address);
    });
  });

  describe('Create Pair', () => {
    it('should create a pair of two tokens', async function () {
      expect(await factory.allPairsLength()).to.equal(0);
      const transaction = await factory.createPair(
        token0.address,
        token1.address
      );
      await expect(transaction).to.emit(factory, 'PairCreated');
      expect(await factory.allPairsLength()).to.equal(1);
    });

    it('should allow to get the address of the created pair', async function () {
      const transaction = await factory.createPair(
        token0.address,
        token1.address
      );

      const pairAddress = await factory.getPair(token0.address, token1.address);

      await expect(transaction)
        .to.emit(factory, 'PairCreated')
        .withArgs(token0.address, token1.address, pairAddress, 1);
    });
  });
});
