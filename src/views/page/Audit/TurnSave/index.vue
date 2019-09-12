<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-form :inline="true" size="small" :model="formHeader" label-width="70px" class="topform marbottom">
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
          <el-select v-model="formHeader.holderType" multiple filterable placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option label="发酵罐"  value="001"></el-option>
            <el-option label="原汁罐"  value="013"></el-option>
            <el-option label="jbs罐"  value="016"></el-option>
          </el-select>
          <!--<el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="formHeader.productDate" style="width: 180px"></el-date-picker>-->
        </el-form-item>
        <el-form-item label="容器号：" label-width="70px">
          <el-select v-model="formHeader.holderNo" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产物料：" label-width="70px">
          <el-select v-model="formHeader.materialCode" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产订单：">
          <el-input type="text" v-model="formHeader.orderNo" clearable style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="移动类型：" label-width="70px">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <div style="float: right">
          <el-button type="primary" size="small" @click="GetDataList(true)" v-if="isAuth('ste:order:list')">查询</el-button>
          <el-button type="primary" size="small" @click="TurnSave(true)" v-if="isAuth('ste:order:list')">转储</el-button>
          <el-button type="primary" size="small" @click="Rework(true)" v-if="isAuth('ste:order:list')">返工</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)" v-if="isAuth('ste:order:list')">导出</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card class="searchCard  newCard" style="min-height: 420px">
      <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">转储</span>
          <el-table ref="table1" header-row-class-name="tableHead" :data="DataList" @selection-change="handleSelectionChange" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
            <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
            <el-table-column prop="verifyMan" label="领用罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="物料" width="150" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="类别" width="150" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="批次" width="150" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="领用量" width="150" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="单位" width="50" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入罐类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="物料" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入批次" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="操作人" width="100" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">返工</span>
          <el-table ref="table1" header-row-class-name="tableHead" :data="DataList" @selection-change="handleSelectionChange1" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
            <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
            <el-table-column prop="verifyMan" label="移动类型" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="领用罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="物料" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="批次" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="领用量" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="单位" width="50" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入罐类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入罐号" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="物料" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="类别" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="打入批次" width="100" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="verifyMan" label="操作人" width="100" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
        holderType: [],
        holderNo: '',
        materialCode: '',
        orderNo: '',
        listType: 'add'
      },
      factory: [],
      workshop: [],
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
      this.GetDataList()
    }
  },
  mounted () {
    getFactory(this)
  },
  methods: {
    GetDataList () {
      if (this.activeName === '1') {
        this.formHeader.listType = 'add'
      } else if (this.activeName === '2') {
        this.formHeader.listType = 'dump'
      }
      this.$http(`${AUDIT_API.AUDIT_TURNSAVE_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.multipleSelection = []
          this.multipleSelection1 = []
          this.DataList = data.juiceExamine.list
          this.formHeader.currPage = data.juiceExamine.currPage
          this.formHeader.pageSize = data.juiceExamine.pageSize
          this.formHeader.totalCount = data.juiceExamine.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    TurnSave () {
      if (this.multipleSelection > 0) {} else if (this.multipleSelection1 > 0) {
        this.$notify({title: '警告', message: '返工内容无法转储，请点击返工！', type: 'warning'})
      }
    },
    Rework () {
      if (this.multipleSelection1 > 0) {} else if (this.multipleSelection > 0) {
        this.$notify({title: '警告', message: '转储内容无法返工，请点击转储！', type: 'warning'})
      }
    },
    ExportExcel () {
      let that = this
      exportFile(`${AUDIT_API.AUDIT_TURNSAVE_LIST}`, '原汁转储导出', that)
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
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
