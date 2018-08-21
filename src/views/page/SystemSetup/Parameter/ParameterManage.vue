<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>参数管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card>
              <div slot="header" class="clearfix">
                <div slot="header" class="clearfix">
                  <span style="float: left;line-height: 35px">参数类型</span>
                  <el-button type="text" icon="el-icon-plus" style="display: inline-block;float: right" @click="addorupdate('type')"></el-button>
                </div>
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
                    <template slot-scope="scope">{{ scope.row.type }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="参数类型名称">
                  </el-table-column>
                  <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="80">-->
                    <!--<template slot-scope="scope"><el-button type="text" @click="remove(scope.$index,parameterType)">删除</el-button></template>-->
                  <!--</el-table-column>-->
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="float: left;line-height: 35px">参数</span>
                <el-button type="text" icon="el-icon-plus" style="display: inline-block;float: right" @click="addorupdate('param',false,true)"></el-button>
              </div>
              <div>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="parameter"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px">
                  <el-table-column
                    type="index"
                    width="50"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="参数类型编码">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="参数类型名称">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="参数编码">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="参数名称">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="remove(scope.row)">删除</el-button>
                      <el-button type="text" @click="addorupdate('param', scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <add-or-update ref="addOrupdate" v-if="visible" @refreshDataList="getList()"></add-or-update>
  </div>
</template>

<script>
import addOrUpdate from './ParameterAddorUpdate'
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'ParameterManage',
  data () {
    return {
      visible: false,
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
      activeItem: {},
      parameterType: [],
      parameter: [],
      adds: {}
    }
  },
  mounted () {
    this.getdictList()
  },
  methods: {
    // 获取类型
    getdictList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERTYPE_API}`, 'GET', {
      }).then(({data}) => {
        if (data.code === 0) {
          this.parameterType = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 表格删除
    remove (row) {
      this.$confirm('确认删除参数, 是否继续?', '删除参数', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${SYSTEMSETUP_API.PARAMETERDEL_API}`, 'POST', [row.id]).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    //  设置类型详情
    setTypeDetail (row, event, column) {
      this.activeItem = row
      this.adds = {}
      this.adds.name = row.name
      this.adds.type = row.type
      console.log(this.adds)
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=${row.type}`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.parameter = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 更新列表
    getList () {
      this.getdictList()
      this.setTypeDetail(this.activeItem)
    },
    // 新增  修改
    addorupdate (str, id, adds) {
      console.log(this.adds)
      this.visible = true
      this.$nextTick(() => {
        if (adds) {
          this.$refs.addOrupdate.init(str, id, this.adds)
        } else {
          this.$refs.addOrupdate.init(str, id)
        }
      })
    }
  },
  computed: {},
  components: {
    addOrUpdate
  }
}
</script>

<style lang="scss">
  .el-card__header{
    padding: 13px 15px;
  }
</style>
<style scoped>

</style>
