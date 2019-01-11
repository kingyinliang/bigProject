<!--生产入库-->
<template>
  <div>
    <!--数据录入-->
    <el-card body-style="padding-top:10px;">
      <el-row>
        <el-col :span="12">
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
            <el-button type="primary" size="small" :disabled="!isRedact" @click="addNewRecord">新增</el-button>
            <el-button type="primary" style="margin-left:0px;" size="small" :disabled="!isRedact || !enableSubmit" @click="saveOrderMateriel">申请订单</el-button>
            <!-- <el-button type='primary' size="small" @click="saveMaterielList">baocun</el-button>
            <el-button type='primary' size="small" @click="submitMaterielList">tijiao</el-button> -->
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
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
              width="220">
              <template slot-scope="scope">
                <el-select @change="changeProduct(scope.row)"  v-model="scope.row.productCode" value-key="productCode" placeholder="请选择生产物料"  :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small">
                  <el-option v-for="(item, index) in dictListObj['CM_material_prd']" :key="index" :label="item.code + ' ' + item.name" :value="item.code" ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="生产数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input type="number"  v-model.number="scope.row.productWeight" @input="changeProductWeight(scope.row)" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
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
              width="220"
              label="发料料号">
              <template slot-scope="scope">
                <el-select @change="changeIssue(scope.row)"  v-model="scope.row.issueCode" value-key="issueCode" placeholder="请选择发料料号"  :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small">
                  <el-option v-for="(item, index) in dictListObj['CM_material']" :key="index" :label="item.code + ' ' + item.name" :value="item.code" ></el-option>
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
                <el-input type="number" v-model.number="scope.row.branWeight" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="小颗粒">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.granuleWeight" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="报废小麦">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.scrappedWeight" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="发料批次">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.issueBatch" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input type="number" v-model.number="scope.row.inStorageWeight"  :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入" ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="入库批次">
              <template slot-scope="scope">
                <el-input v-model="scope.row.inStorageBatch" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="库存数">
              <template slot-scope="scope">
                <el-input type="number" v-model.number="scope.row.storageWeight" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              width="200"
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
                <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'"  @click="dellistbomS(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <!--审批-->
    <el-row>
      <el-col :span="24">
        <auditLog :tableData="readAudit"></auditLog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { WHT_API, SYSTEMSETUP_API } from '@/api/api'
import { dateFormat } from '@/net/validate'
// const DICT_PW_FEVOR = 'PW_FEVOR'
// const DICT_CM_material_prd = 'CM_material_prd'
// const DICT_CM_material = 'CM_material'
export default {
  data () {
    return {
      dictListObj: {},
      dispatcherCode: 'TP1',
      dispatcherName: 'PW生产调度员',
      materielDataList: [],
      readAudit: []
    }
  },
  mounted () {
    this.getDictList()
    // this.getMaterielDataList()
  },
  props: {
    isRedact: Boolean,
    order: Object
  },
  methods: {
    // 申请订单
    saveOrderMateriel () {
      if (this.materielDataList.length > 0) {
        // 数据验证
        if (this.validate()) {
          for (let item of this.materielDataList) {
            item.status = 'submit'
            // item.productDate = this.order && this.order.productDate
          }
          this.$http(`${WHT_API.MATERIELSAVEORDER_API}`, 'POST', this.materielDataList).then(({data}) => {
            if (data.code === 0) {
              // 申请订单成功，订单号回写，触发全局刷新
              this.$emit('updateOrderInfo', {orderId: data.orderId, orderNo: data.orderNo})
            } else {
              this.$message.error(data.msg || '申请订单失败，请稍后尝试')
            }
          }).catch((error) => {
            console.log('catch data::', error)
          })
        }
      }
    },
    // 保存/提交
    saveOrSubmit (str, resolve) {
      if (this.materielDataList.length > 0) {
        if (str === 'saved') {
          this.materielDataList.forEach((item) => {
            if (item.status !== 'submit' || item.status !== 'checked') {
              item.status = 'saved'
            }
          })
        } else {
          this.materielDataList.forEach((item) => {
            if (item.status !== 'checked') {
              item.status = 'submit'
            }
          })
        }
        this.$http(WHT_API.MATERIELSAVE_API, 'POST', this.materielDataList).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$message.error(data.msg)
          }
          if (resolve) {
            resolve('resolve')
          }
        }).catch((error) => {
          console.log('catch data::', error)
        })
      }
    },
    SubmitMateriel (resolve) {
      this.$http(WHT_API.MATERIELSUBMIT_API, 'POST', this.materielDataList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch((error) => {
        console.log('catch data::', error)
      })
    },
    validate () {
      for (let item of this.materielDataList) {
        if (item.delFlag === '0') {
          if (item.productWeight === '') {
            this.$message.error('生产数不能为空')
            return false
          }
          if (item.issueBatch.trim() === '') {
            this.$message.error('发料批次不能为空')
            return false
          }
          if (item.inStorageWeight === '') {
            this.$message.error('入库数不能为空')
            return false
          }
        }
      }
      return true
    },
    getDictList () {
      // CM_material 发料物料 CM_material_prd 生产物料 PW_FEVOR  生产调度员
      this.dictListObj = {}
      let params = ['PW_FEVOR', 'CM_material_prd', 'CM_material']
      this.$http(`${SYSTEMSETUP_API.PARAMETERSLIST_API}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          for (let dict of data.dicList) {
            this.$set(this.dictListObj, dict.shname, dict.prolist)
          }
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log('catch data::', error)
      })
    },
    getMaterielDataList (orderId) {
      // if (typeof this.order === 'undefined' || typeof this.order.orderId === 'undefined') {
      //   return
      // }
      // console.log('为什么拿不到orderId', this.order.orderId)
      this.materielDataList = []
      this.readAudit = []
      this.$http(`${WHT_API.MATERIELLIST_API}`, 'POST', {orderId}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.materielDataList = data.wlist
          this.readAudit = data.vrlist
          let inState = ''
          let no = 0
          let sub = 0
          let che = 0
          let sav = 0
          this.materielDataList.forEach((item) => {
            if (item.status === 'noPass') {
              no = no + 1
            } else if (item.status === 'submit') {
              sub = sub + 1
            } else if (item.status === 'checked') {
              che = che + 1
            } else if (item.status === 'saved') {
              sav = sav + 1
            }
          })
          if (no > 0) {
            inState = 'noPass'
          } else if (sub > 0) {
            inState = 'submit'
          } else if (sav > 0) {
            inState = 'saved'
          } else if (che > 0) {
            inState = 'checked'
          }
          this.$emit('setAppyMaterielState', inState)
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log('catch data::', error)
      })
    },
    // 新增记录
    addNewRecord () {
      let nowStr = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      let user = this.$store.state.user.realName
      this.materielDataList.push({
        branWeight: 0,
        delFlag: '0',
        dispatchMan: this.dispatcherCode,
        gmCode: '02',
        // 小颗粒
        granuleWeight: 0,
        inStorageBatch: '',
        inStorageWeight: 0,
        // 发料批次
        issueBatch: '',
        issueCode: 'M010200001',
        issueName: '炒麦车间原料',
        // 发料数量
        issueWeight: 0,
        productCode: 'SP07010001',
        productName: 'PW小麦',
        productUnit: 'KG',
        productWeight: 0,
        remark: '',
        scrappedWeight: 0,
        storageWeight: 0,
        // this.order && this.order.productDate
        productDate: this.order && this.order.productDate,
        // this.order && this.order.factory
        factory: this.order && this.order.factory,
        // this.order && this.order.workShop
        workShop: this.order && this.order.workShop,
        // this.order && this.order.productLine
        productLine: this.order && this.order.productLine,
        created: nowStr,
        creator: user,
        changed: nowStr,
        changer: user,
        // 申请订单之后订单号回写，再次新增，订单号带过来
        orderId: this.order && this.order.orderId,
        orderNo: this.order && this.order.orderNo
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
    changeProductWeight: function (row) {
      for (let item of this.materielDataList) {
        if (item.recordId === row.recordId) {
          item.inStorageWeight = item.productWeight
        }
      }
    },
    changeDispatcher: function () {
      let dispatcher = this.dictListObj['PW_FEVOR'].find((item) => item.code === this.dispatcherCode)
      if (dispatcher) {
        this.dispatcherName = dispatcher.name
      }
    },
    changeProduct: function (row) {
      let product = this.dictListObj['CM_material_prd'].find((item) => item.code === row.productCode)
      if (product) {
        row.productName = product.name
      }
    },
    changeIssue: function (row) {
      let issue = this.dictListObj['CM_material'].find((item) => item.code === row.issueCode)
      if (issue) {
        row.issueName = issue.name
      }
    }
  },
  computed: {
    enableSubmit: function () {
      // 只有进来没订单号的请况下可以提交订单
      return typeof this.order === 'undefined' || typeof this.order.orderId === 'undefined' || this.order.orderId.trim().length === 0
    }
  },
  watch: {
    'order.productDate' (n, o) {
      // 监听头部生产日期
      this.materielDataList.forEach((item) => {
        if (item.status !== 'submit' && item.status !== 'checked') {
          item.productDate = n
        }
      })
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
