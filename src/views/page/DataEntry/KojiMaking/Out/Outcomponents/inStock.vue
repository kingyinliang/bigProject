<template>
  <div>
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
      <el-table-column width="70" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delInStock(scope.row)" v-if="scope.row.isSplit === '1' ">删除</el-button>
          <el-button type="text" :disabled="!isRedact" @click="addInStock(scope.row, scope.$index)" v-if="scope.row.isSplit === '0' "><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
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
      InStock: [{
        isSplit: '0'
      },
      {
        isSplit: '0'
      }],
      InStockAuditlog: []
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    addInStock (row, index) {
      this.InStock.splice(index + 1, 0, {
        isSplit: '1',
        delFlag: '0'
      })
    },
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

<style lang="scss" scoped>
.icons{
  display: block;
  float: left;
  height:14px;
  width:14px;
  margin-right: 5px;
}
</style>
