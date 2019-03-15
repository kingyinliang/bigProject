<!--生产入库-->
<template>
  <div>
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <el-card body-style="padding-top:10px;">
          <div class="clearfix topBox">
            <div class="btn" style="margin-bottom:8px;">
              <el-button  style="float:right;"  type="primary" @click="addNewRecord()" size="small" :disabled="!isRedact || applyMaterielState == 'submit' || applyMaterielState == 'checked'">新增</el-button>
              <!-- <el-button  style="float:right;"  type="primary" @click="saveMaterielList()" size="small" >baocun</el-button>
              <el-button  style="float:right;"  type="primary" @click="submitMaterielList()" size="small" >tijiao</el-button> -->
              <div class='clearfix'></div>
            </div>
          </div>
          <el-table
            ref="table1"
            header-row-class-name="tableHead"
            :data="materielDataList"
            :row-class-name="rowDelFlag"
            border
            tooltip-effect="dark"
            style="width: 100%;  margin-bottom: 20px">
            <el-table-column
              label="物料"
              width="220">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-select @change="changeProduct(scope.row)"  v-model="scope.row.materialCode" value-key="materialCode" placeholder="请选择物料"  :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small">
                    <el-option v-for="(item, index) in materialDictList" :key="index" :label="item.code + ' ' + item.value" :value="item.code" ></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="粮仓"
              :show-overflow-tooltip="true"
              width="200">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-select @change="changeWheatContainer(scope.row)"  v-model="scope.row.deviceId" value-key="deviceId" placeholder="请选择粮仓" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small">
                    <el-option v-for="(item, index) in wheatContainerList" :key="index" :label="item.holderName" :value="item.holderId" ></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              label="物料批次">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input v-model="scope.row.batch" maxlength='10' size="small" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="160"
              label="小麦领用数">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-input type='number' v-model.number="scope.row.wheatWeight" size="small" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" placeholder="手工录入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="单位"
              width="80">
              <template slot-scope="scope">
                <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
                <span>{{ scope.row.weightUnit = 'KG'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              width="160">
              <template slot-scope="scope">
                <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
                <el-input v-model.number="scope.row.remark" size="small" :disabled="!isRedact || scope.row.status === 'submit' || scope.row.status === 'checked'" placeholder="手工录入"></el-input>
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
          <el-row style="margin-top:20px;">
            <el-col>
              <div><span>领用数合计：</span>{{totalInstock}} KG</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--审批-->
    <el-row >
      <el-col :span="24">
        <auditLog :tableData="readAudit"></auditLog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { WHT_API, BASICDATA_API, SYSTEMSETUP_API } from '@/api/api'
export default {
  data () {
    return {
      materialDictList: [],
      wheatContainerList: [],
      readAudit: [],
      materielDataList: []
    }
  },
  mounted () {
    this.getMaterialDictList()
    this.getWheatContainerList()
    // this.getMaterielDataList()
  },
  props: {
    isRedact: Boolean,
    applyMaterielState: String,
    order: Object
  },
  methods: {
    // 保存
    saveMateriel (resolve) {
      if (this.materielDataList.length > 0) {
        this.materielDataList.forEach((item) => {
          // 应产品要求，如果对不通过数据做修改保存操作，页签状态还是未通过，故此处不做状态赋值。
          // if (item.status !== 'submit' || item.status !== 'checked') {
          //   item.status = 'saved'
          // }
          // 新增行赋值saved
          if (typeof item.status === 'undefined' || item.status == null || item.status.trim() === '') {
            item.status = 'saved'
          }
        })
        this.$http(WHT_API.APPLYMATERIELSAVE_API, 'POST', this.materielDataList).then(({data}) => {
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
      } else {
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 物料提交
    submitMateriel (resolve) {
      if (this.materielDataList.length > 0) {
        this.materielDataList.forEach((item) => {
          if (item.status !== 'checked') {
            item.status = 'submit'
          }
        })
        this.$http(`${WHT_API.APPLYMATERIELSUBMIT_API}`, 'POST', this.materielDataList).then(({data}) => {
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
      } else {
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    validate () {
      if (this.materielDataList === undefined || this.materielDataList.length === 0) {
        this.$message.error('物料领用未录入数据')
        return false
      }
      for (let item of this.materielDataList) {
        if (item.delFlag === '0') {
          if (item.materialCode == null || item.materialCode.trim() === '') {
            this.$message.error('物料不能为空')
            return false
          }
          if (item.deviceId == null || item.deviceId === '') {
            this.$message.error('粮仓不能为空')
            return false
          }
          if (item.batch == null || item.batch.trim() === '') {
            this.$message.error('物料批次不能为空')
            return false
          }
          if (item.batch.trim().length > 10) {
            this.$message.error('物料批次长度不能超过10')
            return false
          }
          if (item.wheatWeight === '') {
            this.$message.error('小麦领用数不能为空')
            return false
          }
          if (item.wheatWeight <= 0) {
            this.$message.error('小麦领用数必须大于0')
            return false
          }
        }
      }
      return true
    },
    // 粮仓
    getWheatContainerList () {
      this.wheatContainerList = []
      if (typeof this.order === 'undefined' || typeof this.order.workShopName === 'undefined') {
        return
      }
      let params = {
        type: 'holder_type',
        holder_type: '002',
        // holder_no: '001',
        pageSize: 100,
        workShopName: this.order.workShopName,
        currPage: 1
      }
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.wheatContainerList = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log('catch data::', error)
      })
    },
    // 物料选项
    getMaterialDictList () {
      this.materialDictList = []
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=CM_material`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.materialDictList = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        console.log('catch data::', error)
      })
    },
    // 获取物料数据
    getMaterielDataList (orderId) {
      this.materielDataList = []
      this.readAudit = []
      // if (typeof this.order === 'undefined' || typeof this.order.orderId === 'undefined') {
      //   return
      // }
      let inState = ''
      this.$http(`${WHT_API.APPLYMATERIELLIST_API}`, 'POST', {order_id: orderId}).then(({data}) => {
        if (data.code === 0) {
          // success
          this.materielDataList = data.listForm
          this.readAudit = data.listApproval
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
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => {
        this.$emit('setApplyMaterielState', inState)
      })
    },
    // 新增
    addNewRecord () {
      // 复制上一条数据的手动录入部分
      let lastArr = this.materielDataList.filter(item => { return item.delFlag === '0' })
      let last = lastArr && lastArr.length > 0 ? lastArr[lastArr.length - 1] : null
      this.materielDataList.push({
        id: '',
        orderId: this.order.orderId,
        // 物料编码默认值
        materialCode: last ? last.materialCode : '',
        materialName: last ? last.materialName : '',
        // 粮仓号
        deviceId: last ? last.deviceId : '',
        // 粮仓名称
        holderName: last ? last.holderName : '',
        // 批次号
        batch: last ? last.batch : '',
        wheatWeight: last ? last.wheatWeight : 0,
        weightUnit: 'KG',
        remark: last ? last.remark : '',
        delFlag: '0'
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
    changeWheatContainer (row) {
      let ele = this.wheatContainerList.find((item) => item.holderId === row.deviceId)
      if (ele) {
        row.holderName = ele.holderName
      }
    },
    changeProduct: function (row) {
      let ele = this.materialDictList.find((item) => item.code === row.materialCode)
      if (ele) {
        row.materialName = ele.value
      }
    }
    // saveOrSubmitMateriel (str, resolve) {
    //   if (this.materielDataList.length > 0) {
    //     console.log(this.materielDataList)
    //     if (resolve) {
    //       resolve('resolve')
    //     }
    //   }
    // }
  },
  computed: {
    totalInstock: function () {
      let total = 0
      for (let ele of this.materielDataList) {
        if (ele.delFlag === '0' && typeof ele.wheatWeight === 'number') {
          total += parseFloat(ele.wheatWeight)
        }
      }
      return total
    }
  },
  watch: {
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
