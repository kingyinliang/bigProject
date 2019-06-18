<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col :span="23">
          <el-form :inline="true" :model="form" size="small" label-width="84px">
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
            <el-form-item label="状态：">
              <el-select class="selectwidth">
                <el-option v-for="(item, index) of statusList" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发酵罐号：">
              <el-select class="selectwidth"></el-select>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input class="selectwidth"></el-input>
            </el-form-item>
            <el-form-item label="物料：">
              <el-select class="selectwidth"></el-select>
            </el-form-item>
            <el-form-item label="发酵天数：">
              <el-input class="selectwidth"></el-input>
            </el-form-item>
            <el-form-item label="物料类别：">
              <el-select class="selectwidth"></el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="small" style="float:right">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="tabClick" type="border-card" style="margin-top:15px">
      <el-tab-pane name="0" label="未判定">
        <el-table :data="dataList" border header-row-class-name="tableHead">
          <el-table-column label="状态" prop="workShop"></el-table-column>
          <el-table-column label="发酵罐" prop="applyNo"></el-table-column>
          <el-table-column label="订单号" prop="halfType"></el-table-column>
          <el-table-column label="物料" width="250">
            <template slot-scope="scope">
              <a @click="Go(row)">{{scope.row.materialCode}}{{scope.row.materialName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="订单数量" prop="halfType"></el-table-column>
          <el-table-column label="单位" prop="amount"></el-table-column>
          <el-table-column label="漫灌日期" prop="created"></el-table-column>
          <el-table-column label="发酵天数" prop="created"></el-table-column>
          <el-table-column label="物料类别" prop="created"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" size="small" @click="Go(row)">确认</el-button>
          </el-table-column>
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
      <el-tab-pane name="1" label="已判定">
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
    <el-dialog :visible.sync="dialogVisible" width="400px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">23#发酵罐类别判定</div>
      <el-form :model="judge" size="small" label-width="130px">
        <el-form-item label="订单编号：">123</el-form-item>
        <el-form-item label="物料：">23</el-form-item>
        <el-form-item label="发酵天数：">34天</el-form-item>
        <el-form-item label="半成品类别：">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="radio" label="1">正常</el-radio>
          <el-radio v-model="radio" label="2">冻结</el-radio>
        </el-form-item>
        <el-form-item label="判定人员：">{{judge.changer}}</el-form-item>
        <el-form-item label="判定时间：">{{judge.changed}}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/net/validate'
import { BASICDATA_API, FERMENTATION_API } from '@/api/api'
export default {
  name: 'CategroyJudgement',
  data () {
    return {
      dialogVisible: false,
      radio: '1',
      form: {
        factory: '',
        workShop: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: '',
      workshop: '',
      statusList: [{
        name: '正常',
        value: 1
      }, {
        name: '冻结',
        value: 0
      }],
      dataList: [],
      activeName: '0',
      currentName: '0',
      judge: {
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
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
  }
}
</script>

<style lang="less">
.selectwidth{width:160px;}
.dialog__class{
  border-radius:6px 6px 6px 6px !important;
  .el-dialog__header{
    height:59px;
    background:rgba(24,144,255,1);
    border-radius:6px 6px 0px 0px;
    color: #fff;
    font-size:20px;
    .el-dialog__headerbtn .el-dialog__close{
      color: #fff
    }
  }
}
</style>
