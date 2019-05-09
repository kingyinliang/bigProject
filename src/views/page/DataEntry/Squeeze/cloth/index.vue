<template>
  <div class="main">
    <el-card class="newCard searchCard">
      <el-row>
        <el-col :span="21">
          <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
            <el-form-item label="生产工厂：">
              <el-select v-model="formHeader.factory" placeholder="请选择">
                <el-option label="请选择"  value=""></el-option>
                <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产车间：">
              <el-select v-model="formHeader.workShop" placeholder="请选择">
                <el-option label="请选择"  value=""></el-option>
                <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="布浆线：">
              <el-select v-model="formHeader.productLine" placeholder="请选择">
                <el-option label="请选择"  value=""></el-option>
                <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产日期：">
              <el-date-picker v-model="formHeader.productDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:199px"></el-date-picker>
            </el-form-item>
            <el-form-item label="提交人员：">
              <p class="input_bommom">&nbsp;</p>
            </el-form-item>
            <el-form-item label="提交时间：">
              <p class="input_bommom">&nbsp;</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <div style="float:right; line-height:31px;font-size: 14px">
            <div style="float:left">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '' ? '未录入' : orderStatus }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align:right">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="SearchList">查询</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked'">{{isRedact?'取消':'编辑'}}</el-button>
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
    <div class="tableCard">
      <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-tabs @tab-click='tabClick' ref='tabs' v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="margin-top:15px">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark"  :content="orderStatus === 'noPass'? '不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': orderStatus === 'noPass'? 'red' : ''}">物料领用</el-button>
            </el-tooltip>
          </span>
          <Material ref="material" :isRedact="isRedact" :formHeader="formHeader" @setApplyMaterielState='setApplyMaterielState'></Material>
        </el-tab-pane>
        <el-tab-pane name="2" label="异常记录">
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="3" label="文本记录">
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { BASICDATA_API } from '@/api/api'
import {headanimation} from '@/net/validate'
import Material from './common/material'
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'cloth',
  data () {
    return {
      isRedact: false,
      orderStatus: '',
      factory: [],
      workshop: [],
      productline: [],
      formHeader: {
        factory: '',
        workShop: '',
        productLine: '',
        productDate: '',
        upMan: '',
        upDate: '',
        clickstatus: 'saved'
      },
      activeName: '1',
      succmessage: '保存成功'
    }
  },
  mounted () {
    headanimation(this.$)
    this.Getdeptcode()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
    },
    'formHeader.workShop' (n, o) {
      this.GetParentline(n)
    }
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formHeader.workShop = ''
      this.formHeader.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '压榨'}).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.workshop = []
      }
    },
    // 获取产线
    GetParentline (id) {
      this.formHeader.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYPARENTID1_API}`, 'POST', {parentId: id}).then(({data}) => {
          if (data.code === 0) {
            this.productline = data.childList
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.productline = []
      }
    },
    // 查询
    SearchList () {
      this.$refs.material.GetMateriaList(this.formHeader)
    },
    // 提交
    SubmitForm () {
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.savedOrSubmitForm('submit')
      })
    },
    // 保存
    savedOrSubmitForm (str) {
      // 提交
      if (str === 'submit') {
        this.$set(this.formHeader, 'clickstatus', 'submit')
        if (!this.$refs.material.Readyrules()) {
          return false
        }
        this.succmessage = '提交成功'
      } else {
        this.$set(this.formHeader, 'clickstatus', 'saved')
      }
      let that = this
      new Promise((resolve, reject) => {
        that.$refs.material.savemain(resolve, reject)
      }).then(function () {
        let net1 = new Promise((resolve, reject) => {
          that.$refs.material.savesecond(resolve, reject)
        })
        let net2 = new Promise((resolve, reject) => {
          that.$refs.material.savepeople(resolve, reject)
        })
        Promise.all([net1, net2]).then(function () {
          that.$message.success(that.succmessage)
          that.SearchList()
          that.isRedact = false
        }).catch(() => {
          that.$message.error('网络请求失败，请刷新重试')
        })
      })
      // let net1 = new Promise((resolve, reject) => {
      //   that.$refs.material.savesmain(resolve)
      // })
      // let net10 = Promise.all([net1])
      // net10.then(function () {
      //   that.SearchList()
      //   that.$message.success('保存成功')
      // })
    },
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    setApplyMaterielState (status) {
      this.orderStatus = status
      this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[parseInt(this.$refs.tabs.currentName) - 1])
    }
  },
  components: {
    Material,
    ExcRecord,
    TextRecord
  }
}
</script>

<style lang="less" scoped>
.input_bommom{
  width: 199px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  border-bottom: solid 1px #D8D8D8;
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
</style>
