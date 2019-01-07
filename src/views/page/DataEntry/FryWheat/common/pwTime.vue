<template>
  <div>
    <!--<el-button type="primary" @click="AddpwTimeDate()" size="small" :disabled="!isRedact" style="float: right;margin-bottom: 10px">新增</el-button>-->
    <el-table header-row-class-name="tableHead" :data="pwTimeDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column label="生产订单号">
      </el-table-column>
      <el-table-column label="准备工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="*机器工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="*人工工时" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="60">
        <template slot-scope="scope">
          <span>H</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="110">
        <template slot-scope="scope">
          <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
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
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    GetPwTimeList () {
      this.$http(`${WHT_API.MATERIELTIMELIST_API}`, 'POST', {
        orderId: ''
      }).then(({data}) => {
      })
    },
    PwTimeUpdate () {
      this.$http(`${WHT_API.MATERIELTIMEUPDATE_API}`, 'POST', []).then(({data}) => {
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
