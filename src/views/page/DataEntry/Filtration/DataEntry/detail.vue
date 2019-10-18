<template>
  <div>
    <div class="header_main">
      <el-card class="searchCards searchCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="marbottom multi_row">
              <el-form-item label="生产车间：">
                <p class="input_bottom">{{formHeader.workShopName}}</p>
              </el-form-item>
              <el-form-item label="生产订单：">
                <p class="input_bottom">{{formHeader.orderNo}}</p>
              </el-form-item>
              <el-form-item label="生产品相：">
                <p class="input_bottom">{{(formHeader.materialCode || '') + ' ' + (formHeader.materialName || '')}}</p>
              </el-form-item>
              <el-form-item label="计划产量：">
                <p class="input_bottom">{{(formHeader.planOutput || '') + ' ' + (formHeader.outputUnit || '')}}</p>
              </el-form-item>
              <el-form-item label="订单日期：">
                <p class="input_bottom">{{formHeader.orderDate}}</p>
              </el-form-item>
              <el-form-item label="生产日期：">
                <el-date-picker size="small" type="date" :disabled="!isRedact" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="formHeader.productDate" style="width: 145px"></el-date-picker>
              </el-form-item>
              <el-form-item label="提交人员：">
                <p class="input_bottom">{{formHeader.changer}}</p>
              </el-form-item>
              <el-form-item label="提交时间：">
                <p class="input_bottom">{{formHeader.changed}}</p>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="max-width:210px; height:30px;">
            <div style="padding-top: 0px;float: right;font-size: 14px" :style="{'color': orderStatus === 'noPass'? 'red' : '' }"><span style="width: 5px;height: 5px;float: left;background: #1890FF;border-radius: 50%;margin-top: 7px;margin-right: 3px" :style="{'background': orderStatus === 'noPass'? 'red' : '#1890FF' }"></span>订单状态：{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : '未录入' }}</div>
          </el-col>
        </el-row>
        <el-row style="text-align:right; position:absolute; top:44px; right:7px;">
          <template style="float:right; margin-left:10px;">
            <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' &&  isAuth('filter:instorage:mySaveOrUpdate')">{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right; margin-left:10px;">
            <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')"  v-if="isAuth('filter:instorage:mySaveOrUpdate')">保存</el-button>
            <el-button type="primary" size="small" @click="SubmitForm"  v-if="isAuth('filter:instorage:submit')">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-tabs @tab-click='tabClick' ref='tabs' v-model="activeName" type="border-card" class="NewDaatTtabs">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" :content="EquState === 'noPass'? '不通过':EquState === 'saved'? '已保存':EquState === 'submit' ? '已提交' : EquState === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': EquState === 'noPass'? 'red' : ''}">设备工时</el-button>
            </el-tooltip>
          </span>
          <Equ-workinghours ref="equworkinghours" :isRedact="isRedact" @setEquState="setEquState"></Equ-workinghours>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" :content="caftStatus === 'noPass'? '不通过':caftStatus === 'saved'? '已保存':caftStatus === 'submit' ? '已提交' : caftStatus === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': caftStatus === 'noPass'? 'red' : ''}">工艺控制</el-button>
            </el-tooltip>
          </span>
          <Craft ref="craft" :isRedact="isRedact" @setCraftStatus="setCraftStatus"></Craft>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact" :order="formHeader"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" :content="materialStatus === 'noPass'? '不通过':materialStatus === 'saved'? '已保存':materialStatus === 'submit' ? '已提交' : materialStatus === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': materialStatus === 'noPass'? 'red' : ''}">物料领用</el-button>
            </el-tooltip>
          </span>
          <Material ref="material" :isRedact="isRedact" @setMaterialStatus="setMaterialStatus"></Material>
        </el-tab-pane>
        <el-tab-pane name="5">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" :content="instorageState === 'noPass'? '不通过':instorageState === 'saved'? '已保存':instorageState === 'submit' ? '已提交' : instorageState === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': instorageState === 'noPass'? 'red' : ''}">生产入库</el-button>
            </el-tooltip>
          </span>
          <in-storage ref="instorage" :isRedact="isRedact" :formHeader="formHeader" @setInstorageState="setInstorageState"></in-storage>
        </el-tab-pane>
        <el-tab-pane name="6">
          <span slot="label" class="spanview">
            <el-button>文本记录</el-button>
          </span>
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {FILTRATION_API} from '@/api/api'
import {headanimation} from '@/net/validate'
import EquWorkinghours from './common/equWorkingHours'
import Craft from './common/craft'
import Material from './common/material'
import InStorage from './common/inStorage'
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'FiltrationDetail',
  data () {
    return {
      formHeader: {},
      isRedact: false,
      orderStatus: '',
      instorageState: '',
      EquState: '',
      caftStatus: '',
      materialStatus: '',
      activeName: '1'
    }
  },
  mounted () {
    headanimation(this.$)
    this.GetOrder()
  },
  watch: {
    'instorageState' () {
      console.log('status:' + this.instorageState)
    }
  },
  methods: {
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    setInstorageState (status) {
      this.instorageState = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    setEquState (status) {
      this.EquState = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    setCraftStatus (status) {
      this.caftStatus = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    setMaterialStatus (status) {
      this.materialStatus = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    },
    GetOrder () {
      this.$http(`${FILTRATION_API.FILTER_HOME_LIST_API}`, 'POST', {
        orderNo: this.$store.state.common.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.list[0]
          this.orderStatus = data.list[0].orderStatus
          this.$refs.instorage.getList()
          this.$refs.instorage.GetholderList(this.formHeader.factory, this.formHeader.workShop, this.formHeader.orderId)
          let params = {
            orderId: this.formHeader.orderId,
            deptId: this.formHeader.productLine,
            factory: this.formHeader.factory,
            workShop: this.formHeader.workShop,
            orderNo: this.formHeader.orderNo
          }
          this.$refs.craft.GetList(params)
          this.$refs.equworkinghours.GetList(params)
          this.$refs.material.GetList(params)
          this.$refs.material.GetHolderList(params)
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
          this.$refs.textrecord.GetText(this.formHeader.orderId)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 修改表头
    updateHead (str, resolve, reject) {
      this.formHeader.orderStatus = str
      this.formHeader.countOutput = this.$refs.instorage.countOutputNum
      this.$http(`${FILTRATION_API.FILTER_HOME_UPDATE_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('表头保存' + data.msg)
          }
        }
      })
    },
    // 保存 or 提交
    SubmitForm () {
      if (!this.$refs.equworkinghours.Readyrules()) {
        return false
      }
      if (!this.$refs.craft.Readyrules()) {
        return false
      }
      if (!this.$refs.material.Readyrules()) {
        return false
      }
      if (!this.$refs.material.ReadyRepertoryRules()) {
        return false
      }
      if (!this.$refs.instorage.countOutputNum) {
        this.$warning_SHINHO('入库数未0，不能提交')
        return false
      }
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formHeader.countOutput = this.$refs.instorage.countOutputNum
        let params = [this.formHeader, this.$refs.equworkinghours.dataList]
        this.$http(`${FILTRATION_API.FILTER_EQUWORKINGHOURS_SUBMIT}`, 'POST', params).then(({data}) => {
          if (data.code === 0) {
            this.savedOrSubmitForm('submit')
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      })
    },
    savedOrSubmitForm (str) {
      if (!this.$refs.material.ReadyRepertoryRules()) {
        return false
      }
      let that = this
      let net101 = new Promise((resolve, reject) => {
        that.$refs.equworkinghours.SaveEquWorking(resolve, reject)
      })
      let net102 = new Promise((resolve, reject) => {
        that.$refs.craft.SaveTech(str, resolve)
      })
      let headUpdate = new Promise((resolve, reject) => {
        this.updateHead(str, resolve, reject)
      })
      let net103 = new Promise((resolve, reject) => {
        that.$refs.craft.SaveMaterial(str, resolve)
      })
      let net104 = new Promise((resolve, reject) => {
        that.$refs.material.SaveMaterial('saved', resolve)
      })
      let excSaveNet = new Promise((resolve, reject) => {
        that.$refs.excrecord.saveOrSubmitExc(this.formHeader.orderId, str, resolve, reject)
      })
      let textSaveNet = new Promise((resolve, reject) => {
        that.$refs.textrecord.UpdateText(this.formHeader, str, resolve, reject)
      })
      if (str === 'submit') {
        let net201 = new Promise((resolve, reject) => {
          that.$refs.craft.SubmitMaterial(str, resolve)
        })
        let net202 = new Promise((resolve, reject) => {
          that.$refs.material.SaveMaterial(str, resolve)
        })
        let inSubmit = new Promise((resolve, reject) => {
          that.$refs.instorage.UpdateIn(str, resolve, reject)
        })
        let net203 = new Promise((resolve, reject) => {
          that.$refs.equworkinghours.SubmitEquWorking(str, resolve, reject)
        })
        let aidSubmit = new Promise((resolve, reject) => {
          that.$refs.craft.aidSubmit(str, this.formHeader.workShop, resolve, reject)
        })
        Promise.all([headUpdate, net101, net102, net103, net104, inSubmit, excSaveNet, textSaveNet, aidSubmit]).then(function () {
          Promise.all([net201, net202, net203]).then(function () {
            that.$notify({title: '成功', message: '提交成功', type: 'success'})
            that.GetOrder()
            that.isRedact = false
          }).catch(() => {
            that.$error_SHINHO('网络请求失败，请刷新重试')
          })
        })
      } else {
        let inSave = new Promise((resolve, reject) => {
          that.$refs.instorage.UpdateIn(str, resolve, reject)
        })
        Promise.all([headUpdate, net101, net102, net103, net104, inSave, excSaveNet, textSaveNet]).then(function () {
          that.$notify({title: '成功', message: '保存成功', type: 'success'})
          that.GetOrder()
          that.isRedact = false
        }).catch(function (reason) {
          that.$error_SHINHO('网络请求失败，请刷新重试' + reason)
        })
      }
    }
  },
  components: {
    EquWorkinghours,
    Craft,
    Material,
    InStorage,
    ExcRecord,
    TextRecord
  }
}
</script>

<style lang="less">
.input_bottom {
  width:150px;
  border-bottom: 1px solid rgba(216,216,216,1);
  overflow: hidden;
  height: 33px;
  white-space:nowrap;
  text-overflow:ellipsis;
}
</style>
