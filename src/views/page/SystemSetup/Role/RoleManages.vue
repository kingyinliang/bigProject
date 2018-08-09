<template>
    <div>
      <div class="topTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>角色管理</h3>
      </div>
      <div class="main">
        <el-card>
          <el-row type="flex">
            <el-col>
              <el-form :inline="true" :model="form" size="small" label-width="80px" class="topforms">
                <el-form-item label="角色名称">
                  <el-input v-model="form.username" placeholder="角色名称"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style="width: 100px">
              <el-button type="primary">查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              ref="userlist"
              header-row-class-name="tableHead"
              :data="role"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                width="55">
              </el-table-column>
              <el-table-column
                prop="roleName"
                label="角色名称"
                width="95">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="描述"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="系统级角色"
                width="95">
              </el-table-column>
              <el-table-column
                label="操作"
                width="240">
                <template slot-scope="scope">
                  <a @click="userManage(scope.row.roleId)">人员管理</a>
                  <a @click="fnManage(scope.row.roleId)">功能分配</a>
                </template>
              </el-table-column>
              <el-table-column
                prop="creator"
                label="创建人"
                width="95">
              </el-table-column>
              <el-table-column
                prop="created"
                label="创建时间"
                width="95">
              </el-table-column>
              <el-table-column
                prop="changer"
                label="修改人"
                width="95">
              </el-table-column>
              <el-table-column
                prop="changed"
                label="修改时间"
                width="95">
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
      <role-add v-if="addOrUpdateVisible1" ref="addOrUpdate" ></role-add>
      <user-manage v-if="addOrUpdateVisible2" ref="usermanage"></user-manage>
    </div>
</template>

<script>
import roleAdd from './RoleAdd'
import userManage from './UserManage'
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'RoleManages',
  data () {
    return {
      addOrUpdateVisible1: false,
      addOrUpdateVisible2: false,
      form: {},
      menuList: [],
      currPage: 1,
      pageSize: 10,
      totalCount: 1,
      role: [],
      userlist: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: '',
        roleId: 1
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: '',
        roleId: 2
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: '',
        roleId: 3
      }]
    }
  },
  mounted () {
    this.GetRoleList()
  },
  methods: {
    // 获取角色列表
    GetRoleList (obj) {
      this.$http(`${SYSTEMSETUP_API.ROLELIST_API}`, 'GET', obj).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.role = data.page.list
          this.currPage = data.page.currPage
          this.limit = data.page.pageSize
          this.totalCount = data.page.totalCount
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 人员管理
    userManage (id) {
      this.addOrUpdateVisible2 = true
      this.$nextTick(() => {
        this.$refs.usermanage.init(id)
      })
    },
    // 功能管理
    fnManage (id) {
      this.addOrUpdateVisible1 = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.GetRoleList({
        limit: val,
        page: 1
      })
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.GetRoleList({
        limit: this.limit,
        page: val
      })
    }
  },
  computed: {},
  components: {
    roleAdd,
    userManage
  }
}
</script>

<style scoped>

</style>
