<!--
 * @Author: wuwf
 * @Date: 2019-10-28 15:46:41
 * @LastEditTime: 2019-10-31 09:42:21
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \3B-mobiled:\work\nuxt-study\pages\index.vue
 -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  created: function() {
    this.$router.push("/brochures"); // 页面加载时跳转
  }
};
</script>
<style>
/* 公共样式 */
html,
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}
#app {
  font-family: "PingFang SC", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
.swiper-pagination .swiper-pagination-current {
  font-size: 18px;
  font-weight: 800;
}
.mint-msgbox {
  max-width: 7rem;
}
</style>
