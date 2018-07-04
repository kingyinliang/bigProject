<template>
<div>
  <div class="audit"><i class="iconfont factory-shouqicaidan"></i><span>审核日志</span></div>
  <el-table
    :data="tableData"
    header-row-class-name="tableHead"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="审核动作"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="审核意见">
    </el-table-column>
    <el-table-column
      prop="address"
      label="审核人">
    </el-table-column>
    <el-table-column
      prop="address"
      label="审核时间">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'AuditLog',
  props: {
    tableData: {}
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .audit{
    line-height: 40px;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    margin-left: 12px;
    font-size: 16px;
    font-weight: bold;
  }
  }
</style>
