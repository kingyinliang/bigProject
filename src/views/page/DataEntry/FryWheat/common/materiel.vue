<!--生产入库-->
<template>
  <div style="background:#e9e9e9;">
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <div class="clearfix topBox">
          <div class="btn">
            <el-button type="primary" @click="AddMaterielData(materielData)" size="small" v-if="isRedact">新增</el-button>
            <el-button type="primary" @click="AddMaterielData(materielData)" size="small" v-else disabled>新增</el-button>
          </div>
        </div>
        <el-table
          ref="table1"
          header-row-class-name="tableHead"
          :data="materielData"
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
            label="物料"
            width="150">
            <template slot-scope="scope">
              <!-- <div class="required">
                <i class="reqI">*</i>
                <el-select v-model="scope.row.expCode" placeholder="请选择"  v-if="!isRedact" size="small" disabled>
                  <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                </el-select>
                <el-select v-model="scope.row.expCode" placeholder="请选择" v-else size="small" @change="setnull(scope.row)">
                  <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                </el-select>
              </div> -->
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.materialNum" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.materialNum" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="粮仓"
            :show-overflow-tooltip="true"
            width="220">
            <template slot-scope="scope">
              <el-input v-model="scope.row.granary" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
              <el-input v-model="scope.row.granary" v-else size="small" placeholder="手工录入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="物料批次">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.batchNumber" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.batchNumber" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="小麦领用数">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.wheat" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.wheat" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            width="80">
            <template slot-scope="scope">
              <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
              <span>{{ scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact" @click="dellistbomS(scope.row, delFlagnum.excnum)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {SYSTEMSETUP_API, PACKAGING_API, BASICDATA_API} from '@/api/api'
import { toDate } from '@/net/validate'
export default {
  name: 'excRecord',
  data () {
    return {
      stoppageType: [],
      equipmentType: [],
      materialShort: [],
      enery: [],
      stockData: [],
      materielData: []
    }
  },
  mounted () {
    this.GetstoppageType()
    this.GetmaterialShort()
    this.Getenery()
  },
  props: {
    isRedact: {}
  },
  methods: {
    // 保存or提交
    saveOrSubmitExc (str, resolve) {
      if (this.ExcDate.length > 0) {
        console.log(this.ExcDate)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 获取异常数据
    GetExcDate (id) {
      this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: id}).then(({data}) => {
        if (data.code === 0) {
          this.ExcDate = data.listForm
        } else {
          this.$message.error(data.msg)
        }
      })
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
    // 获取设备类型
    GetequipmentType (productLine) {
      this.$http(`${BASICDATA_API.DEVICELIST_API}`, 'POST', {
        param: '',
        deptId: productLine,
        currPage: '1',
        pageSize: '50'
      }).then(({data}) => {
        if (data.code === 0) {
          this.equipmentType = data.list.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取物料分类简称
    GetmaterialShort () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=MATERIAL_SHORT`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.materialShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取能源下拉
    Getenery () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ENERGY`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.enery = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增异常记录
    AddMaterielData (form) {
      form.push({
        id: '',
        orderId: '',
        materielNum: '',
        granary: '',
        batchNumber: '',
        wheat: '',
        unit: 'KG',
        delFlag: '0'
      })
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
  components: {}
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
