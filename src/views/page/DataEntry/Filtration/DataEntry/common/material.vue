<template>
  <div>
    <div class="inStorage_card">
      <div style="width: 158px" class="inStorage_card_left">
        <p>半成品罐</p>
        <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
        <el-button type="text" class="button" size="small" :disabled="!isRedact" @click="ShowDialog()">领用</el-button>
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
          <el-table-column prop="orderStatus" width="70">
            <template slot-scope="scope">
              <el-button class="delBtn" type="text" :disabled="!isRedact || scope.row.status === 'checked' || scope.row.status === 'submit'" icon="el-icon-delete" @click="DelRow(scope.row)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-card style="margin-top: 25px">
      <audit-log :tableData="readAudit"></audit-log>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="450px" custom-class='dialog__class' @keyup.enter.native="SaveDialog('receive')">
      <div slot="title" style="line-hight:59px">领用</div>
      <el-form :model="receive" size="small" label-width="160px" :rules="receiveRules" ref="receive">
        <el-form-item label="半成品罐号：" v-if="receive.id" prop="holderId">
          <el-input v-model="receive.holderId" :disabled="true" style="display:none"></el-input>
          <el-select v-model="receive.holderName" :disabled="true" ref="mySelect"></el-select>
        </el-form-item>
        <el-form-item label="半成品罐号：" prop="holderId" v-else>
          <el-select v-model="receive.holderId" filterable ref="mySelect">
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
          <!--<el-input v-model="receive.unit" style="width:220px"></el-input>-->
          {{receive.unit}}
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="receive.remark" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="SaveDialog('receive')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat, GetStatus } from '@/net/validate'
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
      dataAList: [],
      readAudit: [],
      repertory: []
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
        this.receive.receiveAmount = holderInfo.amount / 1000
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
          this.dataAList = JSON.parse(JSON.stringify(data.list))
          this.readAudit = data.verify
          this.materialStatus = GetStatus(data.list)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      }).finally(() => {
        this.$emit('setMaterialStatus', this.materialStatus)
      })
    },
    GetHolderList (params) {
      this.$http(`${FILTRATION_API.FILTER_MATERIAL_HOLDERLIST}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.holderList = data.holderList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ShowDialog () {
      this.receive = {
        id: '',
        uid: this.uuid(),
        receiveAmount: '',
        unit: '方',
        status: 'saved',
        delFlag: '0',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
      this.dialogVisible = true
    },
    SaveDialog (formName) {
      this.$refs.mySelect.handleClose()
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
            Object.assign(currentRecord[0], JSON.parse(JSON.stringify(this.receive)))
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
        this.$warning_SHINHO('请录入物料领用数据')
        return false
      }
      return ty
    },
    ReadyRepertoryRules () {
      let ty = true
      this.repertory = []
      this.dataList.map((item) => {
        // 领用数 库存比较
        if (!this.repertory.find(items => items.holderId === item.holderId)) {
          let soleAmount = 0
          if (this.holderList.find((itemss) => itemss.holderId === item.holderId)) {
            soleAmount = this.holderList.find((itemss) => itemss.holderId === item.holderId).amount
          } else {
            soleAmount = 0
          }
          this.dataAList.map(itema => {
            if (itema.delFlag === '0' && itema.holderId === item.holderId) {
              soleAmount = Number(soleAmount) + (Number(itema.receiveAmount) * 1000)
            }
          })
          this.repertory.push({
            holderId: item.holderId,
            holderName: item.holderName,
            holderAmount: soleAmount
          })
        }
      })
      for (let item of this.repertory) {
        let total = 0
        this.dataList.map((items) => {
          if (item.holderId === items.holderId && items.delFlag === '0') {
            total = Number(total) + Number(items.receiveAmount)
          }
        })
        if (total * 1000 > item.holderAmount) {
          ty = false
          this.$warning_SHINHO(item.holderName + '罐领用数超过库存，请重新调整')
          return false
        }
      }
      return ty
    },
    SaveMaterial (resolve, reject) {
      this.repertory = []
      this.dataList.map((item) => {
        item.orderId = this.orderId
        if (resolve === 'saved' && item.status === 'nopass') {
          item.status = 'saved'
        } else if (resolve === 'submit' && item.status !== 'checked') {
          item.status = 'submit'
        }
        // if (resolve === 'submit' && item.status !== 'checked') {
        //   item.status = 'submit'
        // }
      })
      let url = ''
      if (resolve === 'submit') {
        url = FILTRATION_API.FILTER_MATERIAL_SUBMIT
      } else {
        url = FILTRATION_API.FILTER_MATERIAL_SAVE
      }
      this.$http(url, 'POST', this.dataList).then(({data}) => {
        if (data.code === 0) {} else {
          this.$notify.error({title: '错误', message: data.msg})
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
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = 1
      })
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
