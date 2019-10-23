<template>
  <div >
    <div class="header_main">
      <el-card class="searchCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="form" size="small" :inline="true" label-position="right" label-width="70px" class="multi_row">
              <el-form-item label="生产工厂：">
                <el-select v-model="form.factory" placeholder="请选择" class="width160px">
                  <el-option value=''>请选择</el-option>
                  <el-option v-for="(item, index) in factory" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产车间：">
                <el-select v-model="form.workShop" placeholder="请选择" class="width160px">
                  <el-option value=''>请选择</el-option>
                  <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="罐号：" >
                <el-select v-model="form.potId" class="selectwpx" filterable style="width: 140px" @change="changeOptions('pot')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in potList" :key="sole.holderId" :label="sole.holderName" :value="sole.holderId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料：" >
                <el-select v-model="form.materialCode" @change="changeOptions('material')" class="selectwpx" filterable style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in materialList" :key="sole.materialCode" :label="sole.materialCode + ' ' + sole.materialName" :value="sole.materialCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单日期：">
                <el-date-picker type="date" v-model="form.startDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
                - <el-date-picker type="date" v-model="form.endDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
              </el-form-item>
              <el-form-item class="floatr">
                <el-button type="primary" size="small" @click="getOrderList()" style="float: right" v-if="isAuth('fer:order:list')">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-tabs ref='tabs'  v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="border-radius: 15px;overflow: hidden">
          <el-tab-pane name="1">
            <span slot="label" class="spanview">
              <el-button>未修改</el-button>
            </span>
            <el-row>
              <el-col>
                <el-button type='primary' size='small' style='float:right; margin-bottom:10px;' @click="applyOrder()" v-if="isAuth('fer:order:applyFerOrder')">申请订单</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column type="index" label="罐号" width="55"></el-table-column>
                <el-table-column label="订单号" :show-overflow-tooltip="true" width="100">
                  <template slot-scope="scope">
                    {{scope.row.holdName}}
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                    {{scope.row.ferMaterialCode + ' ' + scope.row.ferMaterialName}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.ferAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="判定时发酵天数" width="60">
                  <template slot-scope="scope">
                    {{scope.row.ferUnit}}
                  </template>
                </el-table-column>
                <el-table-column label="判定前" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.ferOrderType" placeholder="请选择" size="mini" style="width: 100px">
                      <el-option v-for="(item, index) in orderTypeList" :label="item.value"  :value="item.code" :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="判定后" width="100">
                  <template slot-scope="scope">
                    {{scope.row.startDate}}
                  </template>
                </el-table-column>
                <el-table-column label="发酵成熟天数" width="100">
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="修改后结束日期" width="120">
                  <template slot-scope="scope">
                    {{scope.row.kjmOrderNo}}
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label"  class="spanview">
              <el-button>已修改</el-button>
            </span>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column type="index" label="罐号" width="55"></el-table-column>
                <el-table-column label="订单号" width="120">
                  <template slot-scope="scope">
                    {{scope.row.ferOrderNo}}
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" :show-overflow-tooltip="true" width="100">
                  <template slot-scope="scope">
                    {{scope.row.holdName}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                    {{scope.row.ferMaterialCode + ' ' + scope.row.ferMaterialName}}
                  </template>
                </el-table-column>
                <el-table-column label="判定时发酵天数" width="100">
                  <template slot-scope="scope">
                    {{scope.row.ferAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="判定前" width="60">
                  <template slot-scope="scope">
                    {{scope.row.ferUnit}}
                  </template>
                </el-table-column>
                <el-table-column label="判定后" width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.ferOrderType" placeholder="请选择" size="mini" style="width: 100px" :disabled="true">
                      <el-option v-for="(item, index) in orderTypeList" :label="item.value"  :value="item.code" :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="发酵成熟天数" width="100">
                  <template slot-scope="scope">
                    {{scope.row.startDate}}
                  </template>
                </el-table-column>
                <el-table-column label="修改后结束日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="接口返回" width="120">
                  <template slot-scope="scope">
                    {{scope.row.kjmOrderNo}}
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.currPage"
            :page-sizes="[10, 20, 50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.totalCount">
          </el-pagination>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// import { dateFormat } from '@/net/validate'
import { BASICDATA_API } from '@/api/api'
export default {
  name: 'CategroyJudgement',
  data () {
    return {
      form: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: '',
      workshop: '',
      activeName: '1',
      materialList: [],
      potList: [],
      dataList: []
    }
  },
  mounted () {
    this.GetFactoryList()
    this.GetWorkshopList(this.form.factory)
  },
  watch: {
    'form.factory' (n, o) {
      this.GetWorkshopList(n)
    }
  },
  methods: {
    // 获取工厂
    GetFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          if (!this.form.factory) {
            this.form.factory = this.factory[0].deptId
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    GetWorkshopList (id) {
      if (id) {
        if (this.$store.state.common.Fermentation.category.workShop === '') {
          this.form.workShop = ''
        }
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '发酵'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length > 0) {
              this.workshop = data.typeList
              if (this.$store.state.common.Fermentation.category.workShop === '') {
                this.form.workShop = data.typeList[0].deptId
              }
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.workshop = []
      }
    },
    GetList () {

    },
    // 改变每页条数
    handleSizeChange (val) {
      this.form.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.form.currPage = val
      this.GetList()
    }
  }
}
</script>
