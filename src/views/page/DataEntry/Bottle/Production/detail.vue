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
        <record ref="record" :isRedact="isRedact"></record>
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
        <material ref="material" :isRedact="isRedact"></material>
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
export default {
  name: 'detail',
  data () {
    return {
      isRedact: false,
      orderStatus: '',
      activeName: '1',
      formHeader: {}
    }
  },
  mounted () {
  },
  methods: {
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    // 保存提交
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
