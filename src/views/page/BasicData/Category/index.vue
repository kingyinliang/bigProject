<template>
  <div style="padding: 15px">
    <el-card class="searchCard  newCard">
      <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发料物料：" prop="holderId">
          <el-select v-model="formHeader.material" placeholder="请选择" filterable style="width: 160px">
            <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" >查 询</el-button>
        <el-button type="primary" size="small" @click="addOrupdate()">新 增</el-button>
        <el-button type="danger" size="small" >批量删除</el-button>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table ref="table1" v-loading="dataListLoading" header-row-class-name="tableHead" :data="DataList" @selection-change="handleSelectionChange" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
        <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
        <el-table-column label="工厂" prop="factory" width="120"></el-table-column>
        <el-table-column label="发酵物料" :show-overflow-tooltip="true" width="220">
          <template slot-scope="scope">
            {{ scope.row.materialCode + ' ' + scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="半成品类别" prop="factory" width="120"></el-table-column>
        <el-table-column label="发酵成熟天数（天）" prop="factory" width="150"></el-table-column>
        <el-table-column label="发酵超期天数（天）" prop="factory" width="150"></el-table-column>
        <el-table-column label="操作人员" prop="factory" width="120"></el-table-column>
        <el-table-column label="操作时间" prop="factory" width="120"></el-table-column>
        <el-table-column label="操作" prop="factory" width="120">
          <el-button style="padding: 0;" type="text" size="small" @click="addOrupdate(scope.row)">编辑</el-button>
        </el-table-column>
      </el-table>
      <el-row >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formHeader.currPage"
          :page-sizes="[10, 15, 20]"
          :page-size="formHeader.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="formHeader.totalCount">
        </el-pagination>
      </el-row>
    </el-card>
    <category-addor-update v-if="visible" ref="addOrupdate" @refreshDataList="GetDataList" :factory="factory"></category-addor-update>
  </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import categoryAddorUpdate from './CategoryAddOrUpdate'
export default {
  name: 'index',
  data () {
    return {
      visible: false,
      formHeader: {
        factory: '',
        material: '',
        urrPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      dataListLoading: false,
      factory: [],
      guanList: [],
      multipleSelection: [],
      DataList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    GetDataList () {},
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 编辑新增
    addOrupdate (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addOrupdate.init(id)
      })
    },
    // 审核通过禁用
    checkboxT (row) {
      if ((row.status === 'checked' && row.interfaceReturnStatus === '1') || row.status === 'noPass') {
        return 0
      } else {
        return 1
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.plantList.pageSize = val
      this.GetAuditList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.plantList.currPage = val
      this.GetAuditList()
    }
  },
  computed: {},
  components: {
    categoryAddorUpdate
  }
}
</script>

<style scoped>

</style>
