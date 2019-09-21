<template>
  <div class="header_main">
    <el-card class="searchCard newCard" style="margin-bottom: 5px">
      <el-row type="flex">
        <el-col>
          <form-head :formHeader="formHeader" :isRedact="isRedact"></form-head>
        </el-col>
        <el-col style="width:244px; position:relative" class="clearfix">
          <el-row class="clearfix">
            <div style="float:right; line-height:31px;font-size: 14px">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </el-row>
          <el-row style="text-align:right;position: absolute;bottom: 10px;right: 0;">
            <template style="float:right; margin-left: 10px;">
              <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('bottle:inStorage:mySaveOrUpdate')">{{isRedact?'取消':'编辑'}}</el-button>
            </template>
            <template v-if="isRedact" style="float:right; margin-left: 10px;">
              <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('bottle:inStorage:mySaveOrUpdate')">保存</el-button>
              <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('bottle:inStorage:submit')">提交</el-button>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs  @tab-click='tabClick' ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">
          <el-tooltip class="item" effect="dark" :content="readyState === 'noPass'? '不通过':readyState === 'saved'? '已保存':readyState === 'submit' ? '已提交' : readyState === 'checked'? '通过':'未录入'" placement="top-start">
            <el-button :style="{'color': readyState === 'noPass'? 'red' : ''}">准备时间</el-button>
          </el-tooltip>
        </span>
        <ready-times ref="readytimes" :isRedact="isRedact" :formHeader="formHeader" :productShift="productShift" @SetReadyStatus="SetReadyStatus"></ready-times>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">
          <el-tooltip class="item" effect="dark" :content="readyState === 'noPass'? '不通过':readyState === 'saved'? '已保存':readyState === 'submit' ? '已提交' : readyState === 'checked'? '通过':'未录入'" placement="top-start">
            <el-button :style="{'color': readyState === 'noPass'? 'red' : ''}">人员</el-button>
          </el-tooltip>
        </span>
        <worker ref="workerref" :isRedact="isRedact" :order="formHeader" :Attendance="Attendance" :att="true"></worker>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label" class="spanview">投胚记录</span>
        <record ref="record" :isRedact="isRedact" :Supplier="Supplier"></record>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span slot="label" class="spanview">异常记录</span>
        <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
      </el-tab-pane>
      <el-tab-pane name="5">
        <span slot="label" class="spanview">
          <el-tooltip class="item" effect="dark" :content="inStorageState === 'noPass'? '不通过':inStorageState === 'saved'? '已保存':inStorageState === 'submit' ? '已提交' : inStorageState === 'checked'? '通过':'未录入'" placement="top-start">
            <el-button :style="{'color': inStorageState === 'noPass'? 'red' : ''}">生产入库</el-button>
          </el-tooltip>
        </span>
        <in-storage ref="instorage" :isRedact="isRedact" :productShift="productShift" @setInStorageState='setInStorageState' @SetMeaterielNum="SetMeaterielNum"></in-storage>
      </el-tab-pane>
      <el-tab-pane name="6">
        <span slot="label" class="spanview">
          <el-tooltip class="item" effect="dark"  :content="applyMaterielState === 'noPass'? '不通过':applyMaterielState === 'saved'? '已保存':applyMaterielState === 'submit' ? '已提交' : applyMaterielState === 'checked'? '通过':'未录入'" placement="top-start">
            <el-button :style="{'color': applyMaterielState === 'noPass'? 'red' : ''}">物料领用</el-button>
          </el-tooltip>
        </span>
        <material ref="material" :isRedact="isRedact" :Supplier="Supplier" @setApplyMaterielState='setApplyMaterielState'></material>
      </el-tab-pane>
      <el-tab-pane name="7">
        <span slot="label" class="spanview">文本记录</span>
        <text-record ref="textrecord" :isRedact="isRedact"></text-record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
import Worker from '@/views/components/worker'
import ReadyTimes from './ReadyTimes'
import Record from './Record'
import Material from './Material'
import InStorage from './InStorage'
import { BOTTLE_API, SYSTEMSETUP_API } from '@/api/api'
export default {
  name: 'detail',
  data () {
    return {
      isRedact: false,
      orderStatus: '',
      activeName: '1',
      formHeader: {},
      readyState: '',
      inStorageState: '',
      applyMaterielState: '',
      Supplier: [],
      productShift: [],
      Attendance: []
    }
  },
  mounted () {
    this.getHead()
  },
  methods: {
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    // 准备时间状态
    SetReadyStatus (status) {
      this.readyState = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    // 入库状态
    setInStorageState (status) {
      this.inStorageState = status
      // 强制刷新tabs
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    // 物料状态
    setApplyMaterielState (status) {
      this.applyMaterielState = status
      // 强制刷新tabs
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    SetMeaterielNum (num) {
      // this.$refs.outtech.GetsaltWaterUsed(num)
      this.$refs.material.setNum(num)
    },
    // 获取表头
    getHead () {
      this.isRedact = false
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId,
        type: 'production'
      }).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.headInfo
          this.orderStatus = data.headInfo.orderStatus
          this.GetSupplier(this.formHeader.factory) // 供应商
          this.GetProductShift(this.formHeader.factory) // 生产班次
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          this.$refs.workerref.GetTeam(this.formHeader.workShop, this.formHeader.factory)
          this.$refs.workerref.getTree(this.formHeader.factory)
          this.$refs.workerref.GetProductShift(this.formHeader.factory)
          this.$refs.workerref.GetMaterails(this.formHeader.productLine, this.formHeader.productDate)
          if (this.formHeader.orderStatus) {
            this.$refs.readytimes.getDataList()
            this.$refs.record.getDataList()
            this.$refs.instorage.getDataList()
            this.$refs.material.getDataList(this.formHeader)
            this.GetUser()
            this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
            this.$refs.textrecord.GetText(this.formHeader.orderId)
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取人员
    GetUser () {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_USER_LIST}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.$refs.workerref.GetTimeUserList(data.listuser, data.vrList)
          this.Attendance = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 修改表头
    UpdateHead (str, resolve, reject) {
      if (this.formHeader.orderStatus) {
        if (this.formHeader.orderStatus === 'saved' || this.formHeader.orderStatus === '已同步') { this.formHeader.orderStatus = str } else if (this.formHeader.orderStatus === 'noPass' && str === 'submit') { this.formHeader.orderStatus = str }
      } else {
        this.formHeader.orderStatus = str
      }
      this.formHeader.countOutput = this.$refs.instorage.sumNum
      this.formHeader.countMan = this.$refs.workerref.countMan
      this.formHeader.expAllDate = this.$refs.excrecord.ExcNum
      this.formHeader.germs = this.$refs.excrecord.GermsNum
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD_UPDATE}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('表头修改' + data.msg)
          }
        }
      })
    },
    // 保存提交
    SubmitForm () {
      if (!this.$refs.readytimes.dataRul()) {
        return false
      }
      if (!this.$refs.workerref.userrul()) {
        return false
      }
      if (!this.$refs.record.dataRul()) {
        return false
      }
      if (!this.$refs.excrecord.excrul()) {
        return false
      }
      if (!this.$refs.instorage.dataRul()) {
        return false
      }
      if (!this.$refs.material.dataRul()) {
        return false
      }
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.savedOrSubmitForm('submit')
      })
    },
    savedOrSubmitForm (str) {
      let updateHead = new Promise((resolve, reject) => {
        this.UpdateHead(str, resolve, reject)
      })
      let updateReady = new Promise((resolve, reject) => {
        this.$refs.readytimes.UpdateReady(str, resolve, reject)
      })
      let updateDevice = new Promise((resolve, reject) => {
        this.$refs.readytimes.UpdateDevice(str, resolve, reject)
      })
      let updateRecord = new Promise((resolve, reject) => {
        this.$refs.record.SaveData(str, resolve, reject)
      })
      let updateIn = new Promise((resolve, reject) => {
        this.$refs.instorage.SaveOrSubmitData(str, resolve, reject)
      })
      let updateMaterial = new Promise((resolve, reject) => {
        this.$refs.material.SaveOrSubmitData(str, resolve, reject)
      })
      let updateUser = new Promise((resolve, reject) => {
        this.$refs.workerref.BottleUpdateUser(str, resolve, reject)
      })
      let updateUserAtt = new Promise((resolve, reject) => {
        this.$refs.workerref.BottleUpdateAtt(str, resolve, reject)
      })
      let updateExc = new Promise((resolve, reject) => {
        this.$refs.excrecord.saveOrSubmitExc(this.formHeader.orderId, str, resolve, reject)
      })
      let updateText = new Promise((resolve, reject) => {
        this.$refs.textrecord.UpdateText(this.formHeader, str, resolve, reject)
      })
      if (str === 'saved') {
        let savedNet = Promise.all([updateHead, updateReady, updateDevice, updateRecord, updateIn, updateMaterial, updateUser, updateUserAtt, updateExc, updateText])
        savedNet.then(() => {
          this.$notify({title: '成功', message: '操作成功', type: 'success'})
          this.getHead()
        }).catch((err) => {
          this.$notify.error({title: '错误', message: err})
        })
      } else {
        let savedNet = Promise.all([updateReady, updateDevice, updateRecord])
        savedNet.then(() => {
          let SubmitRecord = new Promise((resolve, reject) => {
            this.$refs.record.SubmitData(str, resolve, reject)
          })
          let SubmitTime = new Promise((resolve, reject) => {
            this.ProHours(resolve, reject)
          })
          let SubmitNet = Promise.all([updateHead, SubmitTime, SubmitRecord, updateIn, updateMaterial, updateUser, updateUserAtt, updateExc, updateText])
          SubmitNet.then(() => {
            this.$notify({title: '成功', message: '操作成功', type: 'success'})
            this.getHead()
          }).catch((err) => {
            this.$notify.error({title: '错误', message: err})
          })
        }).catch((err) => {
          this.$notify.error({title: '错误', message: err})
        })
      }
    },
    // 工时提交
    ProHours (resolve, reject) {
      let data = [this.$refs.readytimes.readyTimeDate, this.$refs.readytimes.dataList, this.$refs.workerref.WorkerDate, {
        orderId: this.formHeader.orderId,
        countOutput: this.$refs.instorage.sumNum + '',
        countOutputUnit: 'EA',
        productDate: this.formHeader.productDate
      }]
      this.$http(`${BOTTLE_API.BOTTLE_PRO_READYTIME_SUBMIT}`, 'POST', data).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
          if (reject) {
            reject('工时提交' + data.msg)
          }
        }
      })
    },
    // 获取生产班次
    GetProductShift (factory) {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {factory: factory, type: 'product_shift'}).then(({data}) => {
        if (data.code === 0) {
          this.productShift = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取供应商
    GetSupplier (factory) {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {factory: factory, type: 'supplier_bottle'}).then(({data}) => {
        if (data.code === 0) {
          this.Supplier = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    }
  },
  computed: {},
  components: {
    ReadyTimes,
    Worker,
    Record,
    InStorage,
    Material,
    ExcRecord,
    TextRecord,
    FormHead: resolve => {
      require(['./formHead'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
