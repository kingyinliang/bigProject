<template>
  <!--<el-col v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">-->
  <el-col>
    <div class="main">
      <el-card class="searchCard" style="margin: 0">
        <el-row type="flex">
          <el-col>
            <form-header :formHeader="formHeader"></form-header>
          </el-col>
          <el-col style="width: 210px">
            <el-row style="float:right;margin-bottom: 13px">
              <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Packaging-index'})">返回</el-button>
              <el-button type="primary" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('verify:material:save:packing')">{{isRedact?'取消':'编辑'}}</el-button>
            </el-row>
            <el-row v-if="isRedact" style="float:right;">
              <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
              <el-button type="primary" size="small" @click="SubmitForm">提交</el-button>
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
        <el-tabs v-model="activeName" id="pkg">
          <el-tab-pane name="1">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark" :content="readyState === 'noPass'? '不通过':readyState === 'saved'? '已保存':readyState === 'submit' ? '已提交' : readyState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>准备时间</el-button>
              </el-tooltip>
            </span>
            <ready-times ref="readytimes" :isRedact="isRedact" :order="formHeader" @GetReadyStatus="GetReadyStatus"></ready-times>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label"  class="spanview">
              <el-tooltip class="item" effect="dark" :content="readyState === 'noPass'? '不通过':readyState === 'saved'? '已保存':readyState === 'submit' ? '已提交' : readyState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>人员</el-button>
              </el-tooltip>
            </span>
            <worker ref="workerref" :isRedact="isRedact" :order="formHeader"></worker>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" class="spanview">
              <el-button>异常记录</el-button>
            </span>
            <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label"  class="spanview">
              <el-tooltip class="item" effect="dark" :content="instorageState === 'noPass'? '不通过':instorageState === 'saved'? '已保存':instorageState === 'submit' ? '已提交' : instorageState === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>生产入库</el-button>
              </el-tooltip>
            </span>
            <in-storage ref="instorage" :isRedact="isRedact" :order="formHeader" :ratio="ratio" @GetinstorageState="GetinstorageState"></in-storage>
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label"  class="spanview">
              <el-tooltip class="item" effect="dark" :content="listbomStatus === 'noPass'? '不通过':listbomStatus === 'saved'? '已保存':listbomStatus === 'submit' ? '已提交' : listbomStatus === 'checked'? '通过':'未录入'" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip>
            </span>
            <list-bom ref="listbom" :isRedact="isRedact" :order="formHeader" @GetlistbomStatus="GetlistbomStatus"></list-bom>
          </el-tab-pane>
          <el-tab-pane name="6" v-if="formHeader.properties !== '二合一&礼盒产线'">
            <span slot="label" class="spanview">
              <el-button>待杀菌数量</el-button>
            </span>
            <germs ref="germs" :isRedact="isRedact"></germs>
          </el-tab-pane>
          <el-tab-pane name="7">
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
import { PACKAGING_API } from '@/api/api'
import { headanimation } from '@/net/validate'
import FormHeader from '@/views/components/formHeader'
import ReadyTimes from './common/readyTimes'
import Worker from '@/views/components/worker'
import ExcRecord from '@/views/components/excRecord'
import InStorage from './common/inStorage'
import ListBom from './common/listBom'
import Germs from './common/Germs'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'ProDataIn',
  data () {
    return {
      lodingS: false,
      isRedact: false,
      orderStatus: '',
      orderNo: '',
      productDate: '',
      workShop: '',
      formHeader: {
        productDate: ''
      },
      readyState: '',
      instorageState: '',
      listbomStatus: '',
      ratio: {
        basicUnit: '',
        productUnit: '',
        productUnitName: '',
        basicUnitName: '',
        ratio: undefined
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
    // 获取比例
    GetRatio () {
      this.$http(`${PACKAGING_API.PKGBILI_API}`, 'POST', {materialCode: this.formHeader.materialCode}).then(({data}) => {
        if (data.code === 0) {
          if (data.sme) {
            this.ratio.ratio = data.sme.ratio
            this.ratio.basicUnit = data.sme.basicUnit
            this.ratio.productUnit = data.sme.productUnit
            this.ratio.productUnitName = data.sme.productUnitName
            this.ratio.basicUnitName = data.sme.basicUnitName
          } else {
            this.$message.error('比例获取失败')
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取表头
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        workShop: this.workShop,
        productDate: this.productDate,
        orderNo: this.orderNo
      }).then(({data}) => {
        this.formHeader = data.list[0]
        this.orderStatus = data.list[0].orderStatus
        this.GetRatio()
        this.$refs.listbom.GetPot()
        this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
        this.$refs.workerref.GetTeam()
        if (this.orderStatus !== '已同步') {
          this.$refs.readytimes.Getpkgready(this.formHeader.orderId)
          this.$refs.workerref.GetUserList(this.formHeader.orderId)
          this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
          this.$refs.instorage.Getpkgin(this.formHeader)
          this.$refs.listbom.GetpkgSap(this.formHeader.orderId)
          this.$refs.germs.GetpkgGerms(this.formHeader.orderId)
          this.$refs.textrecord.GetText(this.formHeader.orderId)
        } else {
          this.$refs.listbom.GetpkgSap(this.formHeader.orderId, data)
        }
      })
    },
    // 修改表头
    UpdateformHeader (str, resolve) {
      this.formHeader.orderStatus = str
      this.formHeader.realOutput = this.$refs.instorage.countOutputNum / this.ratio.ratio
      this.formHeader.countOutputUnit = this.formHeader.properties === '二合一&礼盒产线' ? this.ratio.basicUnit : 'BOT'// 生产入库单位
      this.formHeader.countOutput = this.$refs.instorage.countOutputNum
      this.formHeader.countMan = this.$refs.workerref.countMan
      this.formHeader.expAllDate = this.$refs.excrecord.ExcNum
      this.formHeader.germs = this.$refs.excrecord.GermsNum
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
    SubmitForm () {
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.savedOrSubmitForm('submit')
      })
    },
    savedOrSubmitForm (str) {
      if (str === 'submit') {
        if (!this.$refs.readytimes.readyrul()) {
          return false
        }
        if (!this.$refs.workerref.userrul()) {
          return false
        }
        if (!this.$refs.excrecord.excrul()) {
          return false
        }
        if (!this.$refs.instorage.inrul()) {
          return false
        }
      }
      this.lodingS = true
      let that = this
      let net0 = new Promise((resolve, reject) => {
        this.UpdateformHeader(str, resolve)
      })
      let net1 = new Promise((resolve, reject) => {
        that.$refs.readytimes.UpdateReady(this.formHeader.orderId, str, resolve, reject)
      })
      let net2 = new Promise((resolve, reject) => {
        that.$refs.workerref.UpdateUser(str, resolve, reject)
      })
      let net3 = new Promise((resolve, reject) => {
        that.$refs.excrecord.saveOrSubmitExc(this.formHeader.orderId, str, resolve, reject)
      })
      let net4 = new Promise((resolve, reject) => {
        that.$refs.instorage.UpdateIn(this.formHeader.orderId, str, resolve, reject)
      })
      let net5 = new Promise((resolve, reject) => {
        that.$refs.listbom.UpdateSap(str, resolve, reject)
      })
      let net6 = new Promise((resolve, reject) => {
        that.$refs.germs.UpdateGerms(this.formHeader.orderId, str, resolve, reject)
      })
      let net7 = new Promise((resolve, reject) => {
        that.$refs.textrecord.UpdateText(this.formHeader, str, resolve, reject)
      })
      if (str === 'submit') {
        let net11 = Promise.all([net0, net1, net2, net3, net4, net5, net6, net7])
        net11.then(function () {
          let net8 = new Promise((resolve, reject) => {
            that.ProHours(resolve, reject)
          })
          let net9 = new Promise((resolve, reject) => {
            that.$refs.instorage.submitIn(resolve, reject)
          })
          let net10 = new Promise((resolve, reject) => {
            that.$refs.listbom.subSap(resolve, reject)
          })
          let net12 = Promise.all([net8, net9, net10])
          net12.then(() => {
            that.lodingS = false
            that.GetOrderList()
            that.$message.success('提交成功')
          }).catch(() => {
            that.$message.error('网络请求失败，请刷新重试')
            that.lodingS = false
          })
        }).catch(() => {
          that.$message.error('网络请求失败，请刷新重试')
          that.lodingS = false
        })
      } else {
        let net11 = Promise.all([net0, net1, net2, net3, net4, net5, net6, net7])
        net11.then(function () {
          that.lodingS = false
          that.GetOrderList()
          that.$message.success('保存成功')
        }).catch(() => {
          that.$message.error('网络请求失败，请刷新重试')
          that.lodingS = false
        })
      }
    },
    // 报工提交
    ProHours (resolve) {
      if (this.$refs.readytimes.readyDate.isCause === '1') {
        this.$refs.readytimes.readyDate.dayDinner === null ? this.$refs.readytimes.readyDate.dayDinner = this.$refs.readytimes.readyDate.dayDinner : this.$refs.readytimes.readyDate.dayDinner = this.$refs.readytimes.readyDate.dayDinner + ''
        this.$refs.readytimes.readyDate.midDinner === null ? this.$refs.readytimes.readyDate.midDinner = this.$refs.readytimes.readyDate.midDinner : this.$refs.readytimes.readyDate.midDinner = this.$refs.readytimes.readyDate.midDinner + ''
        this.$refs.readytimes.readyDate.nightDinner == null ? this.$refs.readytimes.readyDate.nightDinner = this.$refs.readytimes.readyDate.nightDinner : this.$refs.readytimes.readyDate.nightDinner = this.$refs.readytimes.readyDate.nightDinner + ''
      } else {
        this.$refs.readytimes.readyDate.dayDinner = this.$refs.readytimes.readyDate.dayDinner + ''
      }
      let data = [this.$refs.readytimes.readyDate, {countMan: this.$refs.workerref.countMan.toString()}, this.$refs.workerref.WorkerDate, this.$refs.excrecord.ExcDate, {
        orderId: this.formHeader.orderId,
        outputUnit: this.formHeader.outputUnit,
        realOutput: this.formHeader.realOutput + '',
        countOutput: this.$refs.instorage.countOutputNum.toString(),
        countOutputUnit: this.formHeader.properties === '二合一&礼盒产线' ? this.ratio.basicUnit : 'BOT',
        productDate: this.formHeader.productDate
      }]
      this.$http(`${PACKAGING_API.PKGSAVEFORM_API}`, 'POST', data).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 准备时间状态
    GetReadyStatus (status) {
      this.readyState = status
    },
    // 入库状态
    GetinstorageState (status) {
      this.instorageState = status
    },
    // 物料状态
    GetlistbomStatus (status) {
      this.listbomStatus = status
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
    ReadyTimes,
    Worker,
    ExcRecord,
    InStorage,
    ListBom,
    Germs,
    TextRecord
  }
}
</script>

<style scoped>

</style>
