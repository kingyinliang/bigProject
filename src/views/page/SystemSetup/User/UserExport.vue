<template>
  <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
    <div class="main">
      <el-card>
        <el-row>
          <el-form :inline="true" :model="capacity" size="small" label-width="68px" class="topforms2">
            <el-form-item>
              <el-input v-model="capacity.capacity" placeholder="物料" suffix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="GetList">查询</el-button>
              <el-button type="primary" size="small" @click="GetList">密码重置</el-button>
              <el-button type="primary" size="small" @click="GetList">导出</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-table
            class="orderTable"
            ref="table1"
            border
            @selection-change="handleSelectionChange"
            header-row-class-name="tableHead"
            :data="UserList"
            tooltip-effect="dark"
            style="width: 100%;margin-bottom: 20px">
            <el-table-column
              type="selection"
              width="34">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              :index="indexMethod"
              width="55">
            </el-table-column>
            <el-table-column
              label="用户名"
              width="200"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.materialCode }} {{ scope.row.materialName }}
              </template>
            </el-table-column>
            <el-table-column
              label="角色名称"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currPage"
            :page-sizes="[10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </el-row>
      </el-card>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'UserExport',
  data () {
    return {
      capacity: {
        capacity: ''
      },
      UserList: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 1
    }
  },
  mounted () {
  },
  methods: {
    GetList () {},
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item.deviceId)
      })
    },
    // 序号
    indexMethod (index) {
      return index + 1 + (this.currPage * 1 - 1) * (this.pageSize * 1)
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currPage = val
      this.GetList()
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
