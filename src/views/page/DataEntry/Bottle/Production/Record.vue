<template>
  <div>
    <el-button type="primary" @click="AddRecord" size="small" :disabled="!(isRedact)" style="float: right;margin-bottom: 5px">新增</el-button>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="RecordList" border tooltip-effect="dark" >
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column label="时间" prop="kjmWorkShopName">
        <template slot="header"><i class="reqI">*</i><span>时间</span></template>
        <template slot-scope="scope">
          <el-date-picker style="width: 100%" size="mini" type="datetime" :disabled="!isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" value-format="yyyy-MM-dd  HH:mm:ss" format="yyyy-MM-dd  HH:mm" v-model="scope.row.date"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="瓶胚批号" :show-overflow-tooltip="true" width="180">
        <template slot="header"><i class="reqI">*</i><span>瓶胚批号</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.embryoBatch" placeholder="手工录入" size="mini" maxlength='10' :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="瓶胚数量 " :show-overflow-tooltip="true" width="180">
        <template slot="header"><i class="reqI">*</i><span>瓶胚数量</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.embryoAmount" placeholder="手工录入" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60">
        <template slot-scope="scope">{{scope.row.unit = '个'}}</template>
      </el-table-column>
      <el-table-column label="供应商" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.supplier" placeholder="请选择" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))">
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Supplier" :key="index"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="备注" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="手工录入" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="!(isRedact)" @click="delRecord(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <p style="font-size: 14px;line-height: 32px">合计数量：{{sumNum}}个</p>
  </div>
</template>

<script>
import { BOTTLE_API } from '@/api/api'
export default {
  name: 'Record',
  data () {
    return {
      RecordList: []
    }
  },
  props: {
    isRedact: {
      type: Boolean,
      default () { return false }
    },
    Supplier: {
      type: Array
    }
  },
  mounted () {
  },
  methods: {
    // 获取投胚记录
    getDataList () {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_RECORD_LIST}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.RecordList = data.embryoRecordList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 保存提交
    SaveData (str, resolve, reject) {
      this.RecordList.forEach((item) => {
        item.sumEmbryoAmount = this.sumNum
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${BOTTLE_API.BOTTLE_PRO_RECORD_SAVE}`, 'POST', this.RecordList).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('投胚记录' + data.msg)
          }
        }
      })
    },
    // 保存提交
    SubmitData (str, resolve, reject) {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_RECORD_SUBMIT}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId
      }).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('投胚记录' + data.msg)
          }
        }
      })
    },
    // 校验
    dataRul () {
      let ty = true
      this.RecordList.forEach((item) => {
        if (!(item.date && item.embryoBatch && item.embryoAmount)) {
          ty = false
          this.$message.error('投胚记录必填项未填')
          return false
        }
        if (item.embryoBatch.length !== 10) {
          ty = false
          this.$message.error('投胚记录批次十位')
          return false
        }
      })
      return ty
    },
    // 新增
    AddRecord () {
      this.RecordList.push({
        date: '',
        delFlag: '0',
        embryoAmount: this.RecordList.length > 0 ? this.RecordList[this.RecordList.length - 1].embryoAmount : '',
        embryoBatch: '',
        id: '',
        orderId: this.$store.state.common.bottle.ProOrderId,
        remark: '',
        status: '',
        sumEmbryoAmount: '',
        supplier: this.RecordList.length > 0 ? this.RecordList[this.RecordList.length - 1].supplier : this.Supplier.length > 0 ? this.Supplier[0].code : '',
        unit: ''
      })
    },
    delRecord (row) {
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
    sumNum: function () {
      let num = 0
      this.RecordList.forEach(item => {
        if (item.delFlag !== '1') {
          num += item.embryoAmount * 1
        }
      })
      return num
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
