<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>设备管理</h3>
    </div>
    <div class="main">
      <el-card>
        <el-row class="clearfix">
          <div style="float: right">
            <el-form :inline="true" :model="form" size="small" label-width="68px" class="topforms2">
              <el-form-item>
                <el-input v-model="form.name" placeholder="物料/物料类型" suffix-icon="el-icon-search"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small">查询</el-button>
                <el-button size="small">同步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="orgcard">
              <div slot="header" class="clearfix">
                <span>组织架构一览</span>
              </div>
              <el-tree :data="OrgTree" default-expand-all @node-click="setdetail"></el-tree>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="orgcard">
              <div slot="header" class="clearfix">
                <span>设备管理</span>
              </div>
              <div>
                <el-button @click="remove(scope.$index,tableData3)" style="float: right;margin-bottom: 20px">批量删除</el-button>
                <el-button @click="addOrupdate(deptId)" style="float: right;margin-bottom: 20px">新增</el-button>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="设备编号">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="设备描述"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button type="text" @click="addOrupdate(deptId, scope.$index,tableData3)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <add-orupdate v-if="visible" ref="addOrupdate"></add-orupdate>
  </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import AddOrupdate from './DeviceAddorUpdate'
export default {
  name: 'DeviceManage',
  data () {
    return {
      deptId: 0,
      visible: false,
      OrgTree: [],
      form: {}
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
    // 获取设备列表
    setdetail (data) {
      this.deptId = data.deptId
      this.$http(`${BASICDATA_API.DEVICELIST_API}`, 'GET', {
        DEPTID: data.deptId
      }).then(({data}) => {
        console.log(data)
      })
    },
    // 添加和编辑
    addOrupdate (deptId, id) {
      if (deptId === 0) {
        this.$message.error('请选择部门后新增')
      } else {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.addOrupdate.init(deptId, id)
        })
      }
    }
  },
  computed: {},
  components: {
    AddOrupdate
  }
}
</script>

<style scoped>

</style>
