<template>
  <el-table>
    <el-table-column label="序号"></el-table-column>
    <el-table-column label="审核动作"></el-table-column>
    <el-table-column label="审核意见"></el-table-column>
    <el-table-column label="审核人"></el-table-column>
    <el-table-column label="序号"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'working',
  data () {
    return {
      form: {
      },
      statusList: [{
        name: '已保存',
        value: '0'
      }, {
        name: '已提交',
        value: '1'
      }]
    }
  }
}
</script>

<style lang="less">
.selectwidth {width:170px}
</style>
