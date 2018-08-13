<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>容器管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>容器管理</h3>
    </div>
    <div class="main">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <div slot="header" class="clearfix">
                <span>参数类型</span>
              </div>
              <div>
                <el-table
                  header-row-class-name="tableHead"
                  :data="parameterType"
                  border
                  @row-click="setTypeDetail"
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px">
                  <el-table-column
                    type="index"
                    width="50"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    label="参数类型编码">
                    <template slot-scope="scope">{{ scope.row.code }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="参数类型名称">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="80">
                    <template slot-scope="scope"><el-button @click="remove(scope.$index,parameterType)">删除</el-button></template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header" class="clearfix">
                <span>参数</span>
              </div>
              <div>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px">
                  <el-table-column
                    type="index"
                    width="50"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    label="人员工号"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="人员姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="删除">
                    <template slot-scope="scope"><el-button @click="remove(scope.$index,tableData3)">删除</el-button></template>
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
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'ParameterManage',
  data () {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }],
      parameterType: []
    }
  },
  mounted () {
    this.$http(`${SYSTEMSETUP_API.PARAMETERTYPE_API}`, 'GET', {}).then(({data}) => {
      console.log(data)
      if (data.code === 0) {
        this.parameterType = data.page.list
      } else {
        this.$message.error(data.msg)
      }
    })
  },
  methods: {
    // 表格删除
    remove (index, rows) {
      rows.splice(index, 1)
    },
    //  设置类型详情
    setTypeDetail (row, event, column) {
      console.log(row.id)
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
