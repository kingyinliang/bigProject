<!--生产入库-->
<template>
  <div>
    <!--数据录入-->
    <el-card>
      <el-row>
        <el-col span="12"  style="margin-top:10px;">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="生产调度员">
              <el-select value="tp1" :disabled="!isRedact">
                <el-option label="TP1" value="tp1" selected ></el-option>
                <el-option label="TP2" value="tp2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col span="12" style="margin-top:10px;">
          <div class="btn" style="float:right;">
            <el-button type="primary" size="small" :disabled="!isRedact" @click="AddMaterielData()">新增</el-button>
            <el-button type="primary" size="small" :disabled="!isRedact">申请订单</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            ref="table1"
            header-row-class-name="tableHead"
            :data="materielDataList"
            :row-class-name="RowDelFlag"
            border
            tooltip-effect="dark"
            style="width: 100%;margin-bottom: 20px">
            <el-table-column
              label="生产物料"
              width="200">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.materielNo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="生产数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.produceNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="60"
              label="单位">
              <template slot-scope="scope">
                {{scope.row.unit = 'KG'}}
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="发料料号">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.materielId" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="小麦数量">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.wheatNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="麸皮">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.branNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="小颗粒">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.smallWheatNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="报废小麦">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.scrapWheatNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="发料批次">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.materielBatchNo" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.inboundNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库批次">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.batchNo" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="库存数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.inventoryNumber" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="备注">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.note" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="生产订单">
              <template slot-scope="scope">
                {{scope.row.orderNo}}
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
    <!--审批-->
    <el-row >
      <el-col :span="24">
        <auditLog :tableData="readAudit"></auditLog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toDate } from '@/net/validate'
export default {
  data () {
    return {
      materielDataList: [],
      readAudit: [],
      orderId: this.orderNo
    }
  },
  mounted () {
    this.GetMaterielData(this.orderId)
    this.GetEditLog()
  },
  props: {
    isRedact: {}
  },
  methods: {
    // 保存or提交
    saveOrSubmitMateriel (str, resolve) {
      if (this.materielDataList.length > 0) {
        console.log(this.materielDataList)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 获取异常数据
    GetMaterielData (id) {
      // this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: id}).then(({data}) => {
      //   if (data.code === 0) {
      //     this.ExcDate = data.listForm
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
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
    // 新增异常记录
    AddMaterielData () {
      this.materielDataList.push({
        orderNo: this.orderId,
        recordId: this.uuid(),
        // 物料编码
        materielNo: 'M010200001  小麦',
        // 粮仓号
        produceNumber: '',
        // 发料料号
        materielId: '',
        // 小麦数量
        wheatNumber: '',
        // 麸皮
        branNumber: '',
        // 小颗粒
        smallWheatNumber: '',
        // 报废小麦
        scrapWheatNumber: '',
        // 发料批次
        materielBatchNo: '',
        // 入库数
        inboundNumber: '',
        // 入库批次
        batchNo: '',
        // 库存数
        inventoryNumber: '',
        // 备注
        note: '',
        // 单位
        unit: '',
        delFlag: '0'
      })
      console.log('+++++++++++++++++++++= ' + this.materielDataList.length)
    },
    // 删除
    dellistbomS (row) {
      row.delFlag = '1'
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
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
</style>
