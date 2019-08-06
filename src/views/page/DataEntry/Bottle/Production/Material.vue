<template>
  <div>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="MaterialList" border tooltip-effect="dark" >
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column label="物料" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="120"></el-table-column>
      <el-table-column label="单位" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="120"></el-table-column>
      <el-table-column label="需求用量" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="120"></el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80">
        <template slot-scope="scope">
          <el-button type="text" :disabled="!(isRedact)" @click="splitDate(scope.row, scope.$index)"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
        </template>
      </el-table-column>
      <el-table-column label="批次 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot="header"><i class="reqI">*</i><span>批次</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="生产使用量 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot="header"><i class="reqI">*</i><span>生产使用量</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="本班损耗 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="不合格数 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="供应商 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot="header"><i class="reqI">*</i><span>供应商</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="!(isRedact)" @click="delMaterial(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <auditLog :tableData="MaterialAudit"></auditLog>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data () {
    return {
      MaterialList: [],
      MaterialAudit: []
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
    splitDate (row, index) {},
    delMaterial (row) {
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
