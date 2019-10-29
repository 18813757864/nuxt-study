import setting from './index'
const fetch = setting()

export default {
  // 列表
  getList: fetch.bind(this, '/Api/Brochure/MerchantList', 'get'),
  getMerchant: fetch.bind(this, '/Api/HomeInfo/Merchant', 'get'),
}