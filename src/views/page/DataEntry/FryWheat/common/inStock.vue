<!--生产入库-->
<template>
  <div>
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
                  <div class="stock-button enabled" @click="addNewRecord('0001', '1#麦粉计量仓')" v-if="isRedact"> 入罐</div>
                  <div class="stock-button disabled"  else="isRedact"> 入罐</div>
                </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">2#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button enabled" @click="addNewRecord('0002', '2#麦粉计量仓')" v-if="isRedact">入罐</div>
                <div class="stock-button disabled"  else="isRedact"> 入罐</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">3#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button enabled" @click="addNewRecord('0003', '3#麦粉计量仓')" v-if="isRedact">入罐</div>
                <div class="stock-button disabled"  else="isRedact"> 入罐</div>
              </div>
            </el-col>
          </el-row>
          <!--table-->
          <el-row  style="margin-top:20px;">
            <el-col>
              <el-table @row-dblclick="modifyOldRecord" header-row-class-name="tableHead" :data="stockListData"  border tooltip-effect="dark" :row-class-name="RowDelFlag">
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
                    {{scope.row.stockName}}
                  </template>
                </el-table-column>
                <el-table-column width="80" label="粮仓">
                  <template slot-scope="scope">
                    {{scope.row.granaryNo}}
                  </template>
                </el-table-column>
                <el-table-column width="90" label="起始">
                  <template slot-scope="scope">
                    {{scope.row.startNumber}}
                  </template>
                </el-table-column>
                <el-table-column label="结束" width="90">
                  <template slot-scope="scope">
                    <span>{{scope.row.endNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库数" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.diffNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="80">
                  <template slot-scope="scope">
                     <span>{{scope.row.unit = 'KG'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库批次" width="150">
                  <template slot-scope="scope">
                     <span>{{scope.row.batchNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作人员" width="100">
                  <template slot-scope="scope">
                     <span>{{scope.row.operatorName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" width="100">
                  <template slot-scope="scope">
                     <span>{{scope.row.operateTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact"  @click="dellistbomS(scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--审批-->
    <el-row>
      <el-col :span="24">
        <auditLog :tableData="readAudit"></auditLog>
      </el-col>
    </el-row>
    <el-dialog :title="this.stockForm.stockName" :visible.sync="dialogFormVisible" width="450px">
      <el-form :model="stockForm" :rules="dataRule" ref="stockForm">
        <el-form-item label="粮仓" :label-width="formLabelWidth" required prop="granaryNo">
          <el-select @change="changeGranary" v-model="stockForm.granaryNo" value-key="granaryNo" placeholder="请选择粮仓" style="width:220px" :disabled="!isRedact">
            <el-option v-for="item in granaryList" :key="item.granaryNo" :label="item.granaryName" :value="item.granaryNo" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始(KG)" :label-width="formLabelWidth" required prop="startNumber">
          <el-input tyle='number' v-model.number="stockForm.startNumber" autocomplete="off" style="width:220px;" :disabled="!isRedact"></el-input>
        </el-form-item>
        <el-form-item label="结束(KG)" :label-width="formLabelWidth" required prop="endNumber">
          <el-input tyle='number' v-model.number="stockForm.endNumber" autocomplete="off" style="width:220px;" :disabled="!isRedact"></el-input>
        </el-form-item>
        <el-form-item label="入库批次" :label-width="formLabelWidth" required prop="batchNo">
          <el-input  v-model="stockForm.batchNo" autocomplete="off" style="width:220px;" :disabled="!isRedact"></el-input>
        </el-form-item>
         <el-form-item label="操作时间" :label-width="formLabelWidth">
          <!-- <el-input v-model="stockForm.operateTime" autocomplete="off"></el-input> -->
          <label>{{stockForm.operateTime}}</label>
          <!-- <el-date-picker type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" v-model="stockForm.operateTime" :disabled="!isRedact"></el-date-picker> -->
        </el-form-item>
         <el-form-item label="操作人" :label-width="formLabelWidth">
          <label>{{operator}}</label>
          <!-- <el-input v-model="stockForm.operatorId" autocomplete="off" style="width:220px;" :disabled="!isRedact"></el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" :disabled="!isRedact">取消</el-button>
        <el-button type="primary" @click="saveStockData()" :disabled="!isRedact">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat, toDate } from '@/net/validate'
export default {
  data () {
    return {
      // stoppageType: [],
      // equipmentType: [],
      // materialShort: [],
      // enery: [],
      stockListData: [],
      readAudit: [],
      granaryList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      stockForm: {
        // 订单号
        orderNo: '',
        // ID
        recordId: '',
        // 日期
        date: '',
        // 计量仓号
        stockNo: '',
        stockName: '',
        // 粮仓号
        granaryNo: '',
        granaryName: '',
        startNumber: '',
        endNumber: '',
        diffNumber: 0,
        // 入库批次
        batchNo: '',
        operateTime: '',
        operatorId: this.$store.state.user.name,
        operatorName: this.$store.state.user.realName,
        delFlag: '0'
      },
      dataRule: {
        granaryNo: [
          {required: true, message: '必选', trigger: 'click'}
        ],
        startNumber: [
          {required: true, message: '必填', trigger: 'blur'},
          {type: 'number', message: '必须为数字', trigger: 'blur'}
        ],
        endNumber: [
          {required: true, message: '必填', trigger: 'blur'},
          {type: 'number', message: '必须为数字', trigger: 'blur'}
        ],
        batchNo: [
          {required: true, message: '必填', trigger: 'blur'}
        ]
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
    this.GetGranaryList()
  },
  props: {
    isRedact: {},
    orderNo: String
  },
  methods: {
    addNewRecord (stockNo, stockName) {
      let now = new Date()
      // let year = now.getFullYear()
      // let month = now.getMonth() + 1
      // let day = now.getDate()
      // let hour = now.getHours()
      // let min = now.getMinutes()
      // let sec = now.getSeconds()
      let operateTime = dateFormat(now, 'yyyy-MM-dd hh:mm:ss')
      let operatorId = this.$store.state.user.name
      let operatorName = this.$store.state.user.realName
      let date = dateFormat(now, 'yyyy-MM-dd')
      let batchNo = ''
      this.stockForm = {granaryNo: '', granaryName: '', startNumber: '', endNumber: '', operateTime, operatorId, operatorName, orderNo: this.orderNo, stockNo, stockName, recordId: this.uuid(), date, batchNo, delFlag: '0'}
      this.dialogFormVisible = true
      if (this.$refs['stockForm'] !== undefined) {
        this.$refs['stockForm'].resetFields()
      }
    },
    modifyOldRecord (row) {
      if (!this.isRedact) {
        return
      }
      this.dialogFormVisible = true
      // if (this.$refs['stockForm'] !== undefined) {
      //   this.$refs['stockForm'].resetFields()
      // }
      this.stockForm = Object.assign({}, row)
    },
    saveStockData () {
      this.$refs['stockForm'].validate((valid) => {
        if (valid) {
          let currentRecord = this.stockListData.filter(data => data.recordId === this.stockForm.recordId)
          this.stockForm.diffNumber = this.stockForm.endNumber - this.stockForm.startNumber
          if (currentRecord && currentRecord.length > 0) {
            // modify
            Object.assign(currentRecord[0], this.stockForm)
          } else {
            // add
            let clone = Object.assign({}, this.stockForm)
            this.stockListData.push(clone)
          }
          this.dialogFormVisible = false
        }
      })
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

    GetGranaryList (obj) {
      // if (!obj) {
      //   obj = {
      //     type: 'holder_type',
      //     pageSize: 100000,
      //     currPage: 0
      //   }
      // }
      // this.$http(`${BASICDATA_API.CONTAINERLIST1_API}`, 'POST', obj).then(({data}) => {
      //   console.log(data)
      //   if (data.code === 0) {
      //     this.granaryList = data.page.list
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
      this.granaryList = [
        {
          'granaryNo': '0001',
          'granaryName': '1#粮仓'
        },
        {
          'granaryNo': '0002',
          'granaryName': '2#粮仓'
        },
        {
          'granaryNo': '0003',
          'granaryName': '3#粮仓'
        }
      ]
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
    changeGranary () {
      let now = new Date()
      this.stockForm.batchNo = dateFormat(now, 'yyMMdd') + this.stockForm.granaryNo
    },
    // 删除
    dellistbomS (row) {
      row.delFlag = '1'
    },
    // RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    }
  },
  computed: {
    operator: function () {
      return `(${this.stockForm.operatorId})${this.stockForm.operatorName}`
    },
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
    }
    .enabled{
      background:#F7F9FA;
      &:hover{
        color:#fff;
        background:#1890FF;
        cursor:pointer
      }
    }
    .disabled{
      color:rgba(0, 0, 0, 0.6);
      background:#F7F9FA;
      &:hover{
        cursor:not-allowed
      }
    }
  }
</style>
