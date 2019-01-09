<template>
  <el-col v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
    <div class="main">
      <el-card class="searchCard" style="margin: 0">
        <el-row type="flex">
          <el-col>
            <form-header :formHeader="formHeader" :isRedact="isRedact" @updateProductDateCallback='updateProductDate' ></form-header>
          </el-col>
          <el-col style="width: 210px">
            <el-row style="float:right;margin-bottom: 13px">
              <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-FryWheat-index'})">返回</el-button>
              <el-button type="primary" size="small" @click="isRedact = !isRedact">{{isRedact?'取消':'编辑'}}</el-button>
            </el-row>
            <el-row v-if="isRedact" style="float:right;">
              <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
              <el-button type="primary" size="small" @click="savedOrSubmitForm('submit')">提交</el-button>
            </el-row>
          </el-col>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px">
      <el-card class="tableCard">
        <div class="toggleSearchTop">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-tabs v-model="activeName" id="DaatTtabs">
          <el-tab-pane name="1">
            <span slot="label">
              <el-tooltip class="item" effect="dark" :content="this.appyMaterielState === 'noPass'? '不通过':this.appyMaterielState === 'saved'? '已保存':this.appyMaterielState === 'submit' ? '已提交' : this.appyMaterielState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip>
            </span>
            <pw-apply-materiel ref="pwapplymateriel" :isRedact="isRedact" :order="formHeader" @updateOrderInfo="updateOrderInfo" @setAppyMaterielState='setAppyMaterielState'></pw-apply-materiel>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="spanview">
              <el-button>工时录入</el-button>
            </span>
            <pw-time ref="pwtime" :isRedact="isRedact"></pw-time>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" class="spanview">
              <el-button>异常记录</el-button>
            </span>
            <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" class="spanview">
              <el-button>文本记录</el-button>
            </span>
            <text-record :isRedact="isRedact"></text-record>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </el-col>
</template>

<script>
import {PACKAGING_API} from '@/api/api'
import { headanimation } from '@/net/validate'
import FormHeader from '@/views/components/formHeader'
import ExcRecord from '@/views/components/excRecord'
import PwTime from '../common/pwTime'
import PwApplyMateriel from '../common/pwApplyMateriel'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'dataEntryIndex',
  data () {
    return {
      lodingS: false,
      isRedact: false,
      orderNo: '',
      productDate: '',
      workShop: '',
      formHeader: {
        orderNo: this.$store.state.common.FWorderNo,
        orderId: this.$store.state.common.FWorderId,
        factory: this.$store.state.common.FWfactoryid,
        factoryName: this.$store.state.common.FWfactoryName,
        workShop: this.$store.state.common.FWworkShop,
        workShopName: this.$store.state.common.FWworkShopName,
        productLine: 'BD5B3295DC104413B94AA18B61ACF539',
        productLineName: '脱皮车间',
        // yyyy-MM-dd
        productDate: `${this.$store.state.common.FWproductDate.substring(0, 4)}-${this.$store.state.common.FWproductDate.substring(4, 6)}-${this.$store.state.common.FWproductDate.substring(6, 8)}`
      },
      activeName: '1',
      appyMaterielState: ''
    }
  },
  mounted () {
    headanimation(this.$)
    this.orderNo = this.FWorderNo
    // yyyyMMdd
    this.productDate = this.FWproductDate
    this.workShop = this.FWworkShop
    this.GetOrderList()
  },
  methods: {
    // 获取表头
    GetOrderList () {
      if (this.orderNo) {
        // 有订单号
        this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
          workShop: this.workShop,
          productDate: this.productDate,
          orderNo: this.orderNo
        }).then(({data}) => {
          // 2018-06-27
          this.formHeader = data.list[0]
        })
      }
    },
    // 保存
    savedOrSubmitForm (str) {
      if (str === 'submit') {
        if (!this.$refs.excrecord.excrul()) {
          return false
        }
        if (!this.$refs.pwapplymateriel.validate()) {
          return false
        }
      }
      this.lodingS = true
      let that = this
      let net1 = new Promise((resolve, reject) => {
        that.$refs.excrecord.saveOrSubmitExc(str, resolve)
      })
      let net2 = new Promise((resolve, reject) => {
        that.$refs.pwapplymateriel.saveOrSubmit(str, resolve)
      })
      if (str === 'submit') {
        let net10 = Promise.all([net1, net2])
        net10.then(function () {
          that.lodingS = false
          that.$message.success('提交成功')
        })
      } else {
        let net10 = Promise.all([net1, net2])
        net10.then(function () {
          that.lodingS = false
          that.$message.success('保存成功')
        })
      }
    },
    updateOrderInfo: function (orderInfo) {
      // 申请订单之后，订单号回写
      this.orderNo = orderInfo.orderNo
      // 更新common store
      this.FWorderNo = orderInfo.orderNo
      this.FWorderId = orderInfo.orderId
    },
    updateProductDate: function (dataStr) {
      let data = dataStr.replace(/-/g, '')
      this.productDate = data
      // 不需要更新common store
      // this.FWproductDate = data
    },
    setAppyMaterielState: function (state) {
      this.appyMaterielState = state
    }
  },
  watch: {
    'orderNo' (n, o) {
      // 申请订单之后触发全局刷新
      this.GetOrderList()
    }
  },
  computed: {
    FWproductDate: {
      get () { return this.$store.state.common.FWproductDate },
      set (val) { this.$store.commit('common/updateFWProductDate', val) }
    },
    FWorderNo: {
      get () { return this.$store.state.common.FWorderNo },
      set (val) { this.$store.commit('common/updateFWOrderNo', val) }
    },
    FWorderId: {
      get () { return this.$store.state.common.FWorderId },
      set (val) { this.$store.commit('common/updateFWorderId', val) }
    },
    FWworkShop: {
      get () { return this.$store.state.common.FWworkShop },
      set (val) { this.$store.commit('common/updateFWWorkShop', val) }
    }
  },
  components: {
    FormHeader,
    ExcRecord,
    TextRecord,
    PwTime,
    PwApplyMateriel
  }
}
</script>

<style lang="scss">
#DaatTtabs{
  h3{
    font-size: 16px;
    font-weight: bold;
    float: left;
  }
  border-top: 1px solid #e8e8e8;
  span{
    .el-button{
      background-color: white!important;
      font-size: 16px;
      padding: 0;
      border: none;
    }
  }
  .el-tabs__item{
    height: 50px;
    line-height: 50px;
  }
  table{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .notNull{
    color: red;
  }
  .el-table .warning-row:hover>td{
    background: #bbbbbb!important;
    background-color: #bbbbbb!important;
  }
  .el-table .warning-row>td{
    background: #bbbbbb!important;
    background-color: #bbbbbb!important;
  }
  // .el-input--small .el-input__inner { height: 22px; line-height: 22px; }
}
.required{
  position: relative;
  padding-left: 15px;
  .reqI{
    color: red;
    position: absolute;
    left: 0;
    line-height: 32px;
  }
}
</style>
