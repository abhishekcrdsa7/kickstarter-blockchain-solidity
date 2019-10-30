import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x75F3D5303370FE7eAa98E0c7Eb5388330ff0d92d"
);

export default instance;
