<template>
  <div class="main">
    <el-card class="searchCard  newCard ferCard">
      <el-form :inline="true" :model="formHeader" size="small" label-width="75px" class="marbottom">
        <el-form-item label="生产工厂：">
            <el-select v-model="formHeader.factory" placeholder="请选择" class="width140px">
              <el-option value="">请选择</el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
            <el-select v-model="workShopStr" value-key="deptId" palceholder="请选择" class="width140px">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in workshop" :key="item.deptId" :value="item" :label="item.deptName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生产产线：">
          <el-select v-model="formHeader.productLine" placeholder="请选择" class="width140px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号：">
          <el-input v-model="formHeader.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="品相：">
          <el-select v-model="formHeader.materialCode" placeholder="请选择" style="width: 140px">
            <el-option v-for="(sole, index) in this.materiaList" :key="index" :value="sole.MATERIAL_CODE" :label="`${sole.MATERIAL_CODE}`+ ' ' +`${sole.MATERIAL_NAME}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期：">
          <el-date-picker type="date" v-model="formHeader.orderStartDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:140px"></el-date-picker> - <el-date-picker type="date" v-model="formHeader.orderEndDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:140px"></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" @click="GetList(true)" style="float: right" v-if="isAuth('report:production:materielTrace')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="secondcard">
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="日期" show-overflow-tooltip prop="orderDate" width="110"></el-table-column>
        <el-table-column label="工厂" show-overflow-tooltip prop="factory"></el-table-column>
        <el-table-column label="车间" show-overflow-tooltip prop="workShopName"></el-table-column>
        <el-table-column label="产线" show-overflow-tooltip prop="productLineName" width="120"></el-table-column>
        <el-table-column label="订单" show-overflow-tooltip prop="orderNo" width="120"></el-table-column>
        <el-table-column label="生产物料" show-overflow-tooltip prop="material">
          <template slot-scope="scope">
            {{scope.row.materialCode}}{{scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="生产数量" show-overflow-tooltip prop="realInAmount" width="110"></el-table-column>
        <el-table-column label="单位" show-overflow-tooltip prop="inUnit"></el-table-column>
        <el-table-column label="生产批次" show-overflow-tooltip prop="inBatch" width="50"></el-table-column>
        <el-table-column label="组件物料" show-overflow-tooltip prop="mainBatch" width="110">
          <template slot-scope="scope">
            {{scope.row.useMaterialCode}}{{scope.row.useMaterialName}}
          </template>
        </el-table-column>
        <el-table-column label="组件物料数量" show-overflow-tooltip prop="useInAmount" width="110"></el-table-column>
        <el-table-column label="单位" show-overflow-tooltip prop="useUnit"></el-table-column>
        <el-table-column label="组件物料批次" show-overflow-tooltip prop="useBatch"></el-table-column>
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
  </div>
</template>

<script>
import { BASICDATA_API, REP_API } from '@/api/api'
// import { exportFile } from '@/net/validate'
export default {
  name: 'TwoOneRetrospect',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        workShopName: '',
        productLine: '',
        orderNo: '',
        materialCode: '',
        orderStartDate: '',
        orderEndDate: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      workShopStr: '',
      factory: [],
      workshop: [],
      productline: [],
      materiaList: [],
      dataList: []
    }
  },
  mounted () {
    this.Getdeptcode()
    this.GetMateriaList()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
    },
    'workShopStr' (n, o) {
      this.GetParentline(n.deptId)
    }
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          if (!this.formHeader.factory && data.typeList.length > 0) {
            this.formHeader.factory = data.typeList[0].deptId
          }
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formHeader.workShop = ''
      this.workShopStr = ''
      this.formHeader.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (!this.workShopStr && data.typeList.length > 0) {
              this.workShopStr = data.typeList[0]
            }
          } else {
            this.$error_SHINHO(data.msg)
          }
        })
      }
    },
    // 获取产线
    GetParentline (id) {
      this.formHeader.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.productline = data.childList
          } else {
            this.$error_SHINHO(data.msg)
          }
        })
      }
    },
    // 获取品相
    GetMateriaList () {
      this.$http(`${REP_API.CURRENT_MATERIALTRACEABILITY_LIAT}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.materiaList = data.materielTraceSelectInfo
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    GetList (st) {
      if (this.workShopStr === '' || !this.workShopStr) {
        this.$warning_SHINHO('请选择车间')
        return false
      } else {
        this.formHeader.workShop = this.workShopStr.deptId
        this.formHeader.workShopName = this.workShopStr.deptName
      }
      if (st) {
        this.formHeader.currPage = 1
      }
      this.$http(`${REP_API.CURRENT_MATERIALTRACEABILITY_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.materielTrace.list
          this.formHeader.currPage = data.materielTrace.currPage
          this.formHeader.pageSize = data.materielTrace.pageSize
          this.formHeader.totalCount = data.materielTrace.totalCount
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    // ExportExcel () {
    //   let that = this
    //   exportFile(`${REP_API.REPTWOONERETROSPECT_API}`, '二合一批次追溯报表', that)
    // },
    // 改变每页条数
    handleSizeChange (val) {
      this.formHeader.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.formHeader.currPage = val
      this.GetList()
    }
  }
}
</script>
