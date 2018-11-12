const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data: compiledFactory.bytecode})
  .send({from: accounts[0],gas: '1000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
})


describe('Campaigns',() => {
  it('deploys a factory and a campaign',() => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })

  it('marks caller as campaign manager',async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0],manager);
  })

  it('allows people to contribute money and marks them as approvers',async () => {
    await campaign.methods.contribute().send({from: accounts[1], value: '101'});
    const val = await campaign.methods.approvers(accounts[1]).call();
    assert(val);
  })

  it('requires a minimum contribution', async () => {
    try{
      await campaigns.methods.contribute().send({value: '90', from: accounts[2]});
      assert(false);
    }catch(err){
      assert(err);
    }

  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('manager request','1',accounts[3]).send({from: accounts[0], gas: '1000000'});
    const request = await campaign.methods.requests(0).call();
    assert.equal(accounts[3],request['recipient']);
  })

  //let balance = await web3.eth.getBalance(accountAddress)
  //balance = web3.utils.fromWei(balance,'ether')
  //balance = parseFloat(balance);
  //assert(balance > 104)
})
