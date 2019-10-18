<template>
  <div class="header_main">
    <el-card class="searchCards newCard">
      <el-row>
        <el-col :span="24">
          <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="multi_row">
            <el-form-item label="生产工厂：">
              <el-select v-model="formHeader.factory" class="width150px">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in factoryList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产车间：">
              <el-select v-model="formHeader.workShop" class="width150px">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产产线：">
              <el-select v-model="formHeader.productLine">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in productlineList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item><br>
            <el-form-item label="订单：">
              <el-input v-model="formHeader.orderNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="生产品相：">
              <el-input v-model="formHeader.materialCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="生产日期：">
              <el-date-picker type="date" v-model="formHeader.commitDateOne" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:150px"></el-date-picker> - <el-date-picker type="date" v-model="formHeader.commitDateTwo" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:150px"></el-date-picker>
            </el-form-item>
            <el-form-item class="floatr">
              <el-button type="primary" @click="GetList(true)" v-if="isAuth('report:formh:pkgOneAndTwoList')" size="small">查询</el-button>
              <el-button type="primary" @click="ExportExcel(true)" v-if="isAuth('report:formh:exportPkgOneAndTwoList')" size="small">导出</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="secondcard">
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="生产日期" show-overflow-tooltip prop="productDate" width="110"></el-table-column>
        <el-table-column label="工厂" show-overflow-tooltip prop="factoryName"></el-table-column>
        <el-table-column label="车间" show-overflow-tooltip prop="workShopName"></el-table-column>
        <el-table-column label="产线" show-overflow-tooltip prop="productLineName" width="120"></el-table-column>
        <el-table-column label="生产订单" show-overflow-tooltip prop="orderNo" width="120"></el-table-column>
        <el-table-column label="生产物料" show-overflow-tooltip prop="material"></el-table-column>
        <el-table-column label="生产批次" show-overflow-tooltip prop="batch" width="110"></el-table-column>
        <el-table-column label="生产数" show-overflow-tooltip prop="countOutPut"></el-table-column>
        <el-table-column label="单位" show-overflow-tooltip prop="countOutPutUnit" width="50"></el-table-column>
        <el-table-column label="主产品批次" show-overflow-tooltip prop="mainBatch" width="110"></el-table-column>
        <el-table-column label="赠品批次" show-overflow-tooltip prop="attachBatch" width="110"></el-table-column>
        <el-table-column label="备注" show-overflow-tooltip prop="remark"></el-table-column>
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
import { exportFile } from '@/net/validate'
export default {
  name: 'TwoOneRetrospect',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productLine: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factoryList: [],
      workshopList: [],
      productlineList: [],
      dataList: []
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
    },
    'formHeader.workShop' (n, o) {
      if (n) {
        this.GetParentline(n)
      }
    }
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factoryList = data.typeList
          if (!this.formHeader.factory && data.typeList.length > 0) {
            this.formHeader.factory = data.typeList[0].deptId
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formHeader.workShop = ''
      this.formHeader.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '二合一'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshopList = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
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
            this.productlineList = data.childList
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    GetList (st) {
      if (st) {
        this.formHeader.currPage = 1
      }
      this.$http(`${REP_API.TWOONERETROSPECT_LIST_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.page.list
          this.formHeader.currPage = data.page.currPage
          this.formHeader.pageSize = data.page.pageSize
          this.formHeader.totalCount = data.page.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ExportExcel () {
      let that = this
      exportFile(`${REP_API.REPTWOONERETROSPECT_API}`, '二合一批次追溯报表', that)
    },
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
