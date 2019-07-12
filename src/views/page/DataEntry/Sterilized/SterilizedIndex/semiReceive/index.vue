<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-row type="flex">
        <el-col>
          <form-head :formHeader="formHeader"></form-head>
        </el-col>
        <el-col style="width: 100px">
          <div style="padding-top: 30px"><span style="width: 5px;height: 5px;float: left;background: #1890FF;border-radius: 50%;margin-top: 7px;margin-right: 3px" :style="{'color': orderStatus === 'noPass'? 'red' : '' }"></span>{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : '未录入' }}</div>
        </el-col>
      </el-row>
      <el-row style="text-align:right;position: absolute;bottom:10px;right: 20px;" class="buttonCss">
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
            <el-table-column label="领用物料">
              <template slot-scope="scope">{{scope.row.materialCode + ' ' + scope.row.materialName}}</template>
            </el-table-column>
            <el-table-column label="单位" width="50" prop="unit"></el-table-column>
            <el-table-column label="计划领料" width="100" prop="planAmount"></el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text" size="mini" :disabled="!isRedact" @click="addData(scope.row, scope.$index)"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot="header"><i class="reqI">*</i><span>罐号</span></template>
              <template slot-scope="scope">
                <el-select v-model="scope.row.hloderId" placeholder="请选择" filterable v-if="scope.row.hloderId" size="mini" :disabled="!isRedact">
                  <el-option v-for="(sole, index) in PotList" :key="index" :value="sole.holderNo" :label="sole.holderName"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot="header"><i class="reqI">*</i><span>批次</span></template>
              <template slot-scope="scope">
                <el-input v-model="scope.row.batch" :disabled="!isRedact" placeholder="手工录入" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot="header"><i class="reqI">*</i><span>实际领料</span></template>
              <template slot-scope="scope">
                <el-input v-model="scope.row.receiveAmount" :disabled="!isRedact" placeholder="手工录入" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="110">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" :disabled="!isRedact" placeholder="手工录入" size="small"></el-input>
              </template>
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
import {BASICDATA_API, STERILIZED_API} from '@/api/api'
import {Stesave, GetStatus} from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {},
      activeName: '1',
      orderStatus: '',
      PotList: [],
      MaterialDate: []
    }
  },
  mounted () {
    this.GetOrderHead()
  },
  methods: {
    // 半成品领用list
    GetDataList () {
      this.$http(`${STERILIZED_API.STE_ENTER_MATERIAL_LIST_API}`, 'POST', {
        orderId: this.$store.state.common.sterilized.seiOrderId,
        factory: this.$store.state.common.sterilized.seiFactory,
        orderNo: this.$store.state.common.sterilized.seiOrderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.MaterialDate = data.list
          this.orderStatus = GetStatus(this.MaterialDate)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 拆分
    addData (row, index) {
      this.MaterialDate.splice(index + 1, 0, {
        delFlag: '0',
        hloderId: row.hloderId,
        id: '',
        indexNum: '',
        isSplit: '0',
        materialCode: row.materialCode,
        materialName: row.materialName,
        orderId: row.orderId,
        planAmount: row.planAmount,
        receiveAmount: null,
        remark: '',
        status: '',
        unit: row.unit
      })
    },
    GetPot (id) {
      this.$http(`${BASICDATA_API.PUPLWHEATLIST}`, 'POST', {types: ['006'], factory: id}).then(({data}) => {
        this.PotList = data.list
      })
    },
    // 保存提交
    UpdateMaterial (str, resolve, reject) {
      this.MaterialDate.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'saved' ? STERILIZED_API.STE_ENTER_MATERIAL_UPDATE_API : STERILIZED_API.STE_ENTER_MATERIAL_SUBMIT_API}`, 'POST', this.MaterialDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('原料领用' + data.msg)
          }
        }
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
        this.UpdateMaterial(str, resolve, reject)
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
          this.GetPot(this.formHeader.factory)
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
