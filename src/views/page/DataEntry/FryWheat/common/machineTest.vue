<template>
<el-dialog :title="`${id}检测`" :visible.sync="visible" width="850px">
  <el-button type="primary" @click="AddMachineTest" size="small" style="float: right;margin-bottom: 15px">新增</el-button>
  <el-table :data="machineTest" header-row-class-name="tableHead" border tooltip-effect="dark">
    <el-table-column label="检测时间" width="160" prop="riqi"></el-table-column>
    <el-table-column label="焦糊率（%）*" width="130" prop="riqi"></el-table-column>
    <el-table-column label="膨胀率*" width="130" prop="riqi"></el-table-column>
    <el-table-column label="检测人员" width="140" prop="riqi"></el-table-column>
    <el-table-column label="备注" prop="riqi"></el-table-column>
    <el-table-column label="操作" width="80">
      <template slot-scope="scope">
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="visible = false">取消</el-button>
    <el-button type="primary" @click="updateMachineTest">保存</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'machineTest',
  data () {
    return {
      visible: false,
      id: '',
      machineTest: [{riqi: 'asdasd'}]
    }
  },
  mounted () {
  },
  methods: {
    init (str) {
      this.id = str
      this.visible = true
    },
    AddMachineTest () {
      this.machineTest.push({})
    },
    updateMachineTest () {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
