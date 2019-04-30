<template>
<div>
  <el-row class="clearfix">
    <el-button type="primary" style="float: right" size="small" :disabled="!isRedact">酱醪领用</el-button>
  </el-row>
  <el-table ref="table1" header-row-class-name="tableHead">
    <el-table-column label="生产订单" width="120"></el-table-column>
    <el-table-column label="工序" width="120"></el-table-column>
    <el-table-column label="生产品项" width="120"></el-table-column>
    <el-table-column label="入库量" width="120"></el-table-column>
    <el-table-column label="准备工时" width="120"></el-table-column>
    <el-table-column label="人工工时" width="120"></el-table-column>
    <el-table-column label="机器工时" width="120"></el-table-column>
    <el-table-column label="单位" width="50"></el-table-column>
    <el-table-column label="操作" width="50" fixed="right"></el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'manHour',
  data () {
    return {}
  },
  props: {
    isRedact: ''
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
