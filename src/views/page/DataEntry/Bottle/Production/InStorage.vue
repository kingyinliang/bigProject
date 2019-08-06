<template>
  <div>
    <el-button type="primary" @click="AddIn" size="small" :disabled="!(isRedact)" style="float: right;margin-bottom: 5px">新增</el-button>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="InDataList" border tooltip-effect="dark" >
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column label="白/中/夜班" :show-overflow-tooltip="true" prop="kjmWorkShopName">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.classes" placeholder="请选择" :disabled="!(isRedact)">
          <el-option label="白班" value="白班"></el-option>
          <el-option label="中班" value="中班"></el-option>
          <el-option label="夜班" value="夜班"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="生产批次" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot="header"><i class="reqI">*</i><span>生产批次</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="本班生产 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot="header"><i class="reqI">*</i><span>本班生产</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60">
        <template slot-scope="scope">个</template>
      </el-table-column>
      <el-table-column label="备注" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="!(isRedact)" @click="delIn(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <auditLog :tableData="InAudit"></auditLog>
  </div>
</template>

<script>
export default {
  name: 'InStorage',
  data () {
    return {
      InDataList: [],
      InAudit: []
    }
  },
  props: {
    isRedact: {
      type: Boolean,
      default () { return false }
    }
  },
  mounted () {
  },
  methods: {
    AddIn () {
      this.InDataList.push({})
    },
    delIn (row) {
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
