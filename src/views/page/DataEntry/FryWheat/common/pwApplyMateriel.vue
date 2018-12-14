<!--生产入库-->
<template>
  <div style="background:#e9e9e9;">
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <div class="clearfix topBox">
          <div class="btn">
            <el-button type="primary" size="small">申请订单</el-button>
          </div>
        </div>
        <el-table
          ref="table1"
          header-row-class-name="tableHead"
          :data="materielDataList"
          :row-class-name="RowDelFlag"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            type="index"
            width="55"
            label="序号">
          </el-table-column>
          <el-table-column
            label="生产物料"
            width="200">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.materielNo" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.materielNo" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="生产数">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.produceNumber" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.produceNumber" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="单位">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="发料料号">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="小麦数量">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="麸皮">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="小颗粒">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="报废小麦">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="发料批次">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="入库数">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="入库批次">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="库存数">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="备注">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="生产订单">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                {{scope.row.unit}}
              </div>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script>
import { toDate } from '@/net/validate'
export default {
  data () {
    return {
      materielDataList: [],
      readAudit: []
    }
  },
  mounted () {
    this.GetMaterielData(this.orderNo)
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
        orderNo: this.orderNo,
        recordId: this.uuid(),
        // 物料编码
        materielNo: 'M010200001  小麦',
        // 粮仓号
        granaryNo: '',
        // 批次号
        batchNo: '',
        wheatWeight: '',
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
