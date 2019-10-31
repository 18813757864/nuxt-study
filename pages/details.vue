<!--
 * @Description: 详情页
 * @Author: Wuwf
 * @Date: 2019-09-23 15:54:45
 -->
<template>
  <div class="details">
    <span class="audio-box" @click="toggleAudio()">
      <img v-show="isplay" class="audio-img" :src="audioImgSrc" />
      <img v-show="!isplay" class="audio-img-stop" :src="audioImgSrc" />
      <audio id="audio" :src="detailData.music" controls="controls"></audio>
    </span>
    <span class="header-logo">
      <router-link :to="'/home/?userId='+ detailData.userId">
        <span class="logo-img-span">
          <img @load="dealImg($event)" :src="detailData.logo" />
        </span>
        <img class="logo-v" src="@/assets/images/approve.png" />
      </router-link>
    </span>
    <span class="watch-box">
      <div>
        <img class="watch-img" src="@/assets/images/watch.png" />
      </div>

      <span class="watch-num">{{detailData.viewedCount}}</span>
    </span>
    <div class="consult">
      <a @click="checkPhone">
        <img src="@/assets/images/teamwork.png" alt />
        <span>合作咨询</span>
      </a>
    </div>
    <div class="isPC">
      <div class="my-swp-box">
        <div v-for="(slide, key) in swiperList" :key="key">
          <div class="progressive">
            <img class="my-swp-img" :src="slide + '?limit=350'" />
            <img class="loading-img" src="@/assets/images/loading.png" alt />
            <img class="my-swp-img big-img" @load="bigImg($event)" :src="slide" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
// import detailsApi from "../../api/details";
// import homeApi from "../../api/home";
// import touch from "@/utils/touch";
import axios from "axios";
let timer = false;
export default {
  data() {
    return {
      audioImgSrc: require("@/assets/images/audio.png"),
      phone: "",
      id: this.$route.query.id,
      userId: "",
      title: "",
      detailData: {},
      current: 0,
      num: 0,
      isplay: false,
      moveDown: true,
      swiperList: [],
      isPC: false
    };
  },
  fetch({ app }) {
    // console.log(app);
  },
  async asyncData({ app }) {
    console.log('111111111111111222222222222222111111111111111111111');
    // console.log(app.$api.Authorization);
    console.log('111111111111111122222222222222222222222111111111111111111');
  const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAiLCJqdGkiOiI5ZWE3NjQwMWMwNDc0ZTA1ODBjY2U1NDMxNDJjMjFiMCIsIlVzZXJJRCI6IjAiLCJQaG9uZSI6IiIsIld4T3BlbklkIjoiIiwiV3hTZXNzaW9uS2V5IjoiIiwicm9sZSI6WyJDbGllbnRVc2VyIiwiIl0sIm5iZiI6MTU2NjM2MjE0NywiZXhwIjoyNTM0MDIyNzIwMDAsImlhdCI6MTU2NjM2MjE0NywiaXNzIjoiWVgiLCJhdWQiOiJZWF9MaXR0bGVfQVBQIn0.a2moARofKv9nMpwkbpCHFl184qJdCaxjF7fs7aMnZwXORJP6BQGKy_WjQ38V4PEgBuE8rOLYAQBcg0bdHdV10oYtRQw6crFcEhrUclqP0H8W9ZnWuAgZi5PNXCwkZ41k2eTFmtBdbRtsHVxq0WdS8qt4Lj1bFY_XzRhynPoOxC5hJPLWiwiF9BsMj46g-bVyBEjvtv307Gtu_zBgKaOJYsM2G7t_JFSBStPqkYUA3uCOl9L9ctyTz7hkIRxC6m_Rs3KlkRxQK4fRmXUL2-K7nzDYNLahaxvCc1-b7B5k85BHue0hsofJM7N5IIhEQcyRhPh7QWSbmEj6Fm-u9tW7SA";
    let data = await app.$axios({
      type: "get",
      url: "/api/Brochure/MerchantDetail",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token
      },
      params: { id: app.context.query.id }
    });
    return {
      detailData: data.data.data,
      swiperList: data.data.data.pages,
      userId: data.data.data.userId,
      title: data.data.data.title
    };
  },
  computed: {},
  head() {
    return {
      title: this.title
    };
  },
  mounted() {
    this.browserRedirect();
  },
  methods: {
    //判断设备
    browserRedirect() {
      let sUserAgent = navigator.userAgent.toLowerCase();
      let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      let bIsMidp = sUserAgent.match(/midp/i) == "midp";
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      let bIsAndroid = sUserAgent.match(/android/i) == "android";
      let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        this.isPC = false;
      } else {
        this.isPC = true;
      }
    },
    //处理图片大小及位置
    dealImg(event) {
      let dom = event.currentTarget;
      let w = dom.offsetWidth,
        h = dom.offsetHeight;
      w <= h ? (dom.style.width = "100%") : (dom.style.height = "100%");
    },
    //处理图片大小及位置
    bigImg(event) {
      let dom = event.currentTarget;
      dom.style.opacity = "1";
    },
    // 暂停、播放音乐
    toggleAudio() {
      let audio = document.getElementById("audio");
      if (this.isplay) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isplay = !this.isplay;
    },
    pushHistory() {
      let state = {
        title: "title",
        url: "#"
      };
      window.history.pushState(state, "title", "#");
    },
    // 电话
    checkPhone() {
      if (!this.phone) {
        if (this.isPC) {
          MessageBox.alert("暂无业务咨询电话", "提示");
        } else {
          window.addEventListener("popstate", this.checkReturn, true);
          MessageBox.alert("暂无业务咨询电话", "提示").then(action => {
            window.removeEventListener("popstate", this.checkReturn, true);
          });
        }
      } else if (this.isPC) {
        MessageBox.alert(this.phone, "请拨打电话");
      } else {
        window.location.href = "tel:" + this.phone;
      }
    },
    checkReturn(e) {
      this.pushHistory();
      MessageBox.close(false);
      window.removeEventListener("popstate", this.checkReturn, true);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  margin: 1px 0;
  overflow: hidden;
  .isPC {
    max-width: 525px;
    margin: auto;
    .my-swp-box {
      max-width: 525px;
      margin: auto;
      .progressive {
        position: relative;
      }
    }
    .my-swp-img {
      max-width: 525px;
      margin: auto;
    }
    .loading-img {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 1;
      animation: rotation 2s linear infinite;
    }
  }
  .big-img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 2;
  }
}
.my-swp-box {
  width: 100vw;
  // height: 100vh;
  overflow: hidden;
  // overflow-y: scroll;
  // line-height: 100vh;
  background: #ccc;
}
.my-swiper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.my-swp-img {
  height: auto;
  width: 100vw;
  vertical-align: middle;
  max-width: 525px;
  margin: auto;
}
.my-swp-silde {
  height: 100vh !important;
}
.swiper-pagination {
  position: fixed;
  width: 150px;
  right: 0;
  left: auto;
  font-size: 16px;
  z-index: 20;
  color: #fff;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.7);
  text-align: right;
  padding-right: 11px;
}
.swiper-button-next {
  width: 27px;
  position: fixed;
  bottom: 53px;
  left: calc(50vw - 13.5px);
  color: #fff;
  transform: rotateZ(-90deg);
  top: auto;
  z-index: 20;
  pointer-events: none;
}
.watch-box {
  position: fixed;
  width: 43px;
  height: 63px;
  right: 8px;
  bottom: 60px;
  display: inline-block;
  // overflow: hidden;
  text-align: center;
  color: #fff;
  font-size: 13px;
  z-index: 20;
  div {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    line-height: 41px;
    margin-bottom: 8px;
  }
  .watch-num {
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.7);
  }
  .watch-img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.audio-box {
  position: fixed;
  width: 49px;
  height: 49px;
  right: 5px;
  top: 15px;
  display: inline-block;
  overflow: hidden;
  z-index: 20;
  .audio-img {
    width: 49px;
    height: 49px;
    border-radius: 50%;
    border: 1px solid rgba(242, 242, 245, 1);
    transform: rotate(360deg);
    animation: rotation 8s linear infinite;
  }
  .audio-img-stop {
    width: 49px;
    height: 49px;
    border-radius: 50%;
    border: 1px solid rgba(242, 242, 245, 1);
  }
}
.header-logo {
  position: fixed;
  width: 49px;
  height: 49px;
  right: 5px;
  bottom: 152.5px;
  display: inline-block;
  overflow: hidden;
  z-index: 20;
  .logo-img-span {
    overflow: hidden;
    width: 49px;
    height: 49px;
    border-radius: 50%;
    border: 2px solid rgba(242, 242, 245, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-v {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(242, 242, 245, 1);
  }
}
.consult {
  width: 104px;
  height: 32px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 12px;
  bottom: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 32px;
  z-index: 20;
  a {
    color: #fff;
  }
  img {
    width: 21px;
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>