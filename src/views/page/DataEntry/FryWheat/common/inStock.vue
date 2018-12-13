<!--生产入库-->
<template>
  <div style="background:#e9e9e9;">
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <el-card >
          <!--录入-->
          <el-row :gutter="36">
            <el-col :span="8">
                <div class="stock-box">
                  <div class="stock-img"></div>
                  <div class="stock-text">1#麦粉计量仓</div>
                  <div class="clearfix"></div>
                  <div class="stock-button" @click="addNewRecord('1#计量仓')">入罐</div>
                </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">2#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button" @click="addNewRecord('2#计量仓')">入罐</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">3#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button" @click="addNewRecord('3#计量仓')">入罐</div>
              </div>
            </el-col>
          </el-row>
          <!--table-->
          <el-row style="margin-top:20px;">
            <el-col>
              <el-table @row-click="modifyOldRecord" header-row-class-name="tableHead" :data="stockListData" :row-class-name="RowDelFlag" border tooltip-effect="dark">
                <el-table-column label="日期" width="130">
                  <template slot-scope="scope">
                    {{scope.row.date}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="麦粉计量仓"
                  :show-overflow-tooltip="true"
                  width="120">
                  <template slot-scope="scope">
                    {{scope.row.stockNumber}}
                  </template>
                </el-table-column>
                <el-table-column width="80" label="粮仓">
                  <template slot-scope="scope">
                    {{scope.row.granaryNumber}}
                  </template>
                </el-table-column>
                <el-table-column width="90" label="起始">
                  <template slot-scope="scope">
                    {{scope.row.startWeight}}
                  </template>
                </el-table-column>
                <el-table-column label="结束" width="90">
                  <template slot-scope="scope">
                    <span>{{scope.row.endWeight}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库数" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unit = 'AAA'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="80">
                  <template slot-scope="scope">
                     <span>{{scope.row.unit = 'KG'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库批次" width="150">
                  <template slot-scope="scope">
                     <span>{{scope.row.batchNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作人员" width="100">
                  <template slot-scope="scope">
                     <span>{{scope.row.operator}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" width="100">
                  <template slot-scope="scope">
                     <span>{{scope.row.operateTime}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--审批-->
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card>
          <auditLog :tableData="readAudit"></auditLog>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="1#麦粉计量仓入库" :visible.sync="dialogFormVisible">
      <el-form :model="stockForm">
        {{stockForm.recordId}}
        <el-form-item label="粮仓" :label-width="formLabelWidth">
          <el-select v-model="stockForm.granaryNumber" placeholder="请选择粮仓">
            <el-option label="粮仓一" value="粮仓1#"></el-option>
            <el-option label="粮仓二" value="粮仓2#"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始(KG)" :label-width="formLabelWidth">
          <el-input v-model="stockForm.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束(KG)" :label-width="formLabelWidth">
          <el-input v-model="stockForm.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库批次" :label-width="formLabelWidth">
          <el-input v-model="stockForm.batchNumber" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="操作时间" :label-width="formLabelWidth">
          <el-input v-model="stockForm.operateTime" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="操作人" :label-width="formLabelWidth">
          <el-input v-model="stockForm.operator" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStockData()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {SYSTEMSETUP_API} from '@/api/api'
import { toDate } from '@/net/validate'
export default {
  data () {
    return {
      // stoppageType: [],
      // equipmentType: [],
      // materialShort: [],
      // enery: [],
      stockListData: [],
      readAudit: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      stockForm: {
        // 订单号
        orderNo: '',
        // ID
        recordId: '',
        // 计量仓号
        stockNumber: '',
        // 粮仓号
        granaryNumber: '',
        startWeight: '',
        endWeight: '',
        // 入库批次
        batchNumber: '',
        operateTime: '',
        operator: ''
      }
    }
  },
  mounted () {
    // this.GetstoppageType()
    // this.GetmaterialShort()
    // this.Getenery()
    console.log('+++++++++++++++++++++++++' + this.orderNo)
    this.GetStockData(this.orderNo)
    this.GetEditLog()
  },
  props: {
    isRedact: {},
    orderNo: String
  },
  methods: {
    addNewRecord (stockNumber) {
      this.stockForm = Object.assign({}, {'orderNo': this.orderNo, stockNumber, 'recordId': this.uuid(), 'date': new Date()})
      this.dialogFormVisible = true
    },
    modifyOldRecord (row) {
      this.stockForm = Object.assign({}, row)
      this.dialogFormVisible = true
    },
    saveStockData () {
      let currentRecord = this.stockListData.filter(data => data.recordId === this.stockForm.recordId)
      if (currentRecord && currentRecord.length > 0) {
        // modify
        Object.assign(currentRecord[0], this.stockForm)
        // this.stockListData.push(this.stockForm)
      } else {
        // new
        this.stockListData.push(this.stockForm)
      }
      this.dialogFormVisible = false
    },
    // 保存or提交
    saveOrSubmitStock (str, resolve) {
      if (this.stockListData.length > 0) {
        console.log(this.stockListData)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 获取入库数据
    GetStockData (id) {
      // this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: id}).then(({data}) => {
      //   if (data.code === 0) {
      //     this.stockListData = data.listForm
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
      this.stockListData = []
    },
    GetEditLog () {
      this.readAudit = [
        {
          'status': 'noPass',
          'memo': '数据不对',
          'verify_man': '张三',
          'verify_date': '2018-03-21 10:21:40'
        },
        {
          'status': 'noPass',
          'memo': '数据不对',
          'verify_man': '张三',
          'verify_date': '2018-03-21 10:21:40'
        },
        {
          'status': 'noPass',
          'memo': '数据不对',
          'verify_man': '张三',
          'verify_date': '2018-03-21 10:21:40'
        }
      ]
    },
    uuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      var uuid = s.join('')
      return uuid
    },
    // 异常记录校验
    excrul () {
      let ty = true
      this.ExcDate.forEach((item) => {
        if (item.delFlag !== '1') {
          if (item.expCode && item.expStartDate && item.expEndDate) {
            if ((item.expContinue * 1) < 0) {
              ty = false
              this.$message.error('异常开始时间大于结束时间')
              return false
            }
            if (item.expCode === '001' || item.expCode === '002') {
              if (!item.deviceId) {
                ty = false
                this.$message.error('异常记录设备必填')
                return false
              }
            } else if (item.expCode === '003' || item.expCode === '004') {
              if (!item.materialShort) {
                ty = false
                this.$message.error('异常记录物料分类必填')
                return false
              }
            } else if (item.expCode === '005') {
              if (!item.energy) {
                ty = false
                this.$message.error('异常记录能源必填')
                return false
              }
            }
          } else {
            ty = false
            this.$message.error('异常记录必填项未填')
            return false
          }
        }
      })
      return ty
    },
    // 获取异常情况
    GetstoppageType () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=stoppage_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.stoppageType = data.dicList
        } else {
          this.$message.error(data.msg)
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
    }
  },
  computed: {
    mistiming: function () {
      return function (end, start, row) {
        if (end && start && row.delFlag !== '1') {
          if (((toDate(end) - toDate(start)) / 60000) < 0) {
            this.$message.error('异常结束时间早于异常开始时间，请重新录入')
            return 'NaN'
          } else {
            return (toDate(end) - toDate(start)) / 60000
          }
        }
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
  .stock-box{
    height: 184px;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    .stock-img{
      width:48px;
      height:48px;
      border-radius:24px;
      background:#FFBF00;
      float:left;
      margin-left:24px;
      margin-top:24px;
    }
    .stock-text{
      float:left;
      margin-left:20px;
      margin-top:30px;
      font-size:16px;
      font-weight:500;
      font-family:PingFangSC-Medium;
    }
    .stock-button{
      height:48px;
      margin-top:62px;
      font-size:14px;
      line-height:48px;
      text-align:center;
      border-top:1px solid #e9e9e9;
      border-radius: 0 0 2px 2px;
      color:rgba(0, 0, 0, 0.45);
      background:#F7F9FA;
      &:hover{
        color:#fff;
        background:#1890FF;
        cursor:pointer
      }
    }
  }
</style>
