<!--
 * @Author: wuwf
 * @Date: 2019-10-23 16:29:16
 * @LastEditTime: 2019-10-29 16:59:46
 * @LastEditors: Please set LastEditors
 * @Description: 宣传册列表页
 -->

<template>
  <div class="home">
    <div class="header" :class="{'isPC':isPC}">
      <img class="logo" src="@/assets/images/logo.png" />
    </div>
    <!--全部-->
    <div class="page-infinite">
      <mescroll-vue
        ref="mescroll0"
        :down="getMescrollDown()"
        :up="getMescrollUp()"
        @init="mescrollInit"
      >
        <ul :class="{'isPC':isPC}" class="data-list" id="data-list">
          <li v-for="(item,i) in tab.list" @click="toDetails(item.id)" :key="i">
            <div class="goods-img-box">
              <img class="goods-img" @load="dealImg($event)" :src="item.coverImage+'?limit=350'" />
            </div>
            <div class="goods-name">
              <h3>{{item.title}}</h3>
              <h4>
                <span class="merchant">
                  <span
                    class="merchant-logo"
                    :style="`background: url(${item.logo}) no-repeat center 100%;background-size:auto 100%;`"
                  ></span>
                  <span class="merchant-name">{{item.merchantName}}</span>
                </span>
                <span class="shared">
                  <img class="shared-img" src="@/assets/images/shared.png" />
                  <span class="shared-count">{{item.sharedCount}}</span>
                </span>
              </h4>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import axios from "axios";
// import brochuresApi from "@/api/brochures";

export default {
  name: "brochures",
  components: {
    MescrollVue
  },
  head () {
    return {
      title:"3B互联"
    }
  },
  data() {
    return {
      bgUrl: "",
      isPC: false,
      merchantData: {},
      dataList: [],
      tab: { mescroll: null, list: this.dataList, isListInit: false } // 全部
    };
  },
  async asyncData({ app }) {
    // const { data } = await app.$axios.get('/api/Api/Brochure/HomeList')
    // return { title: data.title }
    // console.log(data);
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjAiLCJqdGkiOiI5ZWE3NjQwMWMwNDc0ZTA1ODBjY2U1NDMxNDJjMjFiMCIsIlVzZXJJRCI6IjAiLCJQaG9uZSI6IiIsIld4T3BlbklkIjoiIiwiV3hTZXNzaW9uS2V5IjoiIiwicm9sZSI6WyJDbGllbnRVc2VyIiwiIl0sIm5iZiI6MTU2NjM2MjE0NywiZXhwIjoyNTM0MDIyNzIwMDAsImlhdCI6MTU2NjM2MjE0NywiaXNzIjoiWVgiLCJhdWQiOiJZWF9MaXR0bGVfQVBQIn0.a2moARofKv9nMpwkbpCHFl184qJdCaxjF7fs7aMnZwXORJP6BQGKy_WjQ38V4PEgBuE8rOLYAQBcg0bdHdV10oYtRQw6crFcEhrUclqP0H8W9ZnWuAgZi5PNXCwkZ41k2eTFmtBdbRtsHVxq0WdS8qt4Lj1bFY_XzRhynPoOxC5hJPLWiwiF9BsMj46g-bVyBEjvtv307Gtu_zBgKaOJYsM2G7t_JFSBStPqkYUA3uCOl9L9ctyTz7hkIRxC6m_Rs3KlkRxQK4fRmXUL2-K7nzDYNLahaxvCc1-b7B5k85BHue0hsofJM7N5IIhEQcyRhPh7QWSbmEj6Fm-u9tW7SA"
    await app
      .$axios({
        type: "get",
        url: "/api/Brochure/HomeList",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer "+ token
        },
        params: { page: 1, pageSize: 15 }
      })
      .then(res => {
        console.log(res.data.data);
        let data = res.data;
        return {
          dataList: data
        };
        // try {
        //   let listData = [];
        //   console.log(data);
        //   for (let i = 0; i < data.data.length; i++) {
        //     console.log(data.data[i]);
        //     listData.push(data.data[i]);
        //   }
        //   successCallback && successCallback(listData);
        // } catch (e) {
        //   // 联网失败的回调
        //   errorCallback && errorCallback();
        // }
      });
  },
  // created() {},
  // created() {
  //   this.browserRedirect();
  // },
  // mounted() {
  //   this.browserRedirect();
  // },
  activated() {
    // document.querySelector(".mescroll").scrollTop = sessionStorage.domScrollTop;
  },
  methods: {
    toDetails(id) {
      this.$router.push({
        path: "/details",
        query: { id: id }
      });
      let domScrollTop = document.querySelector(".mescroll").scrollTop;
      sessionStorage.domScrollTop = domScrollTop;
    },
    //处理图片大小及位置
    dealImg(event) {
      let dom = event.currentTarget;
      let w = dom.offsetWidth,
        h = dom.offsetHeight;
      w < h ? (dom.style.width = "100%") : (dom.style.height = "100%");
    },
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
    srcollAddEventListener() {
      let _this = this;
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.tab.mescroll = mescroll;
    },
    getMescrollDown() {
      let isAuto = true; // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      };
    },
    getMescrollUp() {
      let emptyWarpId = "data-list";
      return {
        auto: false,
        callback: this.upCallback,
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: this.isPC ? 15 : 6 //每页数据条数,默认10
        }, // 上拉回调,此处可简写;
        noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>'
      };
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback(page, mescroll) {
      // 全部
      this.tab.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
      this.getListDataFromNet(
        page.num,
        page.size,
        curPageData => {
          mescroll.endSuccess(curPageData.length); // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab.list = []; // 如果是第一页需手动制空列表
          this.tab.list = this.tab.list.concat(curPageData); // 追加新数据
        },
        () => {
          if (page.num === 1) this.tab.isListInit = false;
          mescroll.endErr(); // 联网失败的回调,隐藏下拉刷新的状态
        }
      );
    },

    /* 联网加载列表数据 */
    async getListDataFromNet(
      pageNum,
      pageSize,
      successCallback,
      errorCallback
    ) {
      let params = {
        page: pageNum,
        // userId: this.userId,
        pageSize: pageSize
      };
      // let data = await brochuresApi.getBrochures(params);
      // let data = await axios.get(`/Api/Brochure/HomeList`)
      // await axios.get('/Api/Brochure/HomeList').then( res => {
      //   console.log(app)
      // });
      await this.$axios({
        type: "get",
        url: "/api/Brochure/HomeList",
        params: params
      }).then(res => {
        console.log(res.data.data);
        let data = res.data;

        try {
          let listData = [];
          console.log(data);
          for (let i = 0; i < data.data.length; i++) {
            console.log(data.data[i]);
            listData.push(data.data[i]);
          }
          successCallback && successCallback(listData);
        } catch (e) {
          // 联网失败的回调
          errorCallback && errorCallback();
        }
      });
    }
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #2b2b2b;
  .header {
    background-size: 100% 100%;
    height: 110px;
    padding: 22.5px 12px;
    line-height: 65px;
    overflow: hidden;
    position: relative;
    .title {
      color: #fff;
      font-size: 19px;
      font-weight: 800;
      height: 65px;
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 15px;
      line-height: 65px;
    }
  }
  .header.isPC {
    max-width: 825px;
    margin: auto;
    .logo {
      height: 30px;
    }
  }
  .logo {
    height: 45px;
    vertical-align: middle;
  }
  .header-logo {
    position: relative;
    width: 65px;
    height: 65px;
    display: inline-block;
    overflow: hidden;
  }
  .mint-cell {
    background: none;
  }
  .logo-img-span {
    overflow: hidden;
    width: 65px;
    height: 65px;
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
    width: 19px;
    height: 19px;
    border-radius: 50%;
  }
  .page-infinite {
    background: #f2f2f5;
    height: calc(100vh - 110px);
    padding: 11px 0 0;
    border-radius: 14px 14px 0 0;
    overflow: auto;
    .page-infinite-loading {
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
    }
    .page-infinite-loading div {
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .loading-icon {
      display: inline-block;
      position: relative;
      width: 28px;
      height: 28px;
      top: calc(50% - 14px);
      margin-right: 5px;
    }
  }
  .data-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      width: calc(50% - 10px);
      margin: 0 5px 11px 5px;
      overflow: hidden;
      background: #fff;
      border-radius: 6px 6px 0px 0px;
      align-content: space-between;
      position: relative;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .goods-name {
        line-height: 14px;
        padding: 10px 6px;
        color: #18181a;
        background: #fff;
        width: 100%;
      }
      h3 {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 38px;
        line-height: 18px;
        padding-top: 4px;
        font-size: 13px;
      }
      h4 {
        padding-top: 15px;
        color: #909099;
        overflow: hidden;
        // height: 50px;
        // line-height: 22px;
      }
      .merchant {
        float: left;
        height: 24px;
        line-height: 24px;
      }
      .merchant-logo {
        display: inline-block;
        width: 19px;
        height: 19px;
        border-radius: 50%;
        margin-right: 5px;
        vertical-align: super;
      }
      .merchant-name {
        display: inline-block;
        width: 60px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .shared {
        float: right;
        display: inline-block;
        height: 24px;
        line-height: 24px;
      }
      .shared-img {
        width: 14px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .goods-img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 170px;
      width: 100%;
      overflow: hidden;
    }
    .goods-img {
      vertical-align: middle;
    }
  }
  .data-list.isPC {
    max-width: 825px;
    margin: auto;
    align-content: space-between;
    li {
      width: calc(20% - 20px);
      .goods-img-box {
        height: 150px;
      }
      h3 {
        font-size: 10px;
      }
    }
  }
}
</style>

<style scoped>
/*以fixed的方式固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 120px;
  bottom: 0;
  height: auto;
}

.top-warp {
  z-index: 9990;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: white;
}
.top-warp .head {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.top-warp .head .btn-left {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px;
  line-height: 22px;
}
.top-warp .tip {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.top-warp .nav {
  text-align: center;
  height: 40px;
  background: white;
}
.top-warp .nav > div {
  display: inline-block;
  width: 22%;
  line-height: 36px;
  font-size: 14px;
}
.top-warp .nav .active {
  border-bottom: 1px solid #ff6990;
  color: #ff6990;
}

/*展示上拉加载的数据列表*/
.data-li {
  position: relative;
  height: 80px;
  padding: 10px 8px 10px 120px;
  border-bottom: 1px solid #eee;
}
.data-li .pd-img {
  position: absolute;
  left: 18px;
  top: 10px;
  width: 80px;
  height: 80px;
}
.data-li .pd-name {
  font-size: 13px;
  line-height: 20px;
  height: 40px;
  margin-bottom: 10px;
  overflow: hidden;
}
.data-li .pd-price {
  font-size: 13px;
  color: red;
}
.data-li .pd-sold {
  font-size: 12px;
  margin-top: 8px;
  color: gray;
}
</style>
