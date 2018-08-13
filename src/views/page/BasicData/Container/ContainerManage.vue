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
          <h3>容器管理列表</h3>
          <el-row type="flex">
            <el-col>
              <el-form :inline="true" :model="form" size="small" label-width="68px" class="topforms1">
                <el-form-item label="容器类型">
                  <el-select v-model="form.holderType" placeholder="请选择">
                    <el-option label="发酵罐" value="发酵罐"></el-option>
                    <el-option label="成品罐" value="成品罐"></el-option>
                    <el-option label="半成品罐" value="半成品罐"></el-option>
                    <el-option label="连续蒸煮号" value="连续蒸煮号"></el-option>
                    <el-option label="曲房" value="曲房"></el-option>
                    <el-option label="麦粉计量仓" value="麦粉计量仓"></el-option>
                    <el-option label="豆粕计量仓" value="豆粕计量仓"></el-option>
                    <el-option label="盐水罐" value="盐水罐"></el-option>
                    <el-option label="筛前罐" value="筛前罐"></el-option>
                    <el-option label="筛后罐" value="筛后罐"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="容器号">
                  <el-input v-model="form.holderNo" placeholder="手动输入"></el-input>
                </el-form-item>
                <el-form-item label="容器量">
                  <el-input v-model="form.holderHold" placeholder="手动输入"></el-input>
                </el-form-item>
                <el-form-item label="归属车间">
                  <el-input v-model="form.deptId" placeholder="手动输入"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style="width: 280px">
              <el-button size="small" @click="qurery">查询</el-button>
              <el-button size="small" @click="addOrupdate()">新增</el-button>
              <el-button size="small" @click="remove">批量删除</el-button>
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
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="holderType"
                label="容器类型"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderNo"
                label="容器号"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderName"
                label="容器描述">
              </el-table-column>
              <el-table-column
                prop="holderHold"
                label="容器量"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderPatch"
                label="批数"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderArea"
                label="物理区域"
                width="95">
              </el-table-column>
              <el-table-column
                prop="deptId"
                label="归属车间"
                width="95">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="addOrupdate(scope.row.holderId)">编辑</el-button>
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
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </el-row>
        </el-card>
      </div>
      <con-addor-update v-if="visible" ref="addOrupdate" @refreshDataList="GetContainerList"></con-addor-update>
    </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import ConAddorUpdate from './ContaninerAddorUpdate'
export default {
  name: 'ContainerManage',
  data () {
    return {
      visible: false,
      form: {},
      currPage: 1,
      pageSize: 10,
      totalCount: 0,
      multipleSelection: [],
      list: []
    }
  },
  mounted () {
    this.GetContainerList()
  },
  methods: {
    // 获取容器列表
    GetContainerList (obj) {
      if (!obj) {
        obj = {
          pageSize: JSON.stringify(this.pageSize),
          currPage: JSON.stringify(this.currPage)
        }
      }
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', obj).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.multipleSelection = []
          this.list = data.page.list
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
        this.multipleSelection.push(item.holderId)
      })
    },
    // 查询
    qurery () {
      this.GetContainerList({
        pageSize: JSON.stringify(this.pageSize),
        currPage: JSON.stringify(this.currPage),
        holder_type: this.form.holderType,
        holder_no: this.form.holderNo,
        holder_hold: this.form.holderHold,
        dept_id: this.form.deptId
      })
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
      console.log(this.multipleSelection)
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择要删除的容器')
      } else {
        this.$confirm('确认删除容器, 是否继续?', '删除容器', {
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
              this.GetContainerList()
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
      this.GetContainerList({
        pageSize: JSON.stringify(val),
        currPage: '1',
        holderType: this.form.holderType,
        holderNo: this.form.holderNo,
        holderHold: this.form.holderHold,
        deptId: this.form.deptId
      })
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.GetContainerList({
        holderType: this.form.holderType,
        holderNo: this.form.holderNo,
        holderHold: this.form.holderHold,
        deptId: this.form.deptId,
        pageSize: JSON.stringify(this.pageSize),
        currPage: JSON.stringify(val)
      })
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
