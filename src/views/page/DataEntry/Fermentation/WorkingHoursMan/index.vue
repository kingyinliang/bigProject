<template>
  <div class="main">
    <el-card class="searchCard">
      <el-row>
        <el-col>
          <el-form :inline="true" :model="form" size="small" label-width="85px">
            <el-form-item label="生产工厂：">
              <el-select v-model="form.factory" placeholder="请选择" class="selectwidth">
                <el-option v-for="(item, index) in factory" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产车间：">
              <el-select v-model="form.workShop" placeholder="请选择" class="selectwidth">
                <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="罐号：">
              <el-select class="selectwidth"></el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select class="selectwidth">
                <el-option v-for="(item, index) in statusList" :key="index" :value="item.value" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input class="selectwidth"></el-input>
            </el-form-item>
            <el-form-item label="订单日期：">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:170px"></el-date-picker> - <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:170px"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="text-align:right">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="SearchList" v-if="isAuth('prs:pro:materialList')">查询</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="isAuth('prs:pro:updatePro')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('prs:pro:updatePro')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('prs:pro:updatePro')">提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="tabClick" type="border-card" style="margin-top:15px">
      <el-tab-pane name="0" label="未成熟">
        <el-table :data="dataList" border header-row-class-name="tableHead">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="状态" prop="workShop"></el-table-column>
          <el-table-column label="容器" prop="applyNo"></el-table-column>
          <el-table-column label="订单号" prop="halfType"></el-table-column>
          <el-table-column label="物料" width="250">
            <template slot-scope="scope">
              <a @click="Go(row)">{{scope.row.materialCode}}{{scope.row.materialName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="订单量(L)" width="90" prop="halfType"></el-table-column>
          <el-table-column label="实际生产数量" width="120">
            <el-input :disabled="!isRedact" size="small"></el-input>
          </el-table-column>
          <el-table-column label="单位" prop="amount" width="50"></el-table-column>
          <el-table-column label="准备工时" prop="created">
            <el-input :disabled="!isRedact" size="small"></el-input>
          </el-table-column>
          <el-table-column label="单位" prop="amount" width="50"></el-table-column>
          <el-table-column label="机器工时" prop="created">
            <el-input :disabled="!isRedact" size="small"></el-input>
          </el-table-column>
          <el-table-column label="单位" prop="amount" width="50"></el-table-column>
          <el-table-column label="人工工时" prop="created">
            <el-input :disabled="!isRedact" size="small"></el-input>
          </el-table-column>
          <el-table-column label="单位" prop="amount" width="50"></el-table-column>
          <el-table-column label="执行开始日期" prop="amount" width="150">
            <el-date-picker type="date" placeholder="选择日期" size="small"></el-date-picker>
          </el-table-column>
          <el-table-column label="执行结束日期" prop="amount" width="150">
            <el-date-picker type="date" placeholder="选择日期" size="small"></el-date-picker>
          </el-table-column>
          <el-table-column label="部分/完全报工" prop="amount" width="150">
            <el-input :disabled="!isRedact" size="small"></el-input>
          </el-table-column>
          <el-table-column label="操作人员" prop="amount" width="100"></el-table-column>
          <el-table-column label="操作时间" prop="amount" width="100"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currPage"
          :page-sizes="[10, 15, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.totalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane name="1" label="已成熟">
        <el-table :data="dataList" border header-row-class-name="tableHead">
          <el-table-column label="状态" prop="workShop"></el-table-column>
          <el-table-column label="发酵罐" prop="applyNo"></el-table-column>
          <el-table-column label="订单号" prop="applyNo"></el-table-column>
          <el-table-column label="物料" width="250">
            <template slot-scope="scope">
              <a @click="Go(scope.row)">{{scope.row.materialCode}}{{scope.row.materialName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="订单数量" prop="halfType"></el-table-column>
          <el-table-column label="漫灌日期" prop="confirmNum"></el-table-column>
          <el-table-column label="发酵天数" prop="created"></el-table-column>
          <el-table-column label="物料类别" prop="productDate"></el-table-column>
          <el-table-column label="判定人员" prop="amount"></el-table-column>
          <el-table-column label="判定时间" prop="amount"></el-table-column>
          <el-table-column label="调整" prop="productDate"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currPage"
          :page-sizes="[10, 15, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.totalCount">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-card style="margin-top:15px">
      <Loglist ref="loglist"></Loglist>
    </el-card>
  </div>
</template>

<script>
import { BASICDATA_API } from '@/api/api'
import Loglist from './common/logList'
export default {
  name: 'working',
  data () {
    return {
      form: {
        factory: '',
        workShop: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: '',
      workshop: '',
      isRedact: false,
      statusList: [{
        name: '已保存',
        value: '0'
      }, {
        name: '已提交',
        value: '1'
      }],
      dataList: [{
        id: 1
      }]
    }
  },
  mounted () {
    this.GetFactoryList()
  },
  watch: {
    'form.factory' (n, o) {
      this.GetWorkshopList(n)
    }
  },
  methods: {
    // 获取工厂
    GetFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.form.factory = data.typeList[0].deptId
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    GetWorkshopList (id) {
      this.form.workShop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '发酵'}).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length > 0) {
              this.workshop = data.typeList
              if (data.typeList.length > 0) {
                this.form.workShop = data.typeList[0].deptId
              }
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.workshop = []
      }
    }
  },
  components: {
    Loglist
  }
}
</script>

<style lang="less">
.selectwidth {width:170px}
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
