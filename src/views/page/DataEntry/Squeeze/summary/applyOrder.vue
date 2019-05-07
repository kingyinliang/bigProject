<template>
  <div>
    <el-row class="clearfix">
      <h3 style="color: rgba(0, 0, 0, 0.65);font-size: 14px;float: left">原汁信息</h3>
      <el-button type="primary" style="float: right" size="small" :disabled="!isRedact">申请订单</el-button>
    </el-row>
    <el-table ref="table1" :data="OrderDate" header-row-class-name="tableHead" @selection-change="handleSelectionChange" border tooltip-effect="dark">
      <el-table-column type="selection" :selectable='checkboxApply' width="34"></el-table-column>
      <el-table-column width="120">
        <template slot="header"><i class="reqI">*</i><span>原汁罐号</span></template>
      </el-table-column>
      <el-table-column label="是否混合罐" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.material" placeholder="请选择" :disabled="isRedact" size="small">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="物料" width="220"></el-table-column>
      <el-table-column label="入罐数量" width="120"></el-table-column>
      <el-table-column label="满罐数量" width="140"></el-table-column>
      <el-table-column label="单位" width="50"></el-table-column>
      <el-table-column label="满罐日期" width="140"></el-table-column>
      <el-table-column label="原汁批次" width="140"></el-table-column>
      <el-table-column label="生产订单" width="140"></el-table-column>
      <el-table-column label="操作" width="50" fixed="right"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'applyOrder',
  data () {
    return {
      multipleSelection: [],
      OrderDate: [{}]
    }
  },
  props: {
    isRedact: ''
  },
  mounted () {
  },
  methods: {
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 审核通过禁用
    checkboxApply (row) {
      if ((row.status === 'checked' && row.interfaceReturnStatus === '1') || row.status === 'noPass') {
        return 0
      } else {
        return 1
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
