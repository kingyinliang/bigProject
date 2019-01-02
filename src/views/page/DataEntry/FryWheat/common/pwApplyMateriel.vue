<!--生产入库-->
<template>
  <div>
    <!--数据录入-->
    <el-card body-style="padding-top:10px;">
      <el-row>
        <el-col :span="12"  v-loading="loading2">
          <el-form ref="form" label-width="100px">
            <el-form-item label="生产调度员" style='margin-bottom:0px;'>
              <el-select @change="changeDispatcher" v-model="dispatcherCode" value-key="dispatcherCode" placeholder="请选择生产调度员" :disabled="!isRedact" size="small">
                <el-option v-for="(item, index) in this.dictListObj['PW_FEVOR']" :key="index" :label="item.name" :value="item.code" ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <div class="btn" style="float:right;">
            <el-button type="primary" size="small" :disabled="!isRedact" @click="addNewRecord()">新增</el-button>
            <el-button type="primary" style="margin-left:0px;" size="small" :disabled="!isRedact || !enableSubmit" @click="saveOrderMateriel">申请订单</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-loading="loading || loading2">
          <el-table
            ref="table1"
            header-row-class-name="tableHead"
            :data="materielDataList"
            :row-class-name="rowDelFlag"
            border
            tooltip-effect="dark"
            style="width: 100%;margin-bottom: 20px">
            <el-table-column
              label="生产物料"
              width="160">
              <template slot-scope="scope">
                <el-select @change="changeProduct"  v-model="scope.row.productCode" value-key="productCode" placeholder="请选择生产物料"  :disabled="!isRedact">
                  <el-option v-for="(item, index) in dictListObj['CM_material_prd']" :key="index" :label="item.name" :value="item.code" ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="生产数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input type="number"  v-model.number="scope.row.productWeight" @input="changeProductWeight(scope.row)" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="60"
              label="单位">
              <template slot-scope="scope">
                {{scope.row.productUnit = 'KG'}}
              </template>
            </el-table-column>
            <el-table-column
              width="160"
              label="发料料号">
              <template slot-scope="scope">
                <el-select @change="changeIssue"  v-model="scope.row.issueCode" value-key="issueCode" placeholder="请选择发料料号"  :disabled="!isRedact">
                  <el-option v-for="(item, index) in dictListObj['CM_material']" :key="index" :label="item.name" :value="item.code" ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="小麦数量">
              <template slot-scope="scope">
                {{scope.row.issueWeight = Number(scope.row.branWeight) +  Number(scope.row.granuleWeight) +  Number(scope.row.scrappedWeight) + Number(scope.row.inStorageWeight) }}
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="麸皮">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.branWeight" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="小颗粒">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.granuleWeight" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="报废小麦">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.scrappedWeight" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="发料批次">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.issueBatch" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input type="number" v-model.number="scope.row.inStorageWeight"  :disabled="!isRedact" size="small"  placeholder="手工录入" ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库批次">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inStorageBatch" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="库存数">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.storageWeight" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" :disabled="!isRedact" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="生产订单">
              <template slot-scope="scope">
                {{scope.row.orderId}}
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
    <el-row v-loading="loading">
      <el-col :span="24">
        <auditLog :tableData="readAudit"></auditLog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { WHT_API, SYSTEMSETUP_API } from '@/api/api'
import { dateFormat } from '@/net/validate'
const DICT_PW_FEVOR = 'PW_FEVOR'
const DICT_CM_material_prd = 'CM_material_prd'
const DICT_CM_material = 'CM_material'
export default {
  data () {
    return {
      dictListObj: {},
      dispatcherCode: 'TP1',
      materielDataList: [],
      readAudit: [],
      loading: true,
      loading2: true
    }
  },
  mounted () {
    // this.getDispatcherList()
    // this.getMaterialPrdList()
    this.getDictList()
    this.getMaterielDataList()
  },
  props: {
    isRedact: Boolean,
    order: Object
  },
  methods: {
    // 提交订单
    saveOrderMateriel (str, resolve) {
      if (this.materielDataList.length > 0) {
        // 数据验证
        if (true) {
          let nowStr = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
          let user = this.$store.state.user.realName
          for (let item of this.materielDataList) {
            Object.assign(item, {created: nowStr, creator: user, changed: nowStr, changer: user, status: 'submit'})
          }
          this.$http(`${WHT_API.MATERIELSAVEORDER_API}`, 'POST', this.materielDataList).then(({data}) => {
            if (data.code === 0) {
              // 修改orderId
              this.$emit('updateOrderInfo', {orderId: data.orderId, orderNo: data.orderNo})
            } else {
              this.$message.error(data.msg)
            }
            if (resolve) {
              resolve('resolve')
            }
          })
        }
      }
    },
    getDictList () {
      // CM_material 发料物料
      // CM_material_prd 生产物料
      // PW_FEVOR  生产调度员
      this.dictListObj = {}
      let params = ['PW_FEVOR', 'CM_material_prd', 'CM_material']
      this.$http(`${SYSTEMSETUP_API.PARAMETERSLIST_API}`, 'POST', params).then(({data}) => {
        this.loading2 = false
        if (data.code === 0) {
          for (let dict of data.dicList) {
            this.$set(this.dictListObj, dict.shname, dict.prolist)
            // this.dictListObj[] = dict.prolist
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getMaterielDataList () {
      this.materielDataList = []
      if (typeof this.order === 'undefined' || typeof this.order.orderId === 'undefined') {
        this.loading = false
        return
      }
      this.$http(`${WHT_API.MATERIELLIST_API}`, 'POST', {orderId: this.order.orderId}).then(({data}) => {
        this.loading = false
        if (data.code === 0) {
          this.materielDataList = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增记录
    addNewRecord () {
      this.materielDataList.push({
        branWeight: 0,
        delFlag: '0',
        dispatchMan: '',
        gmCode: '02',
        // 小颗粒
        granuleWeight: 0,
        inStorageBatch: '',
        inStorageWeight: 0,
        // 发料批次
        issueBatch: '',
        issueCode: 'M010200001',
        issueNaem: '',
        // 发料数量
        issueWeight: 0,
        productCode: 'SP07010001',
        productNaem: '',
        productUnit: 'KG',
        productWeight: 0,
        remark: '',
        scrappedWeight: 0,
        status: 'submit',
        storageWeight: 0
      })
    },
    // 删除
    dellistbomS (row) {
      row.delFlag = '1'
    },
    //  RowDelFlag
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    getEditLog () {
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
    changeProductWeight: function (row) {
      for (let item of this.materielDataList) {
        if (item.recordId === row.recordId) {
          item.inStorageWeight = item.productWeight
        }
      }
    },
    changeDispatcher: function () {

    },
    changeProduct: function () {

    },
    changeIssue: function () {

    }
  },
  computed: {
    enableSubmit: function () {
      // 只有进来没订单号的请况下可以提交订单
      return typeof this.order === 'undefined' || typeof this.order.orderId === 'undefined'
    }
  },
  watch: {
    'order.orderId' (n, o) {
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh')
      this.loading = true
      this.getMaterielDataList()
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
