import path from 'path';
import fs from 'fs';
import hre from 'hardhat';

async function main() {
  const outputDirectory = path.resolve(hre.config.paths.root, './output');

  let fullPaths = await hre.artifacts.getArtifactPaths();

  // filter contracts
  fullPaths = fullPaths.filter((fullPath) => fullPath.includes('artifacts/contracts'));

  await Promise.all(
    fullPaths.map(async (fullPath) => {
      // eslint-disable-next-line no-useless-escape
      const fileName = fullPath.replace(/^.*[\\\/]/, '');
      const destination = path.resolve(outputDirectory, fileName);

      await fs.promises.mkdir(path.dirname(destination), { recursive: true });
      await fs.promises.copyFile(fullPath, destination);
    }),
  );

  console.log('export done');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
