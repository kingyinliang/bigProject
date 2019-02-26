<template>
  <div>
    <el-button type="primary" @click="AddInStock(InStock)" size="small" :disabled="!isRedact" style="float: right">新增</el-button>
    <el-table header-row-class-name="tableHead" :data="InStock" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column width="115" label="豆粕量（KG）"></el-table-column>
      <el-table-column width="115" label="麦粉量（KG）"></el-table-column>
      <el-table-column width="115" label="盐水量（KG）"></el-table-column>
      <el-table-column width="115" label="入库物料"></el-table-column>
      <el-table-column width="115" label="入库酱醪量"></el-table-column>
      <el-table-column width="115" label="入库批次"></el-table-column>
      <el-table-column width="115" label="入罐罐号"></el-table-column>
      <el-table-column width="50" label="单位"></el-table-column>
      <el-table-column width="" label="操作人"></el-table-column>
      <el-table-column width="" label="操作时间"></el-table-column>
      <el-table-column width="50" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delInStock(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <audit-log :tableData="InStockAuditlog"></audit-log>
  </div>
</template>

<script>
export default {
  name: 'inStock',
  data () {
    return {
      InStock: [{}],
      InStockAuditlog: []
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    // 删除
    delInStock (row) {
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
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
