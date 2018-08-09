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
                  <el-button>增加</el-button>
                  <el-table
                    :data="userArr"
                    header-row-class-name="tableHead"
                    border
                    style="border-radius: 10px">
                    <el-table-column
                      type="index"
                      :index="1">
                    </el-table-column>
                    <el-table-column
                      prop="roleName"
                      label="人员工号">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="虚拟工号">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="人员姓名">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="职务">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="创建日期">
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
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'UserManages',
  data () {
    return {
      OrgTree: [],
      userArr: []
    }
  },
  mounted () {
    this.getTree()
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
    setdetail () {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
