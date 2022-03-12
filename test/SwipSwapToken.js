const { expect } = require('chai');

describe('SwipSwap Token', function () {
  let Token;
  let token;

  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory('SwipSwapToken');
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await Token.deploy();
  });

  describe('Deployment', () => {
    it('should assign the total supply of tokens to the owner on deployment', async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('should transfer tokens from the owner to another address', async () => {
      await token.transfer(addr1.address, 10);
      expect(await token.balanceOf(addr1.address)).to.equal(10);
    });

    it('should transfer tokens from an address to another one', async () => {
      await token.transfer(addr1.address, 10);

      await token.connect(addr1).transfer(addr2.address, 10);
      expect(await token.balanceOf(addr2.address)).to.equal(10);
      expect(await token.balanceOf(addr1.address)).to.equal(0);
    });

    it('should fail to transfer tokens from an address with an unsufficient balance', async () => {
      await token.transfer(addr1.address, 10);

      await expect(
        token.connect(addr1).transfer(addr2.address, 20)
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

      expect(await token.balanceOf(addr1.address)).to.equal(10);
      expect(await token.balanceOf(addr2.address)).to.equal(0);
    });
  });
});
