import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x340A74DCf0b5a35f9eEd3dcEA5Be7b53b68c5Ed2"
);

export default instance;
