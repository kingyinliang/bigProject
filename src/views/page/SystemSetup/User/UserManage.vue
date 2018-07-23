<template>
  <el-row >
    <el-row>
      <el-button type="primary" @click="showAdddialog()">新增</el-button>
    </el-row>
    <el-row class="list">
      <el-table
        :data="page"
        header-row-class-name="tableHead"
        border style="border-radius: 10px">
        <el-table-column
          type="index"
          :index="1">
        </el-table-column>
        <el-table-column
          label="用户名">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showdialog(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="userDel(scope.row)"></el-button>
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
    <el-dialog :visible.sync="dialogFormVisible" title="操作" @close="clearForm('userForm')">
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="部门">
          <p v-if="deptName2.length"><span v-for="(item, index) in deptName2" :key="index" style="margin-right: 10px">{{item}}</span></p>
          <el-button @click="dialogFormVisible3 = true">点击选择部门</el-button>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="userForm.roleIdList">
            <el-checkbox :label="item.roleId" name="type" v-for="(item, index) in roleIdList" :key="index">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button type="primary" @click="userUplode">保存</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible2" title="新增" @close="clearForm('userAdd')">
      <el-form :model="userAdd" label-position="left" label-width="100px" ref="useradd">
        <el-form-item label="部门">
          <p v-if="deptName.length"><span v-for="(item, index) in deptName" :key="index" style="margin-right: 10px">{{item}}</span></p>
          <el-button @click="dialogFormVisible4 = true">点击选择部门</el-button>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userAdd.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userAdd.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userAdd.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="userAdd.roleIdList">
            <el-checkbox :label="item.roleId" name="type" v-for="(item, index) in roleIdList" :key="index">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button type="primary" @click="showAdd">保存</el-button>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible3" title="选择部门">
      <el-tree :data="OrgTree" default-expand-all show-checkbox @check-change="handleCheckChange"></el-tree>
      <el-button type="primary" @click="dialogFormVisible3 = false">关闭</el-button>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible4" title="选择部门">
      <el-tree :data="OrgTree" default-expand-all show-checkbox @check-change="handleCheckChange"></el-tree>
      <el-button type="primary" @click="dialogFormVisible3 = false">关闭</el-button>
    </el-dialog>
  </el-row>
</template>

<script>
import {SYSTEMSETUP_API, BASICDATA_API} from '@/api/api'
export default {
  name: 'UserManage',
  data () {
    return {
      OrgTree: [],
      userAdd: {
        deptId: [],
        roleIdList: [],
        mobile: '',
        username: ''
      },
      deptName: [],
      deptName2: [],
      currPage: 1,
      limit: 10,
      totalCount: 1,
      password: '',
      userForm: {},
      roleIdList: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      page: []
    }
  },
  mounted () {
    // 获取用户列表
    this.getUserlist({
      limit: 10,
      page: 1
    })
    // 获取组织结构
    this.getTree()
    // 获取角色列表
    this.$http(`${SYSTEMSETUP_API.ROLELIST_API}`, 'GET', {}).then(({data}) => {
      if (data.code === 0) {
        this.roleIdList = data.page.list
      } else {
        this.$message.error(data.msg)
      }
    })
  },
  methods: {
    // 获取组织结构树
    getTree () {
      this.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.OrgTree = data.deptList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取用户列表
    getUserlist (obj) {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'GET', obj).then(({data}) => {
        if (data.code === 0) {
          this.page = data.page.list
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
      this.$http(`${SYSTEMSETUP_API.USERDETAIL_API}/${str.userId}`, 'GET').then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.userForm = data.user
          this.deptName2 = data.user.deptId
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改用户信息
    userUplode () {
      this.$http(`${SYSTEMSETUP_API.USERUPDATE_API}`, 'POST', this.userForm).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.dialogFormVisible = false
          this.userForm = {}
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增用户弹窗
    showAdddialog () {
      this.dialogFormVisible2 = true
    },
    // 新增用户
    showAdd () {
      console.log(this.userAdd.deptId.join(','))
      this.userAdd.deptId = this.userAdd.deptId.join(',')
      this.$http(`${SYSTEMSETUP_API.USERADD_API}`, 'POST', this.userAdd).then(({data}) => {
        if (data.code === 0) {
          this.dialogFormVisible2 = false
          this.userAdd.deptId = []
          this.$refs.useradd.resetFields()
          this.getUserlist({
            limit: this.limit,
            page: this.currPage
          })
        } else {
          this.userAdd.deptId = this.userAdd.deptId.split(',')
          this.$message.error(data.msg)
        }
      })
    },
    // 删除用户
    userDel (str) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${SYSTEMSETUP_API.USERDEL_API}`, 'POST', [str.userId]).then(({data}) => {
          if (data.code === 0) {
            this.getUserlist({
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
      this.getUserlist({
        limit: val,
        page: 1
      })
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.getUserlist({
        limit: this.limit,
        page: val
      })
    },
    // 选择部门
    handleCheckChange (data, checked, indeterminate) {
      if (this.userAdd.deptId.indexOf(data.deptId) !== -1) {
        this.userAdd.deptId.splice(this.userAdd.deptId.indexOf(data.deptId), 1)
        this.deptName.splice(this.deptName.indexOf(data.label), 1)
      } else if (checked) {
        this.userAdd.deptId.push(data.deptId)
        this.deptName.push(data.label)
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
