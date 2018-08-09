<template>
    <div>
      <div class="topTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>菜单管理</h3>
      </div>
      <div class="main">
        <el-card>
          <el-row>
            <el-button>新增</el-button>
          </el-row>
          <el-row>
            <el-table
              :data="dataList"
              border
              style="width: 100%;">
              <el-table-column
                prop="menuId"
                header-align="center"
                align="center"
                width="80"
                label="ID">
              </el-table-column>
              <table-tree-column
                prop="name"
                header-align="center"
                treeKey="menuId"
                width="150"
                label="名称">
              </table-tree-column>
              <el-table-column
                prop="parentName"
                header-align="center"
                align="center"
                width="120"
                label="上级菜单">
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                label="图标">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                header-align="center"
                align="center"
                label="类型">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
                  <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
                  <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="orderNum"
                header-align="center"
                align="center"
                label="排序号">
              </el-table-column>
              <el-table-column
                prop="url"
                header-align="center"
                align="center"
                width="150"
                :show-overflow-tooltip="true"
                label="菜单URL">
              </el-table-column>
              <el-table-column
                prop="perms"
                header-align="center"
                align="center"
                width="150"
                :show-overflow-tooltip="true"
                label="授权标识">
              </el-table-column>
              <el-table-column
                fixed="right"
                header-align="center"
                align="center"
                width="150"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
                  <el-button type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate"></add-or-update>
    </div>
</template>

<script>
import TableTreeColumn from '@/views/components/table-tree-column'
import { treeDataTranslate } from '@/net/validate'
import AddOrUpdate from './menuAdd'
import {MAIN_API} from '@/api/api'
export default {
  name: 'menuManage',
  data () {
    return {
      addOrUpdateVisible: false,
      dataList: []
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.$http(`${MAIN_API.MENULIST_API}`, 'GET', {}).then(({data}) => {
        this.dataList = treeDataTranslate(data, 'menuId')
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    }
  },
  computed: {},
  components: {
    TableTreeColumn,
    AddOrUpdate
  }
}
</script>

<style scoped>

</style>
