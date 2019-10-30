const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

 const provider = new HDWalletProvider(
   'sure myth spoon hammer original impulse cigar jaguar flag female faint runway',
   'https://rinkeby.infura.io/v3/07e98a5872014c8a9f0541f2f95fc067'
 );
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: '0x' + compiledFactory.bytecode})
  .send({ from: accounts[0] });

  console.log(result.options.address);

};

deploy();
