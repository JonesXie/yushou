<template>
  <HeadFoot class="pg_site" :Title="title" :backPath="backPath">
    <template #content>
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="pgs_ul">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <div class="pgs_ul_wrap" v-for="(v,i) in dataList" :key="i">
            <van-swipe-cell
              :right-width="52"
              :class="['pgs_li' ,v.isDefault ===0 ? '':'default']"
              @click="delData"
            >
              <div class="li_content" @click="chooseSite(i)">
                <p class="li_content_info">
                  <span>{{v.name}}</span>
                  <em>{{v.phone}}</em>
                </p>
                <p class="li_content_site">{{v.area}}&nbsp;&nbsp;{{v.address}}</p>
              </div>
              <p slot="right" @click="delIndex(i)">
                <span>删除</span>
              </p>
            </van-swipe-cell>
            <div class="siteWrap">
              <router-link :to="{path:'/setsite',query:{id:v.id}}" class="siteEditor">编辑</router-link>
              <em class="siteDefault" v-if="v.isDefault !==1" @click="changeDefault(v.id)">默认</em>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
      <router-link to="/setsite" class="pgs_add">新增地址</router-link>
    </template>
  </HeadFoot>
</template>

<script>
import { SwipeCell, List, PullRefresh } from "vant";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { findAddress, doDefaultAddress, doDelAddress } from "@/api/center.js";
// import { notNull } from "@/layout/methods.js";
export default {
  name: "MySite",
  data() {
    return {
      out: true,
      delSite: 0,
      title: "我的地址",
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      backPath: "/center",
      canClick: false
    };
  },
  components: {
    HeadFoot,
    [SwipeCell.name]: SwipeCell,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    delData(clickPosition) {
      if (clickPosition === "right") {
        let data = {
          addressId: this.dataList[this.delSite].id
        };
        doDelAddress(data).then(({ data }) => {
          this.$notify(data.msg);
          this.onInit();
        });
      }
    },
    chooseSite(index) {
      if (this.canClick) {
        let _data = {
          addressPhone: this.dataList[index].phone,
          address: this.dataList[index].address,
          addressName: this.dataList[index].name,
          addressArea: this.dataList[index].area,
          addressId: this.dataList[index].id
        };
        this.$store.dispatch("setSitedata", _data);
        this.$store.dispatch("setTosite", false);
        this.$store.dispatch("setFromsite", true);
        this.$router.push("/orderconfirm");
      }
    },
    delIndex(index) {
      this.delSite = index;
    },
    changeDefault(id) {
      let _data = {
        addressId: id
      };
      doDefaultAddress(_data).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "修改成功") {
          this.onInit();
        }
      });
    },

    onRefresh() {
      this.onInit(true);
    },
    onLoad() {
      this.onInit(false, false);
    },
    onInit(reFresh = false, isInit = true) {
      if (isInit) {
        this.curPage = 1;
        this.finished = false;
      }
      let _data = {
        page: this.curPage,
        pageSize: 10
      };
      if (this.noLimit) {
        this.noLimit = false;
        findAddress(_data).then(({ data }) => {
          let getList = data.data;
          this.loading = false; //list 加载动画
          this.noLimit = true;
          //赋值
          if (isInit) {
            this.dataList = getList;
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            this.curPage = this.curPage + 1;
            if (getList.length === 0) {
              this.finished = true;
            }
          }
          if (reFresh) {
            this.$toast("刷新成功");
            this.isRefresh = false;
          }
        });
      }
    }
  },
  mounted() {
    this.onInit();
    if (this.$store.state.isOrder.toSite) {
      this.backPath = "/orderconfirm";
      this.canClick = true;
    }
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_site {
  .pgs_ul {
    width: 100vw;
    overflow: hidden;
    padding-top: 46px;
    box-sizing: border-box;
    padding-bottom: 80px;
    min-height: 100vh;
    .pgs_li {
      background: #fff;
      width: 345px;
      box-sizing: border-box;
      margin: 7px auto;
      border-radius: 5px;
      position: relative;
      &.default::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        background: url("~@/assets/img/components/pg_mysite_default.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top top;
      }
    }
    .li_content {
      padding: 20px;
      color: #666;
      .li_content_info {
        font-size: 14px;
        overflow: hidden;
        em {
          float: right;
        }
      }
      .li_content_site {
        font-size: 13px;
        line-height: 19px;
        margin-top: 14px;
      }
    }
    & /deep/ .van-swipe-cell__right {
      background: #d8404f;
      width: 52px;
      font-size: 14px;
      color: #fff;
      p {
        height: 100%;
        width: 100%;
        display: inline-block;
        overflow: hidden;
      }
      span {
        display: inline-block;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .pgs_add {
    width: 345px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: $Color;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-left: 14px;
    position: fixed;
    bottom: 38px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
.pg_site {
  .pgs_ul_wrap {
    position: relative;
    padding-bottom: 10px;
    .siteWrap {
      position: absolute;
      bottom: 10px;
      left: 0;
      color: #fff;
      font-size: 12px;
      width: 100%;
      text-align: center;
      .siteEditor {
        display: inline-block;
        padding: 5px 10px;
        background: $Color;
        border-radius: 14px;
        color: #fff;
      }
      .siteDefault {
        display: inline-block;
        padding: 5px 10px;
        background: #eac215;
        border-radius: 14px;
        margin-left: 50px;
      }
    }
  }
  .noData {
    width: 100%;
    height: calc(100vh - 120px);
    text-align: center;
    position: absolute;
    top: 120px;
    img {
      position: absolute;
      top: 40%;
      transform: translate(-50%, -50%);
      left: 50%;
      display: inline-block;
      width: 227px;
      height: 200px;
    }
  }
}
</style>