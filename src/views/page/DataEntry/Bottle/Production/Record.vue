<template>
  <div>
    <el-button type="primary" @click="AddRecord" size="small" :disabled="!(isRedact)" style="float: right;margin-bottom: 5px">新增</el-button>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="RecordList.filter(item => item.delFlag === '0').slice((currPage-1)*pageSize,currPage*pageSize)" border tooltip-effect="dark" >
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
          <el-input v-model="scope.row.embryoBatch" placeholder="手工录入" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
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
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="70" fixed="right">
        <template slot-scope="scope">
          <el-button class="delBtn" type="text" icon="el-icon-delete" size="mini" :disabled="!(isRedact)" @click="delRecord(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <p style="font-size: 14px;line-height: 32px">合计数量：{{sumNum}}个</p>
  </div>
</template>

<script>
import { BOTTLE_API } from '@/api/api'
export default {
  name: 'Record',
  data () {
    return {
      RecordList: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 1
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
          this.currPage = 1
          this.pageSize = 10
          this.totalCount = data.embryoRecordList.length
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
        if (item.delFlag !== '1') {
          if (!(item.date && item.embryoBatch && item.embryoAmount)) {
            ty = false
            this.$warning_SHINHO('投胚记录必填项未填')
            return false
          }
        }
      })
      return ty
    },
    // 新增
    AddRecord () {
      this.RecordList.splice(0, 0, {
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
      this.currPage = 1
      this.totalCount = this.RecordList.filter(item => item.delFlag === '0').length
    },
    delRecord (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = '1'
        this.totalCount = this.RecordList.filter(item => item.delFlag === '0').length
      })
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.pageSize = val
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currPage = val
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
