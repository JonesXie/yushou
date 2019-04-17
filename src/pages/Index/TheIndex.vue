<template>
  <div class="pg_index">
    <div class="pi_h">
      <img src="@/assets/img/pg_index_scan.png" alt>
      <span>搜索商品</span>
      <img src="@/assets/img/pg_index_msg.png" alt>
    </div>
    <div class="pi_list">
      <van-tabs v-model="active" animated :line-height='0' title-active-color='#ea047b' color='#ea047b' title-inactive-color='#666' swipeable sticky :offset-top='40' :ellipsis='false'>
        <van-tab title="全部">
          <index-first></index-first>
        </van-tab>
        <van-tab title="美妆">内容 2</van-tab>
        <van-tab title="手机数码">内容 3</van-tab>
        <van-tab title="家居百货">内容 4</van-tab>
        <van-tab title="配饰">内容 4</van-tab>
        <van-tab title="配饰">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import IndexFirst from '../components/IndexFirst.vue'


export default {
  data() {
    return {
      active: 0,

    };
  },
  components: {
    IndexFirst,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$Color: #fa399d;
.pg_index {
  .pi_h {
    width: 100vw;
    height: 40PX;
    background: $Color;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 6PX;
    position: fixed;

    &::after {
      content: '';
      height: 100%;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      color: #999999;
      font-size: 14px;
      height: 28px;
      width: 270px;
      background: #fff;
      border-radius: 5px;
      padding: 7px 12px;
      box-sizing: border-box;
      margin: 0 19px;
      clear: both;
    }
    img {
      width: 23px;
      height: 23px;
      margin-left: 10px;
      margin-top: 3PX;
    }
    img:last-child {
      margin-left: 0;
    }
  }

  .pi_list {
     padding-top: 40PX;
  }
}
</style>


