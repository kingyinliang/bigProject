<template>
  <div>
    <div class="clearfix topBox">
      <h3>录入数据单位：MIN</h3>
      <div style="float: right">
        <el-button type="primary" @click="AddExcDate(ExcDate)" size="small">新增</el-button>
      </div>
    </div>
    <el-table header-row-class-name="tableHead" :data="ExcDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column label="异常情况" width="150">
        <template slot-scope="scope">
          <div class="required">
            <i class="reqI">*</i>
            <el-select v-model="scope.row.expCode" placeholder="请选择" :disabled="!isRedact" size="small">
              <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="异常描述"
        :show-overflow-tooltip="true"
        width="220">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="241" label="异常开始时间">
        <template slot-scope="scope">
          <div class="required">
            <i class="reqI">*</i>
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expStartDate" :disabled="!isRedact" size="small"></el-date-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="241" label="异常结束时间">
        <template slot-scope="scope">
          <div class="required">
            <i class="reqI">*</i>
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate" :disabled="!isRedact" size="small"></el-date-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="异常时间" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.expContinue = mistiming(scope.row.expEndDate, scope.row.expStartDate, scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.expContinueUnit = 'MIN'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.deviceId" filterable  placeholder="设备" size="small" :disabled="!(isRedact && (scope.row.expCode === '001' || scope.row.expCode === '002'))" >
            <el-option :label="item.deviceName" v-for="(item, index) in equipmentType" :key="index" :value="item.deviceNo"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="物料分类简称" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.materialShort" filterable placeholder="选择简称" :disabled="!(isRedact && (scope.row.expCode === '003' || scope.row.expCode === '004'))" size="small" >
            <el-option :label="item.value" v-for="(item, index) in materialShort" :key="index" :value="item.code"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="能源" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.energy" placeholder="选择能源" :disabled="!(isRedact && scope.row.expCode === '005')"  size="small">
            <el-option :label="item.value" v-for="(item, index) in enery" :key="index" :value="item.code"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="dellistbomS(scope.row, delFlagnum.excnum)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {SYSTEMSETUP_API, BASICDATA_API} from '@/api/api'
import { toDate } from '@/net/validate'
export default {
  name: 'excRecord',
  data () {
    return {
      stoppageType: [],
      equipmentType: [],
      materialShort: [],
      enery: []
    }
  },
  mounted () {
    this.GetstoppageType()
    this.GetmaterialShort()
    this.Getenery()
  },
  props: {
    ExcDate: {},
    isRedact: {}
  },
  methods: {
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
    GetequipmentType () {
      this.$http(`${BASICDATA_API.DEVICELIST_API}`, 'POST', {
        param: '',
        deptId: this.order.productLine,
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
    AddExcDate (form) {
      form.push({
        id: '',
        orderId: '',
        expCode: '',
        expInfo: '',
        expStartDate: null,
        expEndDate: null,
        expContinue: '',
        expContinueUnit: '',
        deviceId: '',
        materialShort: '',
        energy: '',
        remark: '',
        delFlag: '0'
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
  components: {}
}
</script>

<style scoped>
.rowDel{
  display: none;
}
</style>
