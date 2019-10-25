<template>
  <div class="header_main">
    <el-card class="searchCard  newCard">
      <el-form :inline="true" :model="formHeader" size="small" label-width="70px" class="sole_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发酵物料：">
          <el-select v-model="formHeader.materialCode" placeholder="请选择" filterable style="width: 160px">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="(sole, index) in this.material" :key="index" :value="sole.materialCode" :label="sole.materialCode+ ' ' + sole.materialName"></el-option>
          </el-select>
        </el-form-item>
        <div style="float: right">
          <el-button type="primary" size="small" @click="GetDataList(true)" v-if="isAuth('fer:sort:list')">查 询</el-button>
          <el-button type="primary" size="small" @click="addOrupdate()" v-if="isAuth('fer:sort:save')">新 增</el-button>
          <el-button type="danger" size="small" @click="delList()" v-if="isAuth('fer:sort:delete')">批量删除</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card style="margin-top:5px">
      <el-table ref="table1" header-row-class-name="tableHead" :data="DataList" @selection-change="handleSelectionChange" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
        <el-table-column type="selection" width="34"></el-table-column>
        <el-table-column label="工厂" prop="factoryName" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="发酵物料" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.materialCode + ' ' + scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="半成品类别" prop="halfType" width="115"></el-table-column>
        <el-table-column label="订单天数" prop="orderDays" width="110"></el-table-column>
        <el-table-column label="报工成熟天数" prop="matureDays" width="115"></el-table-column>
        <el-table-column label="发酵成熟天数" prop="fermentationMatureDays" width="115"></el-table-column>
        <el-table-column label="发酵超期天数" prop="outDays" width="115"></el-table-column>
        <el-table-column label="操作人员" prop="changer" width="120" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作时间" prop="changed" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="50" fixed="right">
          <template slot-scope="scope">
            <el-button style="padding: 0;" type="text" size="small" @click="addOrupdate(scope.row)" v-if="isAuth('fer:sort:update')">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formHeader.currPage"
          :page-sizes="[10, 20, 50]"
          :page-size="formHeader.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="formHeader.totalCount">
        </el-pagination>
      </el-row>
    </el-card>
    <category-addor-update v-if="visible" ref="addOrupdate" @refreshDataList="GetDataList" :factory="factory"></category-addor-update>
  </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import categoryAddorUpdate from './CategoryAddOrUpdate'
export default {
  name: 'index',
  data () {
    return {
      visible: false,
      formHeader: {
        factory: '',
        materialCode: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      dataListLoading: false,
      factory: [],
      material: [],
      multipleSelection: [],
      DataList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.GetMaterial(n)
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 查询
    GetDataList (ty) {
      if (ty) {
        this.formHeader.currPage = 1
      }
      this.$http(`${BASICDATA_API.CATEGORYS_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.visible = false
          this.DataList = data.ferList.list
          this.formHeader.currPage = data.ferList.currPage
          this.formHeader.pageSize = data.ferList.pageSize
          this.formHeader.totalCount = data.ferList.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 批量删除
    delList () {
      if (this.multipleSelection.length === 0) {
        this.$warning_SHINHO('请选择要删除的类别')
      } else {
        this.$confirm('确认删除类别, 是否继续?', '删除类别', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            item.delFlag = '1'
          })
          this.$http(`${BASICDATA_API.CATEGORY_DELETE}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$success_SHINHO('删除成功!')
              this.multipleSelection = []
              this.GetDataList()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        }).catch(() => {
        })
      }
    },
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取物料
    GetMaterial (n) {
      this.formHeader.materialCode = ''
      this.$http(`${BASICDATA_API.MATERIAL_LIST}`, 'POST', {factory: n, materialTypeCode: 'ZHAL'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.material = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 编辑新增
    addOrupdate (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.addOrupdate.init(id)
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.formHeader.pageSize = val
      this.GetDataList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.formHeader.currPage = val
      this.GetDataList()
    }
  },
  computed: {},
  components: {
    categoryAddorUpdate
  }
}
</script>

<style scoped>

</style>
