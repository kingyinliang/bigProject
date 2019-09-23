<template>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <!--<div class="topTitle">-->
        <!--<el-breadcrumb separator="/">-->
          <!--<el-breadcrumb-item>基础数据</el-breadcrumb-item>-->
          <!--<el-breadcrumb-item>容器管理</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div>-->
      <div class="main">
        <el-card>
          <h3>容器管理列表</h3>
          <el-row type="flex">
            <el-col class="header_main" style="margin-bottom:10px">
              <el-form :inline="true" :model="form" size="small" label-width="70px" class="multi_row" @keyup.enter.native="qurery()" @submit.native.prevent>
                <el-form-item label="归属工厂：" >
                  <el-select v-model="form.factory" placeholder="请选择">
                    <el-option label=""  value="">请选择</el-option>
                    <el-option :label="item.deptName" v-for="(item, index) in factoryList" :key="index" :value="item.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="归属车间：">
                  <el-select v-model="form.dept_id" placeholder="请选择">
                    <el-option label=""  value="">请选择</el-option>
                    <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="容器类型：">
                  <el-select v-model="form.holder_type" placeholder="请选择">
                    <el-option label=""  value="">请选择</el-option>
                    <el-option :label="item.value" v-for="(item, index) in dictList" :key="index" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="容器号：">
                  <el-input v-model="form.holder_no" placeholder="手动输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="容器量：">
                  <el-input v-model="form.holder_hold" placeholder="手动输入" clearable></el-input>
                </el-form-item>
                <el-form-item class="floatr">
                  <el-button type="primary" size="small" @click="qurery(true)" v-if="isAuth('sys:holder:checkList')">查询</el-button>
                  <el-button type="primary" size="small" @click="addOrupdate()" v-if="isAuth('sys:holder:save')">新增</el-button>
                  <el-button type="danger" size="small" @click="remove" v-if="isAuth('sys:holder:delete')">批量删除</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              @selection-change="handleSelectionChange"
              :data="list"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px">
              <el-table-column
                type="selection"
                width="34">
              </el-table-column>
              <el-table-column
                type="index"
                :index="indexMethod"
                label="序号"
                width="55">
              </el-table-column>
              <el-table-column
                prop="typeName"
                label="容器类型"
                :show-overflow-tooltip="true"
                width="100">
              </el-table-column>
              <el-table-column
                prop="holderNo"
                label="容器号"
                :show-overflow-tooltip="true"
                width="80">
              </el-table-column>
              <el-table-column
                prop="holderName"
                :show-overflow-tooltip="true"
                label="容器描述">
              </el-table-column>
              <el-table-column
                prop="holderHold"
                label="容器量"
                :show-overflow-tooltip="true"
                width="80">
              </el-table-column>
              <el-table-column
                prop="holderPatch"
                label="批数"
                :show-overflow-tooltip="true"
                width="80">
              </el-table-column>
              <el-table-column
                prop="holderArea"
                label="物理区域"
                :show-overflow-tooltip="true"
                width="120">
              </el-table-column>
              <el-table-column
                prop="factoryName"
                label="归属工厂"
                :show-overflow-tooltip="true"
                width="92">
              </el-table-column>
              <el-table-column
                prop="deptName"
                label="归属车间"
                :show-overflow-tooltip="true"
                width="92">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                header-align="left"
                align="left"
                width="65">
                <template slot-scope="scope">
                  <el-button style="padding: 0;" type="text" @click="addOrupdate(scope.row.holderId)"  v-if="isAuth('sys:holder:delete') && isAuth('sys:holder:findById')">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.currPage"
              :page-sizes="[10, 15, 20]"
              :page-size="form.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="form.totalCount">
            </el-pagination>
          </el-row>
        </el-card>
      </div>
      <con-addor-update v-if="visible" ref="addOrupdate" @refreshDataList="GetContainerList"></con-addor-update>
    </el-col>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
import ConAddorUpdate from './ContaninerAddorUpdate'
export default {
  name: 'ContainerManage',
  data () {
    return {
      visible: false,
      form: {
        type: 'holder_type',
        factory: '',
        deptId: '',
        holderType: '',
        holderNo: '',
        holderHold: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factoryList: [],
      workshop: [],
      // currPage: 1,
      // pageSize: 10,
      // totalCount: 0,
      multipleSelection: [],
      dictList: [],
      list: []
    }
  },
  mounted () {
    this.GetContainerList()
    this.getDictList()
    this.getFactoryList()
    // this.Getdeptcode(this.form.factoryId)
  },
  methods: {
    // 序号
    indexMethod (index) {
      return index + 1 + (this.form.currPage * 1 - 1) * (this.form.pageSize * 1)
    },
    // 获取容器列表
    GetContainerList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST1_API}`, 'POST', this.form).then(({data}) => {
        if (data.code === 0) {
          this.multipleSelection = []
          this.list = data.page.list
          this.form.currPage = data.page.currPage
          this.form.pageSize = data.page.pageSize
          this.form.totalCount = data.page.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        this.visible = false
      })
    },
    // 容器参数下拉
    getDictList (factory) {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {type: 'holder_type'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.dictList = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    getFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.factoryList = res.data.typeList
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    },
    // 获取归属车间,根据工厂ID
    Getdeptcode (factoryId) {
      if (factoryId) {
        this.$set(this.form, 'dept_id', '')
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: factoryId}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item.holderId)
      })
    },
    // 查询
    qurery (st) {
      if (st) {
        this.form.currPage = 1
      }
      this.GetContainerList(this.form)
    },
    // 编辑
    addOrupdate (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addOrupdate.init(id)
      })
    },
    // 删除
    remove () {
      if (this.multipleSelection.length === 0) {
        this.$warning_SHINHO('请选择要删除的容器')
      } else {
        this.$confirm('确认删除容器, 是否继续?', '删除容器', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(`${BASICDATA_API.CONTAINERDEL_API}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$success_SHINHO('删除成功!')
              this.multipleSelection = []
              this.GetContainerList()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        }).catch(() => {
        })
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.form.pageSize = val
      this.GetContainerList(this.form)
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.form.currPage = val
      this.GetContainerList(this.form)
    }
  },
  watch: {
    'form.factory' (n) {
      this.Getdeptcode(n)
      this.getDictList(n)
    }
  },
  computed: {},
  components: {
    ConAddorUpdate
  }
}
</script>

<style scoped>

</style>
<style lang="scss">
.main{
  h3{
    font-size: 16px;
    font-weight: bold;
    line-height: 38px;
    margin-bottom: 10px;
  }
}
.topforms1{
  input{
    width: 140px!important;
  }
}
</style>
