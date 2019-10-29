/*
 * @Author: wuwf
 * @Date: 2019-10-23 17:10:49
 * @LastEditTime: 2019-10-23 17:28:37
 * @LastEditors: Please set LastEditors
 * @Description: 宣传册api
 */
import setting from './index'
const fetch = setting()

export default {
  // 列表
  getBrochures: fetch.bind(this, '/Api/Brochure/HomeList', 'get')
}