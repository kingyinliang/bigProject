<template>
<div>
  <el-row class="clearfix">
    <p style="float: left;font-size: 14px">布浆总量：</p>
    <el-button type="primary" style="float: right" size="small" :disabled="!isRedact">酱醪领用</el-button>
  </el-row>
  <el-table ref="table1" header-row-class-name="tableHead">
    <el-table-column label="原汁信息">
      <el-table-column width="120">
        <template slot="header"><i class="reqI">*</i><span>原汁罐号</span></template>
      </el-table-column>
      <el-table-column label="物料" width="220"></el-table-column>
      <el-table-column label="入罐数量" width="120"></el-table-column>
      <el-table-column label="满罐数量" width="140"></el-table-column>
      <el-table-column label="单位" width="50"></el-table-column>
      <el-table-column label="满罐日期" width="140"></el-table-column>
      <el-table-column label="原汁批次" width="140"></el-table-column>
      <el-table-column label="生产订单" width="140"></el-table-column>
    </el-table-column>
    <el-table-column label="操作" width="50"></el-table-column>
    <el-table-column label="酱醪领用">
      <el-table-column label="物料" width="220"></el-table-column>
      <el-table-column width="120"><template slot="header"><i class="reqI">*</i><span>发酵罐号</span></template></el-table-column>
      <el-table-column width="120"><template slot="header"><i class="reqI">*</i><span>当日用量</span></template></el-table-column>
      <el-table-column label="单位" width="50"></el-table-column>
      <el-table-column label="物料批次" width="120"></el-table-column>
      <el-table-column label="满罐数量" width="120"></el-table-column>
      <el-table-column label="记录人" width="120"></el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: 'material',
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
