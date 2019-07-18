<template>
  <div>
    <div class="main">
      <el-card class="searchCards searchCard">
        <el-row>
          <el-col>
            <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
              <el-form-item label="车间：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="生产订单：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="生产品相：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="计划产量：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="订单日期：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="生产日期：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="提交人员：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
              <el-form-item label="提交时间：">
                <p class="input_bottom">&nbsp;123</p>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="text-align:right;">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry/Filtration/DataEntry/index'})">返回</el-button>
            <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact">{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
            <el-button type="primary" size="small" @click="SubmitForm">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-tabs ref='tabs' v-model="activeName" type="border-card" class="NewDaatTtabs" id="DaatTtabs">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            <el-button>设备工时</el-button>
          </span>
          <Equ-workinghours ref="equworkinghours" :isRedact="isRedact"></Equ-workinghours>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            <el-button>工艺控制</el-button>
          </span>
          <Craft ref="craft" :isRedact="isRedact"></Craft>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label" class="spanview">
            <el-button>物料领用</el-button>
          </span>
          <Material ref="material" :isRedact="isRedact"></Material>
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
import {headanimation} from '@/net/validate'
import EquWorkinghours from './common/equWorkingHours'
import Craft from './common/craft'
import Material from './common/material'
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'FiltrationDetail',
  data () {
    return {
      formHeader: {},
      isRedact: false,
      activeName: '1'
    }
  },
  mounted () {
    headanimation(this.$)
  },
  methods: {
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
      } else {
      }
    }
  },
  components: {
    EquWorkinghours,
    Craft,
    Material,
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
