const { ethers } = require('hardhat');

async function main() {
  const [owner] = await ethers.getSigners();

  const WETH = await ethers.getContractFactory('SwipSwapToken');
  const wETH = await WETH.deploy();

  const Factory = await ethers.getContractFactory('SwipSwapFactory');
  const factory = await Factory.deploy(owner.address);

  const Router = await ethers.getContractFactory('SwipSwapRouter01');
  const router = await Router.deploy(factory.address, wETH.address);

  console.log('WETH (fake) deployed to:', wETH.address);
  console.log('Factory deployed to:', factory.address);
  console.log('Router deployed to:', router.address);
  console.log('Owner:', owner.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
