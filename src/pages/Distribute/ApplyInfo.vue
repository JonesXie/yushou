<template>
  <HeadFoot class="pg_ApplyInfo pg_applydistribute" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgad_head"></div>
      <div class="pgai_wrap">
        <ul class="pgai_content">
          <li class="input input_name van-hairline--bottom">
            <label for="name">姓名:</label>
            <input type="text" id="name" v-model="name" class="name_input" />
          </li>
          <li class="input input_phone van-hairline--bottom">
            <label for="phone">手机:</label>
            <input type="text" id="phone" @blur="validPhone" v-model="phone" class="phone_input" />
          </li>
          <li class="input input_name" @click="siteShow=true">
            <label>地址:</label>
            <em class="area">{{showArea}}</em>
            <van-icon class="area_icon" name="arrow-down" />
          </li>
          <li class="input input_site van-hairline--bottom">
            <input type="text" class="site_input" v-model="detailSite" placeholder="请输入详细地址" />
          </li>
          <li class="input_phone">
            <label for="phone">留言:</label>
          </li>
          <textarea class="text_area" v-model="remake"></textarea>
        </ul>
        <div class="pgai_tips" @click="readTips">
          <img v-if="selected" src="@/assets/img/ly_choosed.png" alt />
          <img v-else src="@/assets/img/ly_choose.png" alt />
          我已阅读预兽
          <a style="color:#fa4ba6">母婴门店</a>店长细则
        </div>
        <div class="next_btn" @click="submit">提交</div>
      </div>

      <!-- Area -->
      <van-popup v-model="siteShow" :close-on-click-overlay="false" position="bottom">
        <van-area
          @confirm="areaConfirm"
          @cancel="areaCancel"
          class="areaList"
          :area-list="areaList"
        />
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup, Icon, Area, Popup } from "vant";
import AreaList from "@/layout/area.js";
import { notNull } from "@/layout/methods.js";
import { saveUserDistributorApply } from "@/api/distribute.js";
export default {
  name: "ApplyInfo",
  data() {
    return {
      title: "信息填写",
      backPath: "", //返回路由，可删除
      siteShow: false,
      areaList: AreaList,
      selected: false,
      chooseArea: [],
      name: null,
      phone: null,
      detailSite: null,
      remake: null,
      type: 0, //0线下，1线上
      distributorId: null
    };
  },
  components: {
    HeadFoot,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Icon.name]: Icon,
    [Area.name]: Area,
    [Popup.name]: Popup
  },
  computed: {
    showArea() {
      let arr = this.chooseArea.map(v => v.name);
      return arr.join("/");
    }
  },
  methods: {
    readTips() {
      if (this.selected) {
        this.selected = false;
      } else {
        this.selected = true;
      }
    },
    areaConfirm(val) {
      this.chooseArea = val;
      this.siteShow = false;
    },
    areaCancel() {
      this.siteShow = false;
    },
    validPhone() {
      let reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
      if (this.phone === null) {
        this.$toast("手机号不能为空");
      } else if (!reg.test(this.phone)) {
        this.$toast("手机号格式不正确");
        this.phone = null;
      }
    },
    submit() {
      if (notNull(this.name)) {
        if (notNull(this.phone)) {
          if (this.chooseArea.length > 0) {
            if (notNull(this.detailSite)) {
              if (this.selected) {
                let _data = {
                  userName: this.name,
                  phone: this.phone,
                  commonAddress: this.detailSite,
                  type: this.type,
                  remake: this.remake,
                  province: this.chooseArea[0].name,
                  city: this.chooseArea[1].name,
                  district: this.chooseArea[2].name,
                  distributorId: this.distributorId
                };
                saveUserDistributorApply(_data).then(({ data }) => {
                  if (data.code === 1) {
                    this.$toast("申请成功，等待审核中");
                    setTimeout(() => {
                      this.$router.replace("/center");
                    }, 3000);
                  }
                });
              } else {
                this.$toast("请同意我们的协议");
              }
            } else {
              this.$toast("请填写详细住址");
            }
          } else {
            this.$toast("请选择你的住址");
          }
        } else {
          this.$toast("请填写手机号");
        }
      } else {
        this.$toast("请填写姓名");
      }
    }
  },
  mounted() {
    this.type = this.$route.params.type;
    if (notNull(this.$route.query.distributorId)) {
      this.distributorId = this.$route.query.distributorId;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_applydistribute {
  padding-top: 46px;
  .pgad_head {
    width: 100vw;
    height: 160px;
    background: url("~@/assets/img/distribution/pg_applydistribute_header.png");
    @include myBG;
  }
  .next_btn {
    width: 345px;
    height: 42px;
    line-height: 42px;
    color: #fff;
    box-sizing: border-box;
    font-size: 16px;
    background: $Color;
    border-radius: 5px;
    text-align: center;
    margin-top: 50px;
    margin-left: 15px;
    display: inline-block;
  }
}
.pgai_wrap {
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  padding-top: 146px;
  box-sizing: border-box;
  min-height: 100vh;
  .pgai_content {
    width: 345px;
    height: 350px;
    background: #fff;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0px 4px 6px 1px #cccccc59;
    padding: 17px 24px;
    box-sizing: border-box;
    .input {
      padding-bottom: 16px;
      width: 100%;
      display: flex;
      margin-bottom: 14px;
      label,
      .area,
      .area_icon {
        position: relative;
        top: 4px;
      }
      .area {
        flex: 8;
        color: #666;
        padding-left: 10px;
      }
      .area_icon {
        height: 9px;
        flex: 1;
      }

      input {
        flex: 1;
        padding-left: 10px;
        color: #666;
      }
    }
    .input_site {
      input {
        padding: 0;
      }
    }
    .text_area {
      width: 100%;
      height: 100px;
      border: 1px solid #efefef;
      box-sizing: border-box;
      margin-top: 10px;
    }
  }
  .pgai_tips {
    font-size: 11px;
    margin-left: 15px;
    margin-top: 15px;
    img {
      width: 14px;
      height: 14px;
      position: relative;
      top: -1px;
    }
  }
}
.areaList {
  width: 100vw;
}
</style>