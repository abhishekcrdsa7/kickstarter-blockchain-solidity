const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');
let output;
try {
  output = solc.compile(source, 1).contracts;
}catch(err) {
  console.log(err);
}

fs.ensureDirSync(buildPath); //ensures that the directory is present or it will create it

for(let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.substring(1) + '.json'),
    output[contract]
  );
}
