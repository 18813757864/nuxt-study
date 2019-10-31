/*
 * @Author: your name
 * @Date: 2019-10-28 15:46:41
 * @LastEditTime: 2019-10-30 14:30:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \3B-mobiled:\work\nuxt-study\nuxt.config.js
 */

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title:'3B互联',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src:"/js/flexible.js", type: 'text/javascript', charset: 'utf-8'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/flexble.js', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/mint-ui', ssr: false }
  ],
  postcss: [
    require('postcss-pxtorem')({
      // remUnit: 37.5,
      propList: ['*'],
      rootValue: 37.5, //默认根目录字体大小(px)
      unitPrecision: 5, //保留小数位
      // selectorBlackList: [''], //过滤的类名
      replace: true, //默认直接替换属性
      mediaQuery: false,
      minPixelValue: 12, //所有小于设置的样式都不被转换
    }),

    require('autoprefixer')({
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    }),
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
    // ...
    modules: [
      '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: '', // baseURL  前置
    credentials: true,
  },
  proxy: {
    '/api': {
      target: 'https://api.3b.link/Api', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''  //将 /api 替换掉
      },
    },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
