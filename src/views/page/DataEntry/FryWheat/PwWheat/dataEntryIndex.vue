<template>
  <el-col v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
    <div class="main">
      <el-card class="searchCard" style="margin: 0">
        <el-row type="flex">
          <el-col>
            <form-header :formHeader="formHeader"></form-header>
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
              <!-- <el-tooltip class="item" effect="dark" content="不通过" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip> -->
              <el-button>物料领用</el-button>
            </span>
            <pw-apply-materiel ref="pwapplymateriel" :isRedact="isRedact"></pw-apply-materiel>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="spanview">
              <el-button>工时录入</el-button>
            </span>
            <pw-time ref="excrecord" :isRedact="isRedact"></pw-time>
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
        productDate: ''
      },
      activeName: '1'
    }
  },
  mounted () {
    headanimation(this.$)
    this.orderNo = this.PkgorderNo
    this.productDate = this.PkgproductDate
    this.workShop = this.PkgworkShop
    this.GetOrderList()
  },
  methods: {
    // 获取表头
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        workShop: this.workShop,
        productDate: this.productDate,
        orderNo: this.orderNo
      }).then(({data}) => {
        this.formHeader = data.list[0]
        this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
        if (this.orderStatus !== '已同步') {
          this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
        }
      })
    },
    // 保存
    savedOrSubmitForm (str) {
      if (str === 'submit') {
        if (!this.$refs.excrecord.excrul()) {
          return false
        }
      }
      this.lodingS = true
      let that = this
      let net1 = new Promise((resolve, reject) => {
        that.$refs.excrecord.saveOrSubmitExc(str, resolve)
      })
      if (str === 'submit') {
        let net10 = Promise.all([net1])
        net10.then(function () {
          that.lodingS = false
          that.$message.success('提交成功')
        })
      } else {
        let net10 = Promise.all([net1])
        net10.then(function () {
          that.lodingS = false
          that.$message.success('保存成功')
        })
      }
    }
  },
  computed: {
    PkgworkShop: {
      get () { return this.$store.state.common.PkgworkShop },
      set (val) { this.$store.commit('common/updateWorkShop', val) }
    },
    PkgproductDate: {
      get () { return this.$store.state.common.PkgproductDate },
      set (val) { this.$store.commit('common/updateProductDate', val) }
    },
    PkgorderNo: {
      get () { return this.$store.state.common.PkgorderNo },
      set (val) { this.$store.commit('common/updateOrderNo', val) }
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
