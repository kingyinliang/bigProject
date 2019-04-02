<template>
  <div class="main">
    <el-card>
      <el-row class="searchCard">
        <el-col :span="20">
          <el-form :model="plantList" :inline="true" label-width="85px" size="small">
            <el-form-item label="生产工厂：">
              <el-select v-model="plantList.factory">
                <el-option label="请选择"  value=""></el-option>
                <el-option v-for="sole in factory" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产车间：">
              <el-select v-model="plantList.workShop">
                <el-option label="请选择"  value=""></el-option>
                <el-option v-for="sole in workshop" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="曲房：">
              <el-select v-model="plantList.workShop" filterable >
                <el-option label="请选择"  value=""></el-option>
                <el-option v-for="sole in workshop" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="制曲日期：">
              <el-date-picker v-model="plantList.commitDateOne" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:199px"></el-date-picker>
            </el-form-item>
            <el-form-item label="发酵罐：">
              <el-select v-model="plantList.workShop" filterable>
                <el-option label="请选择"  value=""></el-option>
                <el-option v-for="sole in workshop" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="float:right; width:128px">
          <el-button type="primary" size="small" @click="GetList">查询</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)">导出</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:10px">
      <el-table :data="dataList" border tooltip-effect="dark" header-row-class-name="tableHead" style="width:100%; margin-bottom: 20px">
        <el-table-column label="工厂" width="220" prop="factoryName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="车间" prop="workShopName"></el-table-column>
        <el-table-column label="生产日期" width="120" prop="productDate"></el-table-column>
        <el-table-column label="曲房" prop=""></el-table-column>
        <el-table-column label="发酵罐" prop=""></el-table-column>
        <el-table-column label="连续蒸煮号" prop=""></el-table-column>
        <el-table-column label="制曲日期" prop=""></el-table-column>
        <el-table-column label="预热时间" prop=""></el-table-column>
        <el-table-column label="下料开始时间" prop=""></el-table-column>
        <el-table-column label="下料结束时间" prop=""></el-table-column>
        <el-table-column label="润水比例" prop=""></el-table-column>
        <el-table-column label="实际比例" prop=""></el-table-column>
        <el-table-column label="润水温度" prop=""></el-table-column>
        <el-table-column label="润水变频" prop=""></el-table-column>
        <el-table-column label="一次预热变频" prop=""></el-table-column>
        <el-table-column label="二次预热变频" prop=""></el-table-column>
        <el-table-column label="下料速度" prop=""></el-table-column>
        <el-table-column label="蒸煮变频" prop=""></el-table-column>
        <el-table-column label="上转阀变频" prop=""></el-table-column>
        <el-table-column label="下转阀变频" prop=""></el-table-column>
        <el-table-column label="蒸煮数显压力" prop=""></el-table-column>
        <el-table-column label="蒸煮机械压力" prop=""></el-table-column>
        <el-table-column label="分气包压力" prop=""></el-table-column>
        <el-table-column label="蒸煮数显温度" prop=""></el-table-column>
        <el-table-column label="上转阀冷却" prop=""></el-table-column>
        <el-table-column label="下转阀冷却" prop=""></el-table-column>
        <el-table-column label="混合料温度" prop=""></el-table-column>
        <el-table-column label="接种温度" prop=""></el-table-column>
      </el-table>
      <el-row >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="plantList.currPage"
          :page-sizes="[10, 15, 20]"
          :page-size="plantList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="plantList.totalCount">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { BASICDATA_API, REP_API } from '@/api/api'
import { exportFile } from '@/net/validate'
export default {
  data () {
    return {
      plantList: {
        factory: '',
        workShop: '',
        commitDateOne: '',
        commitDateTwo: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: '',
      workshop: '',
      dataList: []
    }
  },
  watch: {
    'plantList.factory' (n, o) {
      this.Getdeptbyid(n)
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.plantList.workshop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    GetList (st) {
      if (st) {
        this.plantList.currPage = 1
      }
      this.$http(`${REP_API.REPOUTPUTFLOURYIELD_API}`, 'POST', this.plantList).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.page.list
          this.plantList.currPage = data.page.currPage
          this.plantList.pageSize = data.page.pageSize
          this.plantList.totalCount = data.page.totalCount
        } else {
          this.$message.error(data.msg)
        }
        this.lodingS = false
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.plantList.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.plantList.currPage = val
      this.GetList()
    },
    // 导出
    ExportExcel () {
      let that = this
      exportFile(`${REP_API.REPATTMOUTPUT_API}`, '计时考勤报表', that)
    }
  }
}
</script>

<style lang="less">
.el-date-editor .el-range-input {width:100px;}
.el-range-editor--small .el-range-separator {padding-right:20px}
.searchCard {
  .el-button--primary,.el-button--primary:focus{
    color: #000000;
    background-color: #FFFFFF;
    border-color: #D9D9D9;
  }
  .el-button--primary:hover{
    background-color: #1890FF;
    color: #FFFFFF
  }
  .el-button--primary:first-child{
    background-color: #1890FF;
    color: #FFFFFF;
    border-color: #1890FF;
  }
}
</style>
