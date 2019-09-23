<template>
  <div>
    <div class="inStorage_card">
      <div style="width: 158px" class="inStorage_card_left">
        <p>过滤罐</p>
        <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
        <el-button type="text" class="inStorage_card_left_btn" size="small" :disabled="!(isRedact)" @click="showDialog()">入罐</el-button>
      </div>
      <div style="flex: 1">
        <el-table header-row-class-name="tableHead" :data="InStorageDate" border tooltip-effect="dark" :row-class-name="RowDelFlag" @row-dblclick="updateRow" >
          <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="日期" width="80" prop="created"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="成品罐号" width="95" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="成品批次" width="95" prop="batch" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="入罐数量" width="90" prop="inAmount" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="是否满罐" width="90" prop="isFull" :show-overflow-tooltip="true"><template slot-scope="scope">{{scope.row.isFull==='1'?'是':'否'}}</template></el-table-column>
          <el-table-column label="满罐时间" width="90" prop="fullDate" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="罐内库存" width="80" prop="holderRemaining" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作时间" width="100" prop="changed" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作人" width="80" prop="changer" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="70" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-button class="delBtn" type="text" icon="el-icon-delete" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @click="delRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="line-height: 32px;font-size: 14px;margin-top: 8px">产出数合计：{{countOutputNum}}</div>
      </div>
    </div>
    <el-card style="margin-top: 10px">
      <auditLog :tableData="DataAudit"></auditLog>
    </el-card>
    <el-dialog width="400px" title="入罐开始" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="addIn()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="成品罐号：" prop="holderId">
          <el-select v-model="dataForm.holderId" filterable placeholder="请选择" @change="PotinTankAmount" style="width: 100%">
            <el-option :label="item.holderName" v-for="(item, index) in PotList" :key="index" :value="item.holderId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <el-input v-model="dataForm.batch" placeholder="请输入" :disabled="PotObject.batch" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="入罐数量：">
          <el-input v-model="dataForm.inAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          {{dataForm.unit = '方'}}
        </el-form-item>
        <el-form-item label="罐内库存：">
          <el-input v-model="dataForm.holderRemaining" placeholder="请输入" :disabled="PotObject.inTankAmount"></el-input>
        </el-form-item>
        <el-form-item label="是否满罐：" prop="isFull">
          <el-select v-model="dataForm.isFull" filterable placeholder="请选择" style="width: 100%">
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
          {{dataForm.changer = $store.state.user.realName + '（' + this.$store.state.user.name + '）'}}
        </el-form-item>
        <el-form-item label="操作时间：">
          {{dataForm.changed}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false" size="small">取消</el-button>
          <el-button type="primary" @click="addIn()" size="small">确定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {FILTRATION_API} from '@/api/api'
import {dateFormat, GetStatus} from '@/net/validate'
export default {
  name: 'inStorage',
  data () {
    return {
      visible: false,
      dataForm: {},
      rowData: {},
      PotList: [],
      InStorageDate: [],
      DataAudit: [],
      instorageState: '',
      dataRule: {
        holderId: [
          { required: true, message: '半成品罐号不能为空', trigger: 'blur' }
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
  props: {
    isRedact: '',
    formHeader: {}
  },
  mounted () {
  },
  methods: {
    getList () {
      this.$http(`${FILTRATION_API.FILTER_IN_LIST_API}`, 'POST', {
        orderId: this.$store.state.common.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.InStorageDate = data.list
          this.instorageState = GetStatus(this.InStorageDate)
          this.DataAudit = data.vrlist
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      }).finally(() => {
        this.$emit('setInstorageState', this.instorageState)
      })
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
      this.$http(`${str === 'saved' ? FILTRATION_API.FILTER_IN_UPDATE_API : FILTRATION_API.FILTER_IN_SAVE_API}`, 'POST', this.InStorageDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('过滤入库' + data.msg)
          }
        }
      })
    },
    // 添加和修改确认
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
              item.amount = this.dataForm.holderRemaining
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
    // 获取半成品罐
    GetholderList (factory, workShop) {
      this.$http(`${FILTRATION_API.FILTER_IN_POT_API}`, 'POST', {
        factory: factory,
        workShop: workShop
      }, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.PotList = data.holderList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 半成品罐下拉
    PotinTankAmount (id) {
      this.dataForm.holderRemaining = this.PotList.filter(item => item.holderId === id)[0].amount / 1000
      this.dataForm.batch = this.PotList.filter(item => item.holderId === id)[0].batch
      if (this.dataForm.holderRemaining) {
        this.PotObject.inTankAmount = true
      } else {
        this.PotObject.inTankAmount = false
      }
      if (this.dataForm.batch) {
        this.PotObject.batch = true
      } else {
        this.PotObject.batch = false
      }
    },
    // 入罐
    showDialog () {
      this.visible = true
      this.dataForm = {
        id: '',
        status: '',
        isFull: '0',
        serialNumber: '',
        holderId: '',
        batch: '',
        inAmount: '',
        fullAmount: '',
        unit: '',
        holderRemaining: '',
        remark: '',
        delFlag: '0',
        holderName: '',
        fullDate: '',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        orderId: this.formHeader.orderId
      }
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    // 删除
    delRow (row) {
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = '1'
      })
    },
    updateRow (row) {
      if ((row.status === '' || row.status === 'saved' || row.status === 'noPass') && this.isRedact) {
        this.visible = true
        this.isUpdate = true
        this.dataForm = JSON.parse(JSON.stringify(row))
        this.rowData = row
        this.PotinTankAmount(this.dataForm.holderId)
      }
    }
  },
  computed: {
    countOutputNum: function () {
      let num = 0
      this.InStorageDate.forEach((item) => {
        num = num + (item.delFlag === '0' ? item.inAmount * 1 : 0)
      })
      return num
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss">
  .inStorage_card_left_btn{
    width: 100%;
    margin-top: 10px;
    border-radius: 0px 0px 6px 6px;
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
      &_btn{
        width: 100%;
        margin-top: 10px;
        background: #F7F9FA;
      }
    }
  }
</style>
