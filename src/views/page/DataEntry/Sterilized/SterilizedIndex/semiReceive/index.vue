<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <form-head :formHeader="formHeader"></form-head>
      <el-row style="text-align:right" class="buttonCss">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('wht:order:update')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('wht:order:update')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('sys:whtInStorage:submit')">提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-card class="searchCard  newCard">
      <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            原汁领用
          </span>
          <el-table header-row-class-name="tableHead" :data="MaterialDate" border tooltip-effect="dark">
            <el-table-column type="index" width="55" label="序号"></el-table-column>
            <el-table-column label="领用物料" width="150"></el-table-column>
            <el-table-column label="单位" width="50"></el-table-column>
            <el-table-column label="计划领料" width="140"></el-table-column>
            <el-table-column label="操作" width="80">
              <el-button type="text" size="mini"><i class="icons iconfont factory-chaifen" :disabled="!isRedact"></i>拆分</el-button>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>罐号</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>批次</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>实际领料</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column label="备注" width="140">
              <template slot-scope="scope"></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            异常记录
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            文本记录
          </span>
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
import {STERILIZED_API} from '@/api/api'
import {Stesave} from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {},
      activeName: '1',
      MaterialDate: [{}]
    }
  },
  mounted () {
    this.GetOrderHead()
  },
  methods: {
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
      if (str === 'submit') {
      }
      let net0 = new Promise((resolve, reject) => {
        this.Stesave.orderUpdate(this, str, resolve, reject)
      })
      let net1 = new Promise((resolve, reject) => {
        this.Stesave.excUpdate(this, str, resolve, reject)
      })
      let net2 = new Promise((resolve, reject) => {
        this.Stesave.textUpdate(this, str, resolve, reject)
      })
      let net3 = new Promise((resolve, reject) => {
      })
      if (str === 'submit') {
        let submitNet = Promise.all([net0, net1, net2, net3])
        submitNet.then(() => {
          this.$message.success('提交成功')
          this.GetOrderHead()
        }).catch((err) => {
          this.$message.error(err)
        })
      } else {
        let savedNet = Promise.all([net0, net1, net2, net3])
        savedNet.then(() => {
          this.$message.success('保存成功')
          this.GetOrderHead()
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
    // 获取订单表头
    GetOrderHead () {
      this.$http(`${STERILIZED_API.STE_ORDER_HEAD_API}`, 'POST', {orderId: this.$store.state.common.sterilized.seiOrderId}).then(({data}) => {
        if (data.code === 0) {
          this.isRedact = false
          this.formHeader = data.list[0]
          this.Stesave = new Stesave(this.formHeader)
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          if (this.formHeader.status !== '') {
            this.$refs.excrecord.GetExcDate(this.formHeader.orderId)
            this.$refs.textrecord.GetText(this.formHeader.orderId)
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {},
  components: {
    ExcRecord,
    TextRecord,
    FormHead: resolve => {
      require(['../components/formHead'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
