<template>
  <div class="main">
    <el-card class="newCard searchCard">
      <el-row>
        <el-col :span="21">
          <el-form :inline="true" size="small" label-width="85px">
            <el-form-item label="生产车间：">
              <p class="input_bommom">&nbsp;{{this.$route.params.workshopName}}</p>
            </el-form-item>
            <el-form-item label="曲房号：">
              <p class="input_bommom">&nbsp;{{this.$route.params.houseNo}}</p>
            </el-form-item>
            <el-form-item label="生产订单：">
              <p class="input_bommom">&nbsp;{{this.$route.params.orderNo}}</p>
            </el-form-item>
            <el-form-item label="生产品项：">
              <p class="input_bommom">&nbsp;{{this.$route.params.materialCode}} {{this.$route.params.materialName}}</p>
            </el-form-item>
            <el-form-item label="生产日期：">
              <p class="input_bommom">&nbsp;{{this.$route.params.inKjmdate}}</p>
            </el-form-item>
            <el-form-item label="入罐号：">
              <p class="input_bommom">&nbsp;{{this.$route.params.inPotNo}}</p>
            </el-form-item>
            <el-form-item label="连续蒸煮号：">
              <p class="input_bommom">&nbsp;{{this.$route.params.cookingNo}}</p>
            </el-form-item>
            <el-form-item label="提交人员：">
              <p class="input_bommom">&nbsp;{{this.$route.params.changer}}</p>
            </el-form-item>
            <el-form-item label="提交时间：">
              <p class="input_bommom">&nbsp;{{this.$route.params.changed}}</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <div style="float:right; line-height:31px;font-size: 14px">
            <div style="float:left">
              <span class="point" :style="{'background': '#7ED321'}"></span>订单状态：
            </div>
            <span>{{this.$route.params.status}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align:right;">
        <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry/KojiMaking/index'})">返回</el-button>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
        <el-button type="primary" size="small" @click="SubmitForm">提交</el-button>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
    <div class="tableCard">
      <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-tabs type="border-card" class="NewDaatTtabs" id="DaatTtabs" style="margin-top:15px">
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
              <el-button>原料领用</el-button>
            </el-tooltip>
          </span>
          <Material ref="material" :isRedact="isRedact"></Material>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
              <el-button>工艺控制</el-button>
            </el-tooltip>
          </span>
          <Craft ref="craft"></Craft>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <err-record ref="errrecord"></err-record>
        </el-tab-pane>
        <el-tab-pane>
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
import Material from './common/material'
import Craft from './common/craft'
import ErrRecord from './common/errRecord'
export default {
  name: 'boileIndex',
  data () {
    return {
      isRedact: false,
      form: {
        name: ''
      },
      formLabelWidth: '100px'
    }
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
        if (!this.$refs.craft.craftrul()) {
          return false
        }
      }
      let that = this
      let net1 = new Promise((resolve, reject) => {
        that.$refs.craft.updatezhu(resolve, reject)
      })
      let net2 = new Promise((resolve, reject) => {
        that.$refs.craft.updatelishui(resolve, reject)
      })
      let net3 = new Promise((resolve, reject) => {
        that.$refs.craft.updatezhengzhu(resolve, reject)
      })
      let net4 = new Promise((resolve, reject) => {
        that.$refs.craft.updatehunhe(resolve, reject)
      })
      let net11
      net11 = Promise.all([net1, net2, net3, net4])
      net11.then(function () {
        that.$message.success('保存成功')
      }).catch(() => {
        that.$message.error('网络请求失败，请刷新重试')
        that.isRedact = false
      })
    }
  },
  mounted () {
    headanimation(this.$)
  },
  components: {
    TextRecord: resolve => {
      require(['@/views/components/textRecord'], resolve)
    },
    Material,
    Craft,
    ErrRecord
  }
}
</script>

<style lang="less" scoped>
.input_bommom {
  width: 147px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  border-bottom: solid 1px #D8D8D8;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 8px
}
.searchCard {
  .el-button--primary,.el-button--primary:focus{
    color: #000000;
    background-color: #FFFFFF;
    border-color: #D9D9D9;
  }
  .el-button--primary:hover{
    background-color: #1890FF;
    color: #FFFFFF
  }
  .el-button--primary:first-child{
    background-color: #1890FF;
    color: #FFFFFF;
    border-color: #1890FF;
  }
}
#DaatTtabs{
  border-radius: 15px;
  overflow: hidden;
}
.htitle {
  margin: 0 0 10px 0;
}
</style>
