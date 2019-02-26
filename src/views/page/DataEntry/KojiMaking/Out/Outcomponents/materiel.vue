<template>
  <div>
    <el-button type="primary" @click="AddMateriel(MaterielDate)" size="small" :disabled="!isRedact" style="float: right">新增</el-button>
    <el-table header-row-class-name="tableHead" :data="MaterielDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate" :disabled="!isRedact" size="small"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="盐水" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.brine" placeholder="请选择" :disabled="!isRedact"  size="small">
            <el-option :label="item.value" v-for="(item, index) in brine" :key="index" :value="item.code"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="盐水罐号" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.brineTankNo" placeholder="请选择" :disabled="!isRedact"  size="small">
            <el-option :label="item.value" v-for="(item, index) in brineTankNo" :key="index" :value="item.code"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="起始值" width="103">
        <template slot-scope="scope">
          <el-input v-model="scope.row.start" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="结束值" width="103">
        <template slot-scope="scope">
          <el-input v-model="scope.row.end" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="95">
        <template slot-scope="scope">
          {{scope.row.start*1 - scope.row.end*1}}
        </template>
      </el-table-column>
      <el-table-column label="单位" width="50"></el-table-column>
      <el-table-column label="操作人"></el-table-column>
      <el-table-column label="操作时间"></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delMateriel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <audit-log :tableData="MaterielAuditlog"></audit-log>
  </div>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'materiel',
  data () {
    return {
      MaterielDate: [{}],
      MaterielAuditlog: [],
      brine: [],
      brineTankNo: []
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    // 获取盐水
    GetBrine () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=holder_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.brine = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取盐水罐号
    GetBrineTankNo () {
      this.$http(`${BASICDATA_API.CONTAINERLIST1_API}`, 'POST', {
        deptId: '',
        holder_type: '011',
        currPage: '1',
        pageSize: '100'
      }).then(({data}) => {
        if (data.code === 0) {
          this.brineTankNo = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增
    AddMateriel () {},
    // 删除
    delMateriel (row) {
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
