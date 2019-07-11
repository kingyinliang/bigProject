<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-row type="flex">
        <el-col>
          <form-head :formHeader="formHeader"></form-head>
        </el-col>
        <el-col style="width: 100px">
          <div style="padding-top: 30px"><span style="width: 5px;height: 5px;float: left;background: #1890FF;border-radius: 50%;margin-top: 7px;margin-right: 3px" :style="{'color': orderStatus === 'noPass'? 'red' : '' }"></span>{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</div>
        </el-col>
      </el-row>
      <el-row style="text-align:right;position: absolute;top:110px;right: 20px;" class="buttonCss">
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
            辅料添加
          </span>
          <el-card class="newCard">
            <div class="clearfix" style="padding-top: 5px;padding-bottom: 5px">
              <h3 style="line-height: 32px">辅料添加记录</h3>
              <el-button type="primary" size="mini" style="float: right">添加完成</el-button>
            </div>
            <el-table header-row-class-name="tableHead" :data="AddSupDate" @selection-change="handleSelectionChangeAddSup" border tooltip-effect="dark">
              <el-table-column type="selection" width="34"></el-table-column>
              <el-table-column type="index" width="55" label="序号" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="添加状态" width="80" prop="addStatus" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="物料" :show-overflow-tooltip="true"><template slot-scope="scope">{{scope.row.materialCode + ' ' + scope.row.materialName}}</template></el-table-column>
              <el-table-column label="需求数量" width="80" prop="planAmount" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" :disabled="!isRedact" @click="addData(scope.row, scope.$index)"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
                </template>
              </el-table-column>
              <el-table-column width="140">
                <template slot="header"><i class="reqI">*</i><span>批次</span></template>
                <template slot-scope="scope">
                  <el-input v-model="scope.row.batch" :disabled="!isRedact" placeholder="请输入" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="领用数量" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.receiveAmount" :disabled="!isRedact" placeholder="请输入" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="140">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" :disabled="!isRedact" placeholder="请输入" size="mini"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="newCard">
            <div class="clearfix" style="padding-top: 5px;padding-bottom: 5px">
              <h3 style="line-height: 32px">增补料记录</h3>
              <el-button type="primary" size="mini" style="float: right">添加完成</el-button>
            </div>
            <el-table header-row-class-name="tableHead" :data="SupDate" @selection-change="handleSelectionChangeAddSup" border tooltip-effect="dark">
              <el-table-column type="selection" width="34"></el-table-column>
              <el-table-column type="index" width="55" label="序号"></el-table-column>
              <el-table-column label="添加状态" width="150"></el-table-column>
              <el-table-column label="物料" width="150"></el-table-column>
              <el-table-column label="添加数量" width="150"></el-table-column>
              <el-table-column label="单位" width="150"></el-table-column>
              <el-table-column label="操作" width="150"></el-table-column>
              <el-table-column width="140">
                <template slot="header"><i class="reqI">*</i><span>批次</span></template>
                <template slot-scope="scope"></template>
              </el-table-column>
              <el-table-column label="领用数量" width="150"></el-table-column>
              <el-table-column label="备注" width="140">
                <template slot-scope="scope"></template>
              </el-table-column>
            </el-table>
          </el-card>
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
      orderStatus: '',
      multipleSelectionAddSup: [],
      AddSupDate: [],
      multipleSelectionSup: [],
      SupDate: []
    }
  },
  mounted () {
    this.GetOrderHead()
  },
  methods: {
    GetDataList () {
      this.$http(`${STERILIZED_API.STE_ENTER_SUP_LIST_API}`, 'POST', {
        orderId: this.$store.state.common.sterilized.acceOrderId,
        factory: this.$store.state.common.sterilized.acceFactory,
        orderNo: this.$store.state.common.sterilized.acceOrderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.AddSupDate = data.steSupMaterialBean.resultList
          this.SupDate = data.steSupMaterialBean.supList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 拆分
    addData () {
    },
    // 辅料添加多选
    handleSelectionChangeAddSup (val) {
      this.multipleSelectionAddSup = []
      val.forEach((item, index) => {
        this.multipleSelectionAddSup.push(item)
      })
    },
    // 增补料多选
    handleSelectionChangeSup (val) {
      this.multipleSelectionSup = []
      val.forEach((item, index) => {
        this.multipleSelectionSup.push(item)
      })
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
      this.$http(`${STERILIZED_API.STE_ORDER_HEAD_API}`, 'POST', {orderId: this.$store.state.common.sterilized.acceOrderId}).then(({data}) => {
        if (data.code === 0) {
          this.isRedact = false
          this.formHeader = data.list[0]
          this.Stesave = new Stesave(this.formHeader)
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          if (this.formHeader.status !== '') {
            this.GetDataList()
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
