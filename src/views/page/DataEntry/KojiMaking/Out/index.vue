<template>
  <div>
    <div class="main">
      <el-card class="searchCard  newCard">
        <el-row type="flex">
          <el-col :span="21">
            <form-head :formHeader="formHeader"></form-head>
          </el-col>
          <el-col :span="3" style="font-size: 14px;line-height: 32px">
            <div style="float:left">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:right" class="buttonCss">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-KojiMaking-index'})">返回</el-button>
            <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('wht:order:update')">{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('wht:order:update')">保存</el-button>
            <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('sys:whtInStorage:submit')">提交</el-button>
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
      <el-tabs v-model="activeName" id="OutTabs" class="NewDaatTtabs" type="border-card" style="border-radius: 15px;overflow: hidden;min-height: 300px">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            <el-button>原料领用</el-button>
          </span>
          <meateriel ref="meateriel" :isRedact="isRedact" :formHeader="formHeader"></meateriel>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            <el-button>生产入库</el-button>
          </span>
          <in-stock :isRedact="isRedact"></in-stock>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            <el-button>工艺控制</el-button>
          </span>
          <craft-control :isRedact="isRedact"></craft-control>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="5">
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
import {KJM_API} from '@/api/api'
import { headanimation } from '@/net/validate'
import FormHead from './Outcomponents/formHead'
import Meateriel from './Outcomponents/materiel'
import InStock from './Outcomponents/inStock'
import CraftControl from './Outcomponents/craftControl'
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {},
      orderStatus: '',
      activeName: '1'
    }
  },
  mounted () {
    headanimation(this.$)
    this.GetOrderList()
  },
  methods: {
    // 获取表头
    GetOrderList () {
      this.$http(`${KJM_API.FORMHEAD_API}`, 'POST', {
        workShop: '7E0AA796139E46738A949E88E1272578',
        productDate: '2019-03-04',
        orderNo: this.orderNo
      }, false, false, false).then(({data}) => {
        this.formHeader = data.list[0]
        this.$refs.meateriel.GetBrineTankNo(this.formHeader)
        if (this.orderStatus !== '已同步') {
          this.$refs.meateriel.GetmaterielDate(this.formHeader)
        }
      })
    },
    // 保存
    savedOrSubmitForm (str) {
      let that = this
      let meaterielSave = new Promise((resolve, reject) => {
        that.$refs.meateriel.SaveMateriel(str, resolve)
      })
      if (str === 'submit') {
        let saveNet = Promise.all([meaterielSave])
        saveNet.then(function () {
          let meaterielSubmit = new Promise((resolve, reject) => {
            that.$refs.meateriel.SubmitMateriel(resolve)
          })
          let submitNet = Promise.all([meaterielSubmit])
          submitNet.then(function () {
            that.GetOrderList()
            that.$message.success('提交成功')
          })
        })
      } else {
        let saveNet = Promise.all([meaterielSave])
        saveNet.then(function () {
          that.GetOrderList()
          that.$message.success('保存成功')
        })
      }
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
    }
  },
  computed: {},
  components: {
    FormHead,
    Meateriel,
    InStock,
    CraftControl,
    ExcRecord,
    TextRecord
  }
}
</script>

<style scoped>

</style>
