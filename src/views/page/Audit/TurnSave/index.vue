<template>
  <div class="header_main">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-form :inline="true" size="small" :model="formHeader" label-width="70px" class="topform multi_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器类型：" label-width="70px">
          <el-select v-model="formHeader.holderTypes" multiple filterable placeholder="请选择" style="width: 180px">
            <el-option label="请选择" value=""></el-option>
            <el-option label="发酵罐" value="001"></el-option>
            <el-option label="原汁罐" value="013"></el-option>
            <el-option label="JBS罐" value="016"></el-option>
          </el-select>
          <!--<el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="formHeader.productDate" style="width: 180px"></el-date-picker>-->
        </el-form-item>
        <el-form-item label="容器号：" label-width="70px">
          <el-select v-model="formHeader.holderNo" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.HOLDER_NAME" v-for="(item, index) in PotList" :key="index" :value="item.HOLDER_NO"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产物料：" label-width="70px">
          <el-select v-model="formHeader.materialCode" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.MATERIAL_NAME" v-for="(item, index) in MaterialList" :key="index" :value="item.MATERIAL_CODE"></el-option>
          </el-select>
        </el-form-item>
        <div class="floatr">
          <el-button type="primary" size="small" @click="GetDataList(true)" v-if="isAuth('ste:order:list')">查询</el-button>
          <el-button type="primary" size="small" @click="TurnSave(true)" v-if="isAuth('ste:order:list')">转储</el-button>
          <el-button type="primary" size="small" @click="Rework(true)" v-if="isAuth('ste:order:list')">返工</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)" v-if="isAuth('ste:order:list')">导出</el-button>
        </div>
      </el-form>
    </el-card>
    <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">转储</span>
        <el-table ref="table1" header-row-class-name="tableHead" :data="DataList.slice((formHeader.currPage-1)*formHeader.pageSize,formHeader.currPage*formHeader.pageSize)" @selection-change="handleSelectionChange" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
          <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
          <el-table-column prop="holderName" label="领用罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="verifyMan" label="物料" width="150" :show-overflow-tooltip="true"><template slot-scope="scope" width="120">{{scope.row.materialCode + ' ' + scope.row.materialName}}</template></el-table-column>
          <el-table-column prop="receiveType" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="receiveBatch" label="批次" width="150" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="receiveAmount" label="领用量" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="unit" label="单位" width="50" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="inHolderType" label="打入罐类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="inHolderName" label="打入罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="verifyMan" label="物料" width="150" :show-overflow-tooltip="true"><template slot-scope="scope" width="120">{{scope.row.inMaterialCode + ' ' + scope.row.inMaterialName}}</template></el-table-column>
          <el-table-column prop="inType" label="打入类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="inBatch" label="打入批次" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="creator" label="操作人" width="100" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formHeader.currPage"
            :page-sizes="[10, 15, 20]"
            :page-size="formHeader.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="formHeader.totalCount">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">返工</span>
        <el-table ref="table1" header-row-class-name="tableHead" :data="DataList.slice((formHeader.currPage-1)*formHeader.pageSize,formHeader.currPage*formHeader.pageSize)" @selection-change="handleSelectionChange1" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
          <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
          <el-table-column prop="moveType" label="移动类型" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="holderName" label="领用罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="verifyMan" label="物料" width="150" :show-overflow-tooltip="true"><template slot-scope="scope" width="120">{{scope.row.materialCode + ' ' + scope.row.materialName}}</template></el-table-column>
          <el-table-column prop="type" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="batch" label="批次" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="amount" label="领用量" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="unit" label="单位" width="50" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="inHolderType" label="打入罐类别" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="inHolderName" label="打入罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="verifyMan" label="物料" width="150" :show-overflow-tooltip="true"><template slot-scope="scope" width="120">{{scope.row.inMaterialCode + ' ' + scope.row.inMaterialName}}</template></el-table-column>
          <el-table-column prop="creator" label="操作人" width="100" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formHeader.currPage"
            :page-sizes="[10, 15, 20]"
            :page-size="formHeader.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="formHeader.totalCount">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getFactory, getWorkshop, exportFile} from '@/net/validate'
import {AUDIT_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      activeName: '1',
      formHeader: {
        factory: '',
        workShop: '',
        holderType: '',
        holderTypes: [],
        holderNo: '',
        materialCode: '',
        orderNo: '',
        listType: 'dump',
        currPage: 1,
        pageSize: 10,
        totalCount: 1
      },
      factory: [],
      workshop: [],
      PotList: [],
      MaterialList: [],
      multipleSelection: [],
      multipleSelection1: [],
      DataList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      getWorkshop(this, n)
    },
    'activeName' (n, o) {
      this.GetDataList(true)
    }
  },
  mounted () {
    getFactory(this)
    this.GetPostLost()
  },
  methods: {
    GetPostLost () {
      this.$http(`${AUDIT_API.JUICT_POT_LIST}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.PotList = data.materialPotList.pot
          this.MaterialList = data.materialPotList.material
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GetDataList (st) {
      if (st) {
        this.formHeader.currPage = 1
      }
      if (this.activeName === '1') {
        this.formHeader.listType = 'dump'
      } else if (this.activeName === '2') {
        this.formHeader.listType = 'add'
      }
      if (this.formHeader.holderTypes.length === 0) {
        this.formHeader.holderType = ''
      } else {
        this.formHeader.holderType = this.formHeader.holderTypes
      }
      this.$http(`${AUDIT_API.AUDIT_TURNSAVE_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.multipleSelection = []
          this.multipleSelection1 = []
          this.DataList = data.juiceExamine
          this.formHeader.totalCount = data.juiceExamine.length
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    TurnSave () {
      if (this.multipleSelection.length > 0) {} else if (this.multipleSelection1.length > 0) {
        this.$warning_SHINHO('返工内容无法转储，请点击返工！')
      }
    },
    Rework () {
      if (this.multipleSelection1.length > 0) {} else if (this.multipleSelection.length > 0) {
        this.$warning_SHINHO('转储内容无法返工，请点击转储！')
      }
    },
    ExportExcel () {
      if (this.formHeader.holderTypes.length === 0) {
        this.formHeader.holderType = ''
      } else {
        this.formHeader.holderType = this.formHeader.holderTypes
      }
      let that = this
      if (this.activeName === '1') {
        this.formHeader.listType = 'dump'
      } else if (this.activeName === '2') {
        this.formHeader.listType = 'add'
      }
      if (this.formHeader.listType === 'add') {
        exportFile(`${AUDIT_API.AUDIT_DUMP_EXPORT}`, '原汁生管转储审核导出', that)
      } else {
        exportFile(`${AUDIT_API.AUDIT_ADD_EXPORT}`, '原汁生管添加审核导出', that)
      }
    },
    // 审核通过禁用
    checkboxT (row) {
      if ((row.status === 'checked' && row.interfaceReturnStatus === '1') || row.status === 'noPass') {
        return 0
      } else {
        return 1
      }
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 表格选中
    handleSelectionChange1 (val) {
      this.multipleSelection1 = []
      val.forEach((item, index) => {
        this.multipleSelection1.push(item)
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.formHeader.pageSize = val
      this.multipleSelection = []
      this.multipleSelection1 = []
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.formHeader.currPage = val
      this.multipleSelection = []
      this.multipleSelection1 = []
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
