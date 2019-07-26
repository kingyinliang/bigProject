<template>
  <div>
    <div class="inStorage_card">
      <div style="width: 158px" class="inStorage_card_left">
        <p>半成品罐</p>
        <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
        <el-button type="text" class="button" size="small" :disabled="!isRedact" @click="ShowDialog()">入罐</el-button>
      </div>
      <div style="flex: 1">
        <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" @row-dblclick="updateRow" :row-class-name="rowDelFlag">
          <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="半成品罐号" width="120" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="物料批次" width="110" prop="batch" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="领用数" width="100" prop="receiveAmount" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作时间" width="160" prop="changed" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作人" width="150" prop="changer" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="orderStatus" width="50">
            <template slot-scope="scope">
              <el-button type="danger" :disabled="!isRedact || scope.row.status === 'checked' || scope.row.status === 'submit'" icon="el-icon-delete" circle @click="DelRow(scope.row)" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-card style="margin-top: 25px">
      <audit-log :tableData="readAudit"></audit-log>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="450px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">领用</div>
      <el-form :model="receive" size="small" label-width="160px" :rules="receiveRules" ref="receive">
        <el-form-item label="半成品罐号" prop="holderId">
          <el-select v-model="receive.holderId" filterable>
            <el-option v-for="(item, index) in holderList" :key="index" :value="item.holderId" :label="item.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：">
          {{this.receive.materialCode}} {{this.receive.materialName}}
        </el-form-item>
        <el-form-item label="批次：">
          {{this.receive.batch}}
        </el-form-item>
        <el-form-item label="领用数：" prop="receiveAmount">
          <el-input v-model="receive.receiveAmount" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          <el-input v-model="receive.unit" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="receive.remark" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveDialog('receive')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/net/validate'
import { FILTRATION_API } from '@/api/api'
export default {
  name: 'material',
  data () {
    return {
      orderId: '',
      dialogVisible: false,
      receive: {},
      receiveRules: {
        holderId: [
          { required: true, message: '请选择半成品罐号', trigger: 'change' }
        ],
        receiveAmount: [
          { required: true, message: '请输入领用数', trigger: 'blur' }
        ]
      },
      holderList: [],
      dataList: [],
      readAudit: []
    }
  },
  props: ['isRedact'],
  watch: {
    'receive.holderId' (n, o) {
      if (n && n !== '') {
        let holderInfo = this.holderList.find((item) => item.holderId === n)
        this.receive.batch = holderInfo.batch
        this.receive.materialCode = holderInfo.materialCode
        this.receive.materialName = holderInfo.materialName
        this.receive.materialcn = holderInfo.materialCode + holderInfo.materialName
        this.receive.receiveAmount = holderInfo.amount
        this.receive.holderName = holderInfo.holderName
      }
    }
  },
  methods: {
    GetList (params) {
      this.orderId = params.orderId
      this.$http(`${FILTRATION_API.FILTER_MATERIAL_LIST}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.list
          this.readAudit = data.verify
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    GetHolderList (params) {
      this.$http(`${FILTRATION_API.FILTER_MATERIAL_HOLDERLIST}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.holderList = data.holderList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    ShowDialog () {
      this.receive = {
        id: '',
        uid: this.uuid(),
        unit: '方',
        status: 'saved',
        delFlag: '0',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
      this.dialogVisible = true
    },
    SaveDialog (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let currentRecord = []
          if (this.receive.hasOwnProperty('uid')) {
            // 新增行
            currentRecord = this.dataList.filter(data => data.uid === this.receive.uid)
          } else {
            // 原有行
            currentRecord = this.dataList.filter(data => data.id === this.receive.id)
          }
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], this.receive)
          } else {
            this.dataList.push(this.receive)
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    updateRow (row) {
      if (this.isRedact === true && (row.status !== 'checked' && row.status !== 'submit')) {
        this.dialogVisible = true
        this.receive = Object.assign({}, row)
      }
    },
    Readyrules () {
      let ty = true
      let i = 0
      this.dataList.map((item) => {
        if (item.delFlag === '0') {
          i = 1
        }
      })
      if (i === 0) {
        ty = false
        this.$message.error('请录入物料领用数据')
        return false
      }
      return ty
    },
    SaveMaterial (resolve, reject) {
      this.dataList.map((item) => {
        item.orderId = this.orderId
        if (resolve === 'submit' && item.status !== 'checked') {
          item.status = 'submit'
        }
      })
      this.$http(`${FILTRATION_API.FILTER_MATERIAL_SAVE}`, 'POST', this.dataList).then(({data}) => {
        if (data.code === 0) {} else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    DelRow (row) {
      row.delFlag = 1
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === 1) {
        return 'rowDel'
      } else {
        return ''
      }
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.rowDel { display: none}
.inStorage_card{
  display: flex;
  .button {
    border:none; background:none;
    padding: 0px;
    width: 100%;
    line-height: 32px;
    margin-top: 10px;
    background: #f7f9fa;
  }
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
