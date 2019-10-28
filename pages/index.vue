<!--
 * @Author: your name
 * @Date: 2019-10-28 15:46:41
 * @LastEditTime: 2019-10-28 16:06:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \3B-mobiled:\work\nuxt-study\pages\index.vue
 -->
<template>
  <div id="app">
    <header class="header">
      <!-- <the-header></the-header> -->
    </header>
    <!-- <router-view/> -->
    <!-- <the-footer></the-footer> -->
  </div>
</template>

<script>
// import TheHeader from '@/components/TheHeader.vue'
// import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'app',
  components: {
    // TheHeader,
    // TheFooter
  }
}
</script>
<style  lang="scss">
html{
  height: 100%;
  overflow: hidden;
  width: 100vw;
}
body{
  overflow: hidden;
  width: 100vw;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family:Noto Sans S Chinese 'Avenir', Helvetica, Arial, sans-serif;
  // height: 100vh;
  // overflow: auto;
}
.header{
  height: 104px;
  background:rgba(0,0,0,0.5);
  position: fixed;
  width: 100%;
  line-height: 104px;
  top: 0;
  left: 0;
  z-index: 1000;
}
#modal-center {
  .modal-dialog .modal-in {
    text-align: center;
    color: #303030;
    font-size: 14px;
  }
  .modal-header {
    padding: 5px 10px;
    border-bottom: none;
  }
  .modal-body {
    p {
      margin: 0;
    }
    .big-code {
      padding: 40px 0;
    }
  }
}
::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性

background-color:#f8f8f8;

}

::-webkit-scrollbar {//滚动条的宽度

width:9px;

height:9px;

}

::-webkit-scrollbar-thumb {//滚动条的设置

background-color:#dddddd;

background-clip:padding-box;

min-height:28px;

}

::-webkit-scrollbar-thumb:hover {

background-color:#bbb;

}
@media (min-width: 1200px){
  #app .container{
    padding: 0;
    max-width: 1200px;
  }
}
@media (max-width: 992px) {
  .header {
    background: none;
  }
}
</style>

