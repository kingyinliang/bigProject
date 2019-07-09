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
            杀菌入库
          </span>
          <div class="inStorage_card">
            <div style="width: 158px" class="inStorage_card_left">
              <p>杀菌罐</p>
              <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
              <el-button type="text" class="inStorage_card_left_btn" size="small" :disabled="!isRedact" @click="showDialog()">入罐</el-button>
            </div>
            <div style="flex: 1">
              <el-table header-row-class-name="tableHead" :data="InStorageDate" border tooltip-effect="dark">
                <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="日期" width="80" prop="unit"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="半成品罐号" width="95" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="半成品批次" width="95" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="入罐数量" width="90" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="满罐数量" width="90" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="罐内库存" width="80" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="是否满罐" width="80" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="备注" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作时间" width="100" prop="unit" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作人" width="80" prop="unit" :show-overflow-tooltip="true"></el-table-column>
              </el-table>
            </div>
          </div>
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
    <el-dialog
      width="400px"
      title="入罐开始"
      class="ShinHoDialog"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" @submit.native.prevent label-width="100px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="半成品罐号：">
          <el-select v-model="dataForm.holderId" filterable placeholder="请选择" style="width: 100%">
            <el-option :label="item.holderName" v-for="(item, index) in PotList" :key="index" :value="item.holderId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次：">
          <el-input v-model="dataForm.batch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="入罐数量：">
          <el-input v-model="dataForm.inAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          {{dataForm.unit = 'L'}}
        </el-form-item>
        <el-form-item label="罐内库存：">
          <el-input v-model="dataForm.inTankAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否满罐：">
          <el-select v-model="dataForm.isFull" filterable placeholder="请选择" style="width: 100%">
            <el-option label="请选择" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dataForm.remark" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="addIn()">确定</el-button>
      </span>
    </el-dialog>
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
      visible: false,
      isRedact: false,
      formHeader: {},
      activeName: '1',
      orderStatus: '',
      dataForm: {},
      PotList: [],
      InStorageDate: []
    }
  },
  mounted () {
    this.GetOrderHead()
  },
  methods: {
    // 数据列表
    GetDataList () {
      this.$http(`${STERILIZED_API.STE_ENTER_IN_LIST_API}`, 'POST', {
        orderId: this.$store.state.common.sterilized.inOrderId,
        factory: this.$store.state.common.sterilized.inFactory,
        orderNo: this.$store.state.common.sterilized.inOrderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.InStorageDate = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 入罐弹窗
    showDialog () {
      this.visible = true
      this.dataForm = {
        holderId: '',
        batch: '',
        inAmount: this.formHeader.planOutput,
        unit: '',
        inTankAmount: '',
        isFull: '',
        remark: ''
      }
    },
    addIn () {
      this.InStorageDate.push(this.dataForm)
      this.visible = false
    },
    // 罐列表
    GetPotList () {
      this.$http(`${STERILIZED_API.STE_ENTER_IN_POT_LIST_API}`, 'POST', {
        factory: this.formHeader.factory,
        workShop: this.formHeader.workShop
      }).then(({data}) => {
        if (data.code === 0) {
          this.PotList = data.halfList
        } else {
          this.$message.error(data.msg)
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
      this.$http(`${STERILIZED_API.STE_ORDER_HEAD_API}`, 'POST', {orderId: this.$store.state.common.sterilized.inOrderId}).then(({data}) => {
        if (data.code === 0) {
          this.isRedact = false
          this.formHeader = data.list[0]
          this.Stesave = new Stesave(this.formHeader)
          this.GetPotList()
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

<style lang="scss" scoped>
.inStorage_card{
  display: flex;
  &_left{
    padding: 0;
    margin-right: 5px;
    width:158px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 4px 0px rgba(0,0,0,0.09);
    border-radius:6px;
    border:1px solid rgba(0,0,0,0.09);
    p{
      padding: 10px;
      font-size: 14px;
    }
    &_btn{
      width: 100%;
      margin-top: 10px;
      background: #F7F9FA;
    }
  }
}
</style>
