import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xf288c9614F51e6eD60CC507c8624212ed84613e6"
);

export default instance;
