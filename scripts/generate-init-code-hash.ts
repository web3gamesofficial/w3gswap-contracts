import { artifacts, ethers } from 'hardhat';

const UniswapV2Pair = artifacts.readArtifactSync('UniswapV2Pair');

async function main() {
  const byteCodeHash = ethers.utils.solidityKeccak256(['bytes'], [UniswapV2Pair.bytecode]);
  console.log('byteCodeHash', byteCodeHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
