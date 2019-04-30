<template>
<div>
  <div class="main">
    <el-card class="searchCard  newCard">
      <el-row type="flex">
        <el-col :span="21">
          <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
            <el-form-item label="生产工厂：">
              <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 180px">
                <el-option label="请选择"  value=""></el-option>
                <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产车间：">
              <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
                <el-option label="请选择"  value=""></el-option>
                <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产日期：">
              <el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="formHeader.pstngDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="提交人员：">
              <p class="el-input" style="width: 180px">{{formHeader.changer}}</p>
            </el-form-item>
            <el-form-item label="提交时间：">
              <p class="el-input" style="width: 180px">{{formHeader.changed}}</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col style="width:180px;font-size: 14px;line-height: 32px">
          <div style="float: right;">
            <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
            <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align:right" class="buttonCss">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('sys:kjmOutMaterial:mySaveOrUpdate')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('sys:kjmOutMaterial:mySaveOrUpdate')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('sys:kjmOutMaterial:mySaveOrUpdate')">提交</el-button>
        </template>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
  </div>
  <div class="main" style="padding-top: 0px">
    <div class="tableCard">
      <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <el-tabs ref='tabs' v-model="activeName" id="OutTabs" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">
          申请订单
        </span>
        <apply-order :isRedact="isRedact"></apply-order>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">
          物料领用
        </span>
        <materiel :isRedact="isRedact"></materiel>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label" class="spanview">
          工时计算
        </span>
        <man-hour :isRedact="isRedact"></man-hour>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import ApplyOrder from './applyOrder'
import Materiel from './material'
import ManHour from './manHour'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      activeName: '1',
      orderStatus: '',
      factory: [],
      workshop: [],
      formHeader: {}
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formHeader.workShop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '制曲'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            this.formHeader.workShop = data.typeList[0].deptId
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  },
  computed: {},
  components: {
    ApplyOrder,
    Materiel,
    ManHour
  }
}
</script>

<style lang="scss" scoped>
</style>
