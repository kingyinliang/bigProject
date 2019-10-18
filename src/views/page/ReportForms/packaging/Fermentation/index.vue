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
            <el-select v-model="formHeader.workShop" palceholder="请选择" class="width140px">
              <el-option value="">请选择</el-option>
              <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发酵罐号：">
          <el-select v-model="formHeader.potNo" placeholder="请选择" multiple @change="ChangeSearch()" filterable allow-create default-first-op style="width: 140px">
            <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderNo" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别：">
          <el-select v-model="formHeader.type" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.halfType" v-for="(item, index) in typeList" :key="index" :value="item.halfType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="formHeader.status" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.value" v-for="(item, index) in holderStatusList" :key="index" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发酵日期：">
          <el-date-picker type="date" v-model="formHeader.commitDateOne" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:140px"></el-date-picker> - <el-date-picker type="date" v-model="formHeader.commitDateTwo" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:140px"></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" @click="GetDataList(true)" style="float: right" v-if="isAuth('juice:pot:List')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="secondcard">
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="发酵罐编号" show-overflow-tooltip prop="productDate" width="110"></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip prop="factoryName"></el-table-column>
        <el-table-column label="发酵罐容量(M³)" show-overflow-tooltip prop="workShopName"></el-table-column>
        <el-table-column label="投料数量(M³)" show-overflow-tooltip prop="productLineName" width="120"></el-table-column>
        <el-table-column label="入库数量(M³)" show-overflow-tooltip prop="orderNo" width="120"></el-table-column>
        <el-table-column label="库存数量(M³)" show-overflow-tooltip prop="material"></el-table-column>
        <el-table-column label="类别" show-overflow-tooltip prop="batch" width="110"></el-table-column>
        <el-table-column label="投料时间" show-overflow-tooltip prop="countOutPut"></el-table-column>
        <el-table-column label="发酵开始时间" show-overflow-tooltip prop="countOutPutUnit" width="50"></el-table-column>
        <el-table-column label="发酵结束时间" show-overflow-tooltip prop="mainBatch" width="110"></el-table-column>
        <el-table-column label="发酵期" show-overflow-tooltip prop="attachBatch" width="110"></el-table-column>
        <el-table-column label="发酵时间" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="压榨时间" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="用酱醪数(M³)" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="出品数" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="库存量(M³)" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="出品率" show-overflow-tooltip prop="remark"></el-table-column>
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
      factory: [],
      workshop: [],
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
    }
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          if (data.typeList.length > 0) {
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
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '发酵'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
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
