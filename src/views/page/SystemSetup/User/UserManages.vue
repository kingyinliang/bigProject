<template>
    <div>
      <div class="topTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>管理员列表</h3>
      </div>
      <div class="main">
        <el-card>
          <el-row class="clearfix">
            <div style="float: right">
              <el-form :inline="true" :model="condition" size="small" label-width="68px" class="topforms2">
                <el-form-item>
                  <el-input v-model="condition.param" placeholder="用户名/工号" suffix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="getList">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row type="flex" :gutter="20">
            <el-col style="width: 400px">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>组织架构</span>
                </div>
                <el-tree :data="OrgTree" default-expand-all @node-click="setdetail"></el-tree>
              </el-card>
            </el-col>
            <el-col>
              <el-card>
                <div slot="header" class="clearfix">
                  <span>人员</span>
                </div>
                <div>
                  <el-button @click="remove()" style="float: right;margin:0 20px 20px 0">批量删除</el-button>
                  <el-button @click="addOrupdate()" style="float: right;margin:0 20px 20px 0">增加</el-button>
                  <el-table
                    :data="userArr"
                    @selection-change="handleSelectionChange"
                    header-row-class-name="tableHead"
                    border
                    style="border-radius: 10px">
                    <el-table-column
                      type="selection">
                    </el-table-column>
                    <el-table-column
                      type="index"
                      :index="1">
                    </el-table-column>
                    <el-table-column
                      prop="workNum"
                      label="人员工号">
                    </el-table-column>
                    <el-table-column
                      prop="workNumTemp"
                      label="虚拟工号">
                    </el-table-column>
                    <el-table-column
                      prop="realName"
                      label="人员姓名">
                    </el-table-column>
                    <el-table-column
                      prop="post"
                      label="职务">
                    </el-table-column>
                    <el-table-column
                      prop="email"
                      label="邮箱">
                    </el-table-column>
                    <el-table-column
                      prop="mobile"
                      label="手机号">
                    </el-table-column>
                    <el-table-column
                      prop="created"
                      label="创建日期">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button type="text" @click="addOrupdate(scope.row.userId)">编辑</el-button>
                        <el-button type="text" @click="roleDel(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
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
            </el-col>
          </el-row>
        </el-card>
      </div>
      <user-add-or-update v-if="visible" ref="addOrupdate" @refreshDataList="getList"></user-add-or-update>
    </div>
</template>

<script>
import UserAddOrUpdate from './UserAddOrUpdate'
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'UserManages',
  data () {
    return {
      condition: {
        param: ''
      },
      visible: false,
      deptId: '',
      OrgTree: [],
      userArr: [],
      multipleSelection: [],
      totalCount: 1,
      currPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.getTree()
  },
  methods: {
    // 获取组织结构树
    getTree () {
      this.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}).then(({data}) => {
        if (data.code === 0) {
          this.OrgTree = data.deptList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 根据deptId查询用户
    setdetail (data) {
      this.deptId = data.deptId
      this.getList()
    },
    // 获取列表
    getList () {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {
        deptId: this.deptId,
        param: this.condition.param,
        currPage: JSON.stringify(this.currPage),
        pageSize: JSON.stringify(this.pageSize)
      }).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.multipleSelection = []
          this.userArr = data.page.list
          this.currPage = data.page.currPage
          this.pageSize = data.page.pageSize
          this.totalCount = data.page.totalCount
        } else {
          this.$message.error(data.msg)
        }
        this.visible = false
      })
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item.userId)
      })
    },
    // 新增  修改
    addOrupdate (id) {
      if (this.deptId) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.addOrupdate.init(this.deptId, id)
        })
      } else {
        this.$message.error('请先选择部门')
      }
    },
    // 删除
    remove () {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要删除的用户')
      } else {
        this.$confirm('确认删除用户, 是否继续?', '删除用户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(`${BASICDATA_API.CONTAINERDEL_API}`, 'POST', this.multipleSelection).then(({data}) => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.multipleSelection = []
              this.getList()
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
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currPage = val
      this.getList()
    }
  },
  computed: {},
  components: {
    UserAddOrUpdate
  }
}
</script>

<style scoped>

</style>
