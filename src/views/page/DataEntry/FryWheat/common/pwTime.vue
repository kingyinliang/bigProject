<template>
  <div>
    <!--<el-button type="primary" @click="AddpwTimeDate()" size="small" :disabled="!isRedact" style="float: right;margin-bottom: 10px">新增</el-button>-->
    <el-table header-row-class-name="tableHead" :data="pwTimeDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column label="生产订单号">
      </el-table-column>
      <el-table-column label="准备工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!(isRedact && order.orderId)" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="*机器工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!(isRedact && order.orderId)" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="*人工工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!(isRedact && order.orderId)" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!(isRedact && order.orderId)" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" width="60" fixed="right">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delpwTimeDate(scope.row)"></el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <audit-log></audit-log>
  </div>
</template>

<script>
import {WHT_API} from '@/api/api'
export default {
  name: 'pwTime',
  data () {
    return {
      pwTimeDate: [{
        id: '',
        orderId: '',
        status: '',
        prepareTime: '',
        prepareTimeUnit: '',
        machineTime: '',
        machineTimeUnit: '',
        humanTime: '',
        humanTimeUnit: '',
        remark: ''
      }]
    }
  },
  props: {
    isRedact: {},
    order: {}
  },
  mounted () {
  },
  methods: {
    GetPwTimeList () {
      this.$http(`${WHT_API.MATERIELTIMELIST_API}`, 'POST', {
        orderId: this.order.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.pwTimeDate = data.listForm
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    PwTimeUpdate (str, resolve, reject) {
      this.pwTimeDate[0].orderId = this.order.orderId
      this.pwTimeDate[0].status = str
      this.$http(`${WHT_API.MATERIELTIMEUPDATE_API}`, 'POST', this.pwTimeDate).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    AddpwTimeDate () {
      this.pwTimeDate.push({})
    },
    delpwTimeDate (row) {
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
