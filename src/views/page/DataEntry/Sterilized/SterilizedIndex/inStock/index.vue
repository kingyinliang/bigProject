<template>
  <div class="header_main">
    <el-card class="searchCard" style="margin-bottom: 5px">
      <el-row type="flex">
        <el-col>
          <form-head :formHeader="formHeader"></form-head>
        </el-col>
        <el-col style="width: 100px">
          <div style="padding-top: 0px;float: right" :style="{'color': orderStatus === 'noPass'? 'red' : '' }"><span style="width: 5px;height: 5px;float: left;background: #1890FF;border-radius: 50%;margin-top: 7px;margin-right: 3px" :style="{'background': orderStatus === 'noPass'? 'red' : '#1890FF' }"></span>{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : '未录入' }}</div>
        </el-col>
      </el-row>
      <el-row style="text-align:right;position: absolute;bottom:10px;right: 20px;" class="buttonCss">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('ste:inStorage:mySaveOrUpdate')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('ste:inStorage:mySaveOrUpdate')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('ste:inStorage:submit')">提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">
          杀菌入库
        </span>
        <div class="inStorage_card">
          <div style="width: 158px" class="inStorage_card_left">
            <p>杀菌罐</p>
            <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
            <el-button type="text" class="inStorage_card_left_btn" size="small" :disabled="!(isRedact && (orderStatus !== 'submit' && orderStatus !== 'checked'))" @click="showDialog()">入罐</el-button>
          </div>
          <div style="flex: 1">
            <el-table header-row-class-name="tableHead" :data="InStorageDate" border tooltip-effect="dark" :row-class-name="RowDelFlag" @row-dblclick="updateRow" >
              <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="日期" width="80" prop="date"  :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="半成品罐号" width="95" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="半成品批次" width="95" prop="batch" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="入罐数量" width="80" prop="inAmount" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="满罐数量" width="80" prop="fullAmount" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="罐内库存" width="80" prop="inTankAmount" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="满罐" width="60" prop="isFull" :show-overflow-tooltip="true"> <template slot-scope="scope">{{scope.row.isFull === '1'? '是' : '否'}}</template></el-table-column>
              <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作时间"  prop="changed" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作人" width="80" prop="changer" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" width="50" prop="changer" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <el-button class="delBtn" type="text" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @click="delRow(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <auditLog :tableData="DataAudit"></auditLog>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">
          异常记录
        </span>
        <exc-record ref="excrecord" :isRedact="isRedact" :order="formHeader"></exc-record>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label" class="spanview">
          文本记录
        </span>
        <text-record ref="textrecord" :isRedact="isRedact"></text-record>
      </el-tab-pane>
    </el-tabs>
    <el-dialog width="400px" title="入罐" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="半成品罐号：" prop="holderId">
          <el-select v-model="dataForm.holderId" filterable placeholder="请选择" @change="PotinTankAmount" style="width: 100%">
            <el-option :label="item.holderName" v-for="(item, index) in PotList" :key="index" :value="item.holderId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <el-input v-model="dataForm.batch" placeholder="请输入" :disabled="PotObject.batch" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="入罐数量：">
          <el-input v-model="dataForm.inAmount" placeholder="请输入" @change="PotinTankAmount1"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          {{dataForm.unit = 'L'}}
        </el-form-item>
        <el-form-item label="罐内库存：">
          <el-input v-model="dataForm.inTankAmount" placeholder="请输入" :disabled="PotObject.inTankAmount"></el-input>
        </el-form-item>
        <el-form-item label="是否满罐：" prop="isFull">
          <el-select v-model="dataForm.isFull" filterable placeholder="请选择" style="width: 100%">
            <el-option label="请选择" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满罐时间：">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择" v-model="dataForm.fullDate" style="width: 190px"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dataForm.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="操作人：">
          {{$store.state.user.realName + '（' + this.$store.state.user.name + '）'}}
        </el-form-item>
        <el-form-item label="操作时间：">
          {{dataForm.date}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取消</el-button>
        <el-button type="primary" @click="addIn()" size="small" :disabled="PotObject.maxStatus">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
import {STERILIZED_API} from '@/api/api'
import {Stesave, dateFormat} from '@/net/validate'
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
      rowData: {},
      isUpdate: false,
      PotList: [],
      InStorageDate: [],
      DataAudit: [],
      dataRule: {
        holderId: [
          { required: true, message: '成品罐号不能为空', trigger: 'blur' }
        ],
        batch: [
          { required: true, message: '批次不能为空', trigger: 'blur' },
          { min: 10, max: 10, message: '批次长度为10 个字符', trigger: 'blur' }
        ],
        isFull: [
          { required: true, message: '是否满罐不能为空', trigger: 'blur' }
        ]
      },
      PotObject: {
        inTankAmount: false,
        batch: false,
        maxStatus: false
      }
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
          this.DataAudit = data.vList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
        remark: '',
        fullDate: '',
        date: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        orderId: this.formHeader.orderId,
        status: '',
        delFlag: '0',
        materialCode: this.formHeader.materialCode,
        materialName: this.formHeader.materialName,
        id: ''
      }
    },
    PotinTankAmount1 () {
      if (this.dataForm.holderId) {
        this.dataForm.inTankAmount = this.PotList.filter(item => item.holderId === this.dataForm.holderId)[0].amount ? this.PotList.filter(item => item.holderId === this.dataForm.holderId)[0].amount + this.dataForm.inAmount * 1 : 0 + this.dataForm.inAmount * 1
      }
    },
    PotinTankAmount (id) {
      this.dataForm.inTankAmount = this.PotList.filter(item => item.holderId === id)[0].amount ? this.PotList.filter(item => item.holderId === id)[0].amount + this.dataForm.inAmount * 1 : 0 + this.dataForm.inAmount * 1
      this.dataForm.batch = this.PotList.filter(item => item.holderId === id)[0].batch
      this.PotObject.inTankAmount = true
      // if (this.dataForm.inTankAmount) {
      //   this.PotObject.inTankAmount = true
      // } else {
      //   this.PotObject.inTankAmount = false
      // }
      if (this.dataForm.batch) {
        this.PotObject.batch = true
      } else {
        this.PotObject.batch = false
      }
    },
    // 弹窗确认
    addIn () {
      if (this.dataForm.isFull === '1') {
        if (!this.dataForm.fullDate) {
          this.$warning_SHINHO('满罐时间必填')
          return
        }
      }
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.PotList.forEach(item => {
            if (item.holderId === this.dataForm.holderId) {
              this.dataForm.holderName = item.holderName
              item.amount = this.dataForm.inTankAmount
              item.batch = this.dataForm.batch
            }
          })
          if (this.isUpdate) {
            Reflect.ownKeys(this.dataForm).forEach((key) => {
              this.rowData[key] = this.dataForm[key]
            })
          } else {
            this.InStorageDate.push(this.dataForm)
          }
          this.isUpdate = false
          this.visible = false
        }
      })
    },
    // 表格双击修改
    updateRow (row) {
      if ((row.status === '' || row.status === 'saved' || row.status === 'noPass') && this.isRedact) {
        this.visible = true
        this.isUpdate = true
        this.dataForm = JSON.parse(JSON.stringify(row))
        this.rowData = row
        this.PotinTankAmount(this.dataForm.holderId)
      }
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
          this.$notify.error({title: '错误', message: data.msg})
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
      let net1 = new Promise((resolve, reject) => {
        this.Stesave.excUpdate(this, 'In', resolve, reject)
      })
      let net2 = new Promise((resolve, reject) => {
        this.Stesave.textUpdate(this, 'In', resolve, reject)
      })
      let net3 = new Promise((resolve, reject) => {
        this.UpdateIn(str, resolve, reject)
      })
      if (str === 'submit') {
        let submitNet = Promise.all([net1, net2, net3])
        submitNet.then(() => {
          let net0 = new Promise((resolve, reject) => {
            this.Stesave.orderUpdate(this, 'insStatus', str, resolve, reject)
          })
          net0.then(() => {
            this.$notify({title: '成功', message: '提交成功', type: 'success'})
            this.GetOrderHead()
          }).catch((err) => {
            this.$notify.error({title: '错误', message: err})
          })
        }).catch((err) => {
          this.$notify.error({title: '错误', message: err})
        })
      } else {
        let savedNet = Promise.all([net1, net2, net3])
        savedNet.then(() => {
          let net0 = new Promise((resolve, reject) => {
            this.Stesave.orderUpdate(this, 'insStatus', str, resolve, reject)
          })
          net0.then(() => {
            this.$notify({title: '成功', message: '保存成功', type: 'success'})
            this.GetOrderHead()
          })
        }).catch((err) => {
          this.$notify.error({title: '错误', message: err})
        })
      }
    },
    // 入库修改
    UpdateIn (str, resolve, reject) {
      this.InStorageDate.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'saved' ? STERILIZED_API.STE_ENTER_IN_UPDATE_API : STERILIZED_API.STE_ENTER_IN_SUBMIT_API}`, 'POST', this.InStorageDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('杀菌入库' + data.msg)
          }
        }
      })
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    delRow (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = '1'
      })
    },
    // 获取订单表头
    GetOrderHead () {
      this.$http(`${STERILIZED_API.STE_ORDER_HEAD_API}`, 'POST', {orderId: this.$store.state.common.sterilized.inOrderId}).then(({data}) => {
        if (data.code === 0) {
          this.isRedact = false
          this.formHeader = data.list[0]
          this.orderStatus = data.list[0].insStatus
          this.Stesave = new Stesave(this.formHeader)
          this.GetPotList()
          this.$refs.excrecord.GetequipmentType(this.formHeader.productLine)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          if (this.formHeader.status !== '') {
            this.GetDataList()
            this.$refs.excrecord.GetExcDate({
              order_id: this.formHeader.orderId,
              sign: 'In'
            })
            this.$refs.textrecord.GetText({
              order_id: this.formHeader.orderId,
              sign: 'In'
            })
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
    },
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss">
  .inStorage_card_left_btn{
    width: 100%;
    margin-top: 10px!important;
    border-radius: 0px 0px 6px 6px!important;
  }
  .inStorage_card_left_btn:hover{
    color: white!important;
    background: #1890FF!important;
  }
</style>
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
  }
}
</style>
