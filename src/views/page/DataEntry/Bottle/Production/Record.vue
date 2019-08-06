<template>
  <div>
    <el-button type="primary" @click="AddRecord" size="small" :disabled="!(isRedact)" style="float: right;margin-bottom: 5px">新增</el-button>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="RecordList" border tooltip-effect="dark" >
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column label="时间" :show-overflow-tooltip="true" prop="kjmWorkShopName">
        <template slot-scope="scope">
          <el-date-picker size="mini" type="date" :disabled="!isRedact" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="scope.row.productDate"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="瓶胚批号" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="瓶胚数量 " :show-overflow-tooltip="true" prop="kjmWorkShopName" width="140">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bad" placeholder="手工录入" size="mini" :disabled="!(isRedact)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60">
        <template slot-scope="scope">
          个
        </template>
      </el-table-column>
      <el-table-column label="供应商" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="150">
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
          <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="!(isRedact)" @click="delRecord(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Record',
  data () {
    return {
      RecordList: []
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
    AddRecord () {
      this.RecordList.push({})
    },
    delRecord (row) {
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
  components: {}
}
</script>

<style scoped>

</style>
