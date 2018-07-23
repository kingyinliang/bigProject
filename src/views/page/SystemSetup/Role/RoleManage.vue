<template>
  <el-row >
    <el-row>
      <el-button type="primary" @click="showAdddialog()">新增</el-button>
    </el-row>
    <el-row class="list">
      <el-table
        :data="role"
        header-row-class-name="tableHead"
        border
        style="border-radius: 10px">
        <el-table-column
          type="index"
          :index="1">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="角色描述">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showdialog(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="roleDel(scope.row)"></el-button>
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
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="操作" @close="clearForm('roleForm')">
      <el-form :model="roleForm" label-position="left" label-width="100px">
        <!--<el-form-item label="部门">-->
        <!--<el-input v-model="userForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="用户名">
          <el-input v-model="roleForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="userUplode">保存</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" title="新增" @close="clearForm('roleAdd')">
      <el-form :model="roleAdd" label-position="left" label-width="100px">
        <!--<el-form-item label="部门">-->
        <!--<el-input v-model="userForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="角色名称">
          <el-input v-model="roleAdd.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleAdd.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="showAdd">保存</el-button>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'RoleManage',
  data () {
    return {
      roleAdd: {
        remark: '',
        roleName: '',
        menuIdList: [1]
      },
      currPage: 1,
      limit: 10,
      totalCount: 1,
      roleForm: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      role: []
    }
  },
  mounted () {
    this.getRolelist({
      limit: 10,
      page: 1
    })
  },
  methods: {
    // 获取角色列表
    getRolelist (obj) {
      this.$http(`${SYSTEMSETUP_API.ROLELIST_API}`, 'GET', obj).then(({data}) => {
        console.log(data.page.list)
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
    // 操作按钮
    showdialog (str) {
      this.dialogFormVisible = true
      this.$http(`${SYSTEMSETUP_API.ROLEDETAIL_API}/${str.roleId}`, 'GET').then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.roleForm = data.role
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改角色信息
    userUplode () {
      this.$http(`${SYSTEMSETUP_API.ROLEUPDATE_API}`, 'POST', this.roleForm).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.dialogFormVisible = false
          this.roleForm = {}
          this.getRolelist({
            limit: this.limit,
            page: this.currPage
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增角色弹窗
    showAdddialog () {
      this.dialogFormVisible2 = true
    },
    // 新增角色
    showAdd () {
      this.roleAdd.menuIdList = [1]
      this.$http(`${SYSTEMSETUP_API.ROLEADD_API}`, 'POST', this.roleAdd).then(({data}) => {
        if (data.code === 0) {
          this.dialogFormVisible2 = false
          this.roleAdd = {}
          this.getRolelist({
            limit: this.limit,
            page: this.currPage
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 删除角色
    roleDel (str) {
      console.log(str)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${SYSTEMSETUP_API.ROLEDEL_API}`, 'POST', [str.roleId]).then(({data}) => {
          if (data.code === 0) {
            this.getRolelist({
              limit: this.limit,
              page: this.currPage
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.getRolelist({
        limit: val,
        page: 1
      })
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.getRolelist({
        limit: this.limit,
        page: val
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
