<template>
  <el-col >
    <div class="main mainHeader">
      <el-card>
        <el-row style="margin-bottom:10px;">
          <el-select v-model="factory" >
            <el-option label="请选择" value="" ></el-option>
            <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
          </el-select>
          <el-input v-model="searchType" placeholder="请输入" suffix-icon="el-icon-search" style="width: 200px"></el-input>
          <el-button type="primary" @click="getdictList">查询</el-button>
        </el-row>
        <el-row type="flex" :gutter="10">
          <el-col :span="8" style="min-width: 400px">
            <el-card>
              <div slot="header" class="clearfix">
                <div slot="header" class="clearfix">
                  <span style="float: left;line-height: 40px">参数类型</span>
                  <el-button type="text" icon="el-icon-plus" style="display: inline-block;float: right; padding: 12px;" @click="addorupdate('type')" v-if="isAuth('sys:dict:save')"></el-button>
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
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column :show-overflow-tooltip=true label="工厂" prop="factoryName"></el-table-column>
                  <el-table-column prop="type" :show-overflow-tooltip=true label="参数类型编码" width="110"></el-table-column>
                  <el-table-column prop="name" :show-overflow-tooltip=true label="参数类型名称" width="110"></el-table-column>
                  <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="80">-->
                    <!--<template slot-scope="scope"><el-button type="text" @click="remove(scope.$index,parameterType)">删除</el-button></template>-->
                  <!--</el-table-column>-->
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currPage"
                  :page-sizes="[10, 20, 50]"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="totalCount">
                </el-pagination>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card>
              <div slot="header" class="clearfix">
                <span style="float: left;line-height: 40px">参数</span>
                <el-button type="text" icon="el-icon-plus" style="display: inline-block;float: right; padding: 12px;" @click="addorupdate('param',false,true)" v-if="isAuth('sys:dict:save')"></el-button>
              </div>
              <div>
                <el-table ref="table1" header-row-class-name="tableHead" :data="parameter" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
                  <el-table-column type="index" width="50" label="序号"></el-table-column>
                  <el-table-column :show-overflow-tooltip=true label="工厂" prop="factoryName" width="100"></el-table-column>
                  <el-table-column prop="type" :show-overflow-tooltip=true label="参数类型编码"></el-table-column>
                  <el-table-column prop="name" :show-overflow-tooltip=true label="参数类型名称"></el-table-column>
                  <el-table-column prop="code" :show-overflow-tooltip=true label="参数编码"></el-table-column>
                  <el-table-column prop="value" :show-overflow-tooltip=true label="参数名称"></el-table-column>
                  <el-table-column width="96" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" @click="remove(scope.row)" v-if="isAuth('sys:dict:delete')">删除</el-button>
                      <el-button type="text" @click="addorupdate('param', scope.row)" v-if="isAuth('sys:dict:update')">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <add-or-update ref="addOrupdate" v-if="visible" @refreshDataList="getList()" :factoryList="factoryList"></add-or-update>
  </el-col>
</template>

<script>
import addOrUpdate from './ParameterAddorUpdate'
import {SYSTEMSETUP_API, BASICDATA_API} from '@/api/api'
export default {
  name: 'ParameterManage',
  data () {
    return {
      visible: false,
      activeItem: {},
      parameterType: [],
      parameter: [],
      adds: {},
      factoryList: [],
      factory: '',
      searchType: '',
      totalCount: 1,
      currPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.getdictList()
    this.getFactoryList()
  },
  methods: {
    // 获取类型
    getdictList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERTYPE_API}`, 'POST', {
        factory: this.factory,
        type: this.searchType,
        totalCount: this.totalCount + '',
        currPage: this.currPage + '',
        pageSize: this.pageSize + ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.parameterType = data.list.list
          this.totalCount = data.list.totalCount
          this.currPage = data.list.currPage
          this.pageSize = data.list.pageSize
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
            this.$success_SHINHO('删除成功!')
            this.getList()
          } else {
            this.$notify.error({title: '错误', message: data.msg})
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
      this.adds.factory = row.factory
      this.adds.deptName = row.deptName
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {factory: row.factory, type: row.type}).then(({data}) => {
        if (data.code === 0) {
          this.parameter = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
      this.visible = true
      this.$nextTick(() => {
        if (adds) {
          this.$refs.addOrupdate.init(str, id, this.adds)
        } else {
          this.$refs.addOrupdate.init(str, id)
        }
      })
    },
    // 获取工厂
    getFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.factoryList = res.data.typeList
          // if (!this.plantList.factoryid) {
          //   this.plantList.factoryid = res.data.typeList[0].deptId
          // }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getdictList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.currPage = val
      this.getdictList()
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
  .mainHeader .el-card__header { padding: 0 15px !important; }
</style>
<style scoped>
.el-button[type='text'] { padding: 0; }
</style>
