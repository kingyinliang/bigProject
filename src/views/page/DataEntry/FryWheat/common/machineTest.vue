<template>
<el-dialog :title="`${machineId}检测`" :visible.sync="visible" width="850px">
  <el-button type="primary" @click="AddMachineTest" size="small" style="float: right;margin-bottom: 15px">新增</el-button>
  <el-table :data="machineTest" header-row-class-name="tableHead" border tooltip-effect="dark">
    <el-table-column label="检测时间" width="160">
      <template slot-scope="scope">
        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.checkTime" size="small"></el-date-picker>
      </template>
    </el-table-column>
    <el-table-column label="焦糊率（%）*" width="130">
      <template slot-scope="scope">
        <el-input v-model="scope.row.cokingRate" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="膨胀率*" width="130">
      <template slot-scope="scope">
        <el-input v-model="scope.row.expandRate" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="粉碎度*" width="130">
      <template slot-scope="scope">
        <el-input v-model="scope.row.piecesRate" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="检测人员" width="140" prop="changer"></el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remark" size="small"></el-input>
      </template>
    </el-table-column>
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
import { WHT_API } from '@/api/api'
export default {
  name: 'machineTest',
  data () {
    return {
      visible: false,
      machineId: '',
      orderId: '',
      machineTest: []
    }
  },
  mounted () {
  },
  methods: {
    init (machine, orderId) {
      this.visible = true
      this.machineId = machine.deviceId
      this.orderId = orderId
      this.$http(`${WHT_API.MACHINETESTUPDATE_API}`, 'POST', {
        device_id: this.machineId,
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.machineTest = data.record
        } else {
          this.$message.error(data.msg)
        }
      })
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
