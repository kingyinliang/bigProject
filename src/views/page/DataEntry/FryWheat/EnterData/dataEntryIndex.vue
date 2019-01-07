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
              <el-button type="primary" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('verify:material:save:packing')">{{isRedact?'取消':'编辑'}}</el-button>
            </el-row>
            <el-row v-if="isRedact" style="float:right;">
              <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
              <el-button type="primary" size="small" @click="savedOrSubmitForm('submit')">提交</el-button>
            </el-row>
            <el-row style="position: absolute;right: 0;top: 100px;">
              <div>订单状态：<span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span></div>
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
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark" content="不通过" placement="top-start">
                <el-button>准备时间</el-button>
              </el-tooltip>
            </span>
            <ready-time ref="readytime" :isRedact="isRedact" :formHeader="formHeader"></ready-time>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label"  class="spanview">
              <el-tooltip class="item" effect="dark" content="不通过" placement="top-start">
                <el-button>人员</el-button>
              </el-tooltip>
            </span>
            <worker ref="workerref" :isRedact="isRedact"></worker>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" class="spanview">
              <el-button>异常记录</el-button>
            </span>
            <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark" :content="inStorageState === 'noPass'? '不通过':inStorageState === 'saved'? '已保存':inStorageState === 'submit' ? '已提交' : inStorageState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>生产入库</el-button>
              </el-tooltip>
            </span>
            <in-stock ref="instock" :isRedact="isRedact" :order="formHeader" @setInStorageState='setInStorageState'></in-stock>
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark"  :content="applyMaterielState === 'noPass'? '不通过':applyMaterielState === 'saved'? '已保存':applyMaterielState === 'submit' ? '已提交' : applyMaterielState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip>
            </span>
            <apply-materiel ref="applymateriel" :isRedact="isRedact" :order="formHeader" @setApplyMaterielState='setApplyMaterielState'></apply-materiel>
          </el-tab-pane>
          <el-tab-pane name="6">
            <span slot="label" class="spanview">
              <el-button>文本记录</el-button>
            </span>
            <text-record ref="textrecord" :isRedact="isRedact"></text-record>
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
import ReadyTime from '../common/readyTime'
import Worker from '@/views/components/worker'
import ExcRecord from '@/views/components/excRecord'
import InStock from '../common/inStock'
import ApplyMateriel from '../common/applyMateriel'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'dataEntryIndex',
  data () {
    return {
      orderStatus: '',
      lodingS: false,
      isRedact: false,
      orderNo: '',
      productDate: '',
      workShop: '',
      formHeader: {
        productDate: ''
      },
      activeName: '1',
      // 生产入库状态
      inStorageState: '',
      // 物料申请状态
      applyMaterielState: ''
    }
  },
  mounted () {
    headanimation(this.$)
    this.orderNo = this.FWorderNo
    this.productDate = this.FWproductDate
    this.workShop = this.FWworkShop
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
        this.orderStatus = data.list[0].orderStatus
        this.$refs.readytime.GetMachine(this.formHeader.productLine)
        this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
        this.$refs.workerref.GetTeam(this.formHeader.workShop)
        if (this.orderStatus !== '已同步') {
          this.$refs.readytime.GetReadyList(this.formHeader.orderId)
          this.$refs.workerref.GetUserList(this.formHeader.orderId)
          this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
          this.$refs.textrecord.GetText(this.formHeader.orderId)
        }
      })
    },
    // 修改表头
    UpdateformHeader (str, resolve) {
      this.formHeader.orderStatus = str
      this.formHeader.realOutput = null
      this.formHeader.countOutputUnit = null
      this.formHeader.countOutput = null
      this.formHeader.countMan = null
      this.formHeader.expAllDate = null
      this.formHeader.germs = null
      if (str !== 'saved') {
        this.formHeader.operator = `${this.realName}(${this.userName})`
        this.formHeader.operDate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDay().toString()
      }
      this.$http(`${PACKAGING_API.PKGORDERUPDATE_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error('保存表头' + data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 保存 or 提交
    savedOrSubmitForm (str) {
      if (str === 'submit') {
        if (!this.$refs.workerref.excrul()) {
          return false
        }
        if (!this.$refs.excrecord.userrul()) {
          return false
        }
      }
      this.lodingS = true
      let that = this
      let net0 = new Promise((resolve, reject) => {
        this.UpdateformHeader(str, resolve)
      })
      let net1 = new Promise((resolve, reject) => {
        that.$refs.readytime.UpdateReady(str, resolve)
      })
      let net2 = new Promise((resolve, reject) => {
        that.$refs.readytime.UpdateMachine(str, resolve)
      })
      let net3 = new Promise((resolve, reject) => {
        that.$refs.workerref.UpdateUser(str, resolve)
      })
      let net4 = new Promise((resolve, reject) => {
        that.$refs.excrecord.saveOrSubmitExc(this.formHeader.orderId, str, resolve)
      })
      let net7 = new Promise((resolve, reject) => {
        that.$refs.textrecord.UpdateText(this.formHeader, str, resolve)
      })
      if (str === 'submit') {
        let net10 = Promise.all([net0, net1, net2, net3, net4, net7])
        net10.then(function () {
          that.lodingS = false
          that.GetOrderList()
          that.$message.success('提交成功')
        })
      } else {
        let net10 = Promise.all([net0, net1, net2, net3, net4, net7])
        net10.then(function () {
          that.lodingS = false
          that.GetOrderList()
          that.$message.success('保存成功')
        })
      }
    },
    // 入库状态
    setInStorageState (status) {
      this.inStorageState = status
    },
    // 物料状态
    setApplyMaterielState (status) {
      this.applyMaterielState = status
    }
  },
  computed: {
    FWworkShop: {
      get () { return this.$store.state.common.FWworkShop },
      set (val) { this.$store.commit('common/updateFWWorkShop', val) }
    },
    FWproductDate: {
      get () { return this.$store.state.common.FWproductDate },
      set (val) { this.$store.commit('common/updateFWProductDate', val) }
    },
    FWorderNo: {
      get () { return this.$store.state.common.FWorderNo },
      set (val) { this.$store.commit('common/updateFWOrderNo', val) }
    }
  },
  components: {
    FormHeader,
    ReadyTime,
    Worker,
    ExcRecord,
    TextRecord,
    InStock,
    ApplyMateriel
  }
}
</script>

<style lang="scss">
</style>
