<template>
<div>
  <el-row class="clearfix">
    <el-button type="primary" style="float: right" size="small" :disabled="!isRedact" @click="GetTime">获取工时</el-button>
  </el-row>
  <el-table ref="table1" header-row-class-name="tableHead" :data="timeDate">
    <el-table-column label="生产订单" width="120" prop="orderNo"></el-table-column>
    <el-table-column label="工序" width="120" prop="processIdName"></el-table-column>
    <el-table-column label="生产品项" width="120" prop="ssssss">
      <template slot-scope="scope">{{scope.row.materialCode + ' ' + scope.row.materialName}}</template>
    </el-table-column>
    <el-table-column label="入库量" width="120" prop="inPotAmount"></el-table-column>
    <el-table-column label="准备工时" width="120" prop="confActivity1"></el-table-column>
    <el-table-column label="人工工时" width="120" prop="confActivity3"></el-table-column>
    <el-table-column label="机器工时" width="120" prop="confActivity2">
      <template slot-scope="scope"><el-input v-model="scope.row.confActivity2" size="small" placeholder="手工录入" :disabled="!isRedact"></el-input></template>
    </el-table-column>
    <el-table-column label="单位" width="50" prop="confActiUnit1"></el-table-column>
    <el-table-column label="操作" width="50" fixed="right">
      <template slot-scope="scope">
        <el-button type="text" :disabled="!isRedact" @click="BackTime(scope.row)">退回</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {SQU_API} from '@/api/api'
export default {
  name: 'manHour',
  data () {
    return {
      timeDate: []
    }
  },
  props: {
    isRedact: '',
    formHeader: {}
  },
  mounted () {
  },
  methods: {
    // 获取工时列表
    GetTimeList (formHeader) {
      this.$http(`${SQU_API.SUM_TIME_LIST_API}`, 'POST', formHeader).then(({data}) => {
        if (data.code === 0) {
          this.timeDate = data.timeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取工时
    GetTime () {
      this.$http(`${SQU_API.SUM_TIME_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.GetTimeList(this.formHeader)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改工时
    UpdateTime (str, resolve) {
      this.timeDate.forEach((item, index) => {
        item.status = str
      })
      this.$http(`${SQU_API.SUM_TIME_UPDATE_API}`, 'POST', this.timeDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 退回工时
    BackTime (row) {
      this.$http(`${SQU_API.SUM_TIME_BACK_API}`, 'POST', row).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
