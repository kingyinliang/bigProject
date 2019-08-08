<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-row type="flex">
        <el-col>
          <form-head :formHeader="formHeader" :isRedact="isRedact"></form-head>
        </el-col>
        <el-col style="width: 244px;position: relative" class="clearfix">
          <el-row class="clearfix">
            <div style="float:right; line-height:31px;font-size: 14px">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </el-row>
          <el-row style="text-align:right;position: absolute;bottom: 10px;right: 0">
            <template style="float:right; margin-left: 10px;">
              <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('kjm:bean:material:update')">{{isRedact?'取消':'编辑'}}</el-button>
            </template>
            <template v-if="isRedact" style="float:right; margin-left: 10px;">
              <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('kjm:bean:material:update')">保存</el-button>
              <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('kjm:bean:material:update')">提交</el-button>
            </template>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs  @tab-click='tabClick' ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">准备时间</span>
        <ready-times ref="readytimes" :isRedact="isRedact"></ready-times>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">人员</span>
        <worker ref="workerref" :isRedact="isRedact" :order="formHeader"></worker>
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
        <span slot="label" class="spanview">生产入库</span>
        <in-storage ref="instorage" :isRedact="isRedact"></in-storage>
      </el-tab-pane>
      <el-tab-pane name="6">
        <span slot="label" class="spanview">物料领用</span>
        <material ref="material" :isRedact="isRedact" :Supplier="Supplier"></material>
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
      Supplier: []
    }
  },
  mounted () {
    this.getHead()
  },
  methods: {
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    // 获取表头
    getHead () {
      this.isRedact = false
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.headInfo
          this.orderStatus = data.headInfo.orderStatus
          this.GetSupplier(this.formHeader.factory) // 供应商
          this.$refs.instorage.GetProductShift(this.formHeader.factory) // 入库生产班次
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          this.$refs.workerref.GetTeam(false, this.formHeader.factory)
          this.$refs.workerref.getTree(this.formHeader.factory)
          this.$refs.workerref.GetProductShift(this.formHeader.factory)
          if (this.formHeader.orderStatus) {
            this.$refs.record.getDataList()
            this.$refs.instorage.getDataList()
            this.$refs.material.getDataList()
            this.$refs.workerref.GetUserList(this.formHeader.orderId)
            this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
            this.$refs.textrecord.GetText(this.formHeader.orderId)
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改表头
    UpdateHead (str, resolve, reject) {
      if (this.formHeader.orderStatus) {
        if (this.formHeader.orderStatus === 'saved') { this.formHeader.orderStatus = str } else if (this.formHeader.orderStatus === 'noPass' && str === 'submit') { this.formHeader.orderStatus = str }
      } else {
        this.formHeader.orderStatus = str
      }
      this.formHeader.realOutput = this.$refs.instorage.sumNum
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
      if (!this.$refs.instorage.dataRul()) {
        return false
      }
      if (!this.$refs.material.dataRul()) {
        return false
      }
      if (!this.$refs.workerref.userrul()) {
        return false
      }
      if (!this.$refs.excrecord.excrul()) {
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
      let updateRecord = new Promise((resolve, reject) => {
        this.$refs.record.SaveOrSubmitData(str, resolve, reject)
      })
      let updateIn = new Promise((resolve, reject) => {
        this.$refs.instorage.SaveOrSubmitData(str, resolve, reject)
      })
      let updateMaterial = new Promise((resolve, reject) => {
        this.$refs.material.SaveOrSubmitData(str, resolve, reject)
      })
      let updateUser = new Promise((resolve, reject) => {
        this.$refs.workerref.UpdateUser(str, resolve, reject)
      })
      let updateExc = new Promise((resolve, reject) => {
        this.$refs.excrecord.saveOrSubmitExc(this.formHeader.orderId, str, resolve, reject)
      })
      let updateText = new Promise((resolve, reject) => {
        this.$refs.textrecord.UpdateText(this.formHeader, str, resolve, reject)
      })
      if (str === 'saved') {
        let savedNet = Promise.all([updateHead, updateRecord, updateIn, updateMaterial, updateUser, updateExc, updateText])
        savedNet.then(() => {
          this.$message.success('保存成功')
          this.getHead()
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
    // 获取供应商
    GetSupplier (factory) {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {factory: factory, type: 'supplier_bottle'}).then(({data}) => {
        if (data.code === 0) {
          this.Supplier = data.dicList
        } else {
          this.$message.error(data.msg)
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
