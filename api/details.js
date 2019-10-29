import setting from './index'
const fetch = setting()

export default {
  // 列表
  getMerchantDetail: fetch.bind(this, '/Api/Brochure/MerchantDetail', 'get')
}