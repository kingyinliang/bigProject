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
                  <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="罐号：" >
                <el-select v-model="form.holderId" class="selectwpx" filterable style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in potList" :key="sole.holderId" :label="sole.holderName" :value="sole.holderId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产物料：" >
                <el-select v-model="form.materialCode" class="selectwpx" filterable style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in materialList" :key="sole.materialCode" :label="sole.materialCode + ' ' + sole.materialName" :value="sole.materialCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单日期：">
                <el-date-picker type="date" v-model="form.startDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
                - <el-date-picker type="date" v-model="form.endDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
              </el-form-item>
              <el-form-item class="floatr">
                <el-button type="primary" size="small" @click="GetList(true)" style="float: right" v-if="isAuth('fer:order:list')">查询</el-button>
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
        <el-tabs ref='multipleTable' @tab-click="handleClick" v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="border-radius: 15px;overflow: hidden">
          <el-tab-pane name="0" label="未修改">
            <el-row>
              <el-col>
                <el-button type='primary' size='small' style='float:right; margin-bottom:10px;' @click="ModifyOrder()" v-if="isAuth('fer:order:applyFerOrder')">订单修改</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table header-row-class-name="tableHead" @selection-change="handleSelectionChange" :data="dataList" border tooltip-effect="dark" >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="罐号" width="55" prop="holderNo"></el-table-column>
                <el-table-column label="订单号" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.orderNo}}
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" :show-overflow-tooltip="true" >
                  <template slot-scope="scope">
                    {{scope.row.startDate}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" >
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="判定时发酵天数" width="120">
                  <template slot-scope="scope">
                    {{scope.row.judgeDays}}
                  </template>
                </el-table-column>
                <el-table-column label="判定前" >
                  <template slot-scope="scope">
                    {{scope.row.oldCategory}}
                  </template>
                </el-table-column>
                <el-table-column label="判定后" >
                  <template slot-scope="scope">
                    {{scope.row.halfName}}
                  </template>
                </el-table-column>
                <el-table-column label="发酵成熟天数" width="120">
                  <template slot-scope="scope">
                    {{scope.row.ferDays}}
                  </template>
                </el-table-column>
                <el-table-column label="修改后结束日期" >
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="1" label="已修改">
            <el-row>
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column label="罐号" width="55" prop="holderNo"></el-table-column>
                <el-table-column label="订单号" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.orderNo}}
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" :show-overflow-tooltip="true" >
                  <template slot-scope="scope">
                    {{scope.row.startDate}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" >
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="判定时发酵天数" width="120">
                  <template slot-scope="scope">
                    {{scope.row.judgeDays}}
                  </template>
                </el-table-column>
                <el-table-column label="判定前" >
                  <template slot-scope="scope">
                    {{scope.row.oldCategory}}
                  </template>
                </el-table-column>
                <el-table-column label="判定后" >
                  <template slot-scope="scope">
                    {{scope.row.halfName}}
                  </template>
                </el-table-column>
                <el-table-column label="发酵成熟天数">
                  <template slot-scope="scope">
                    {{scope.row.ferDays}}
                  </template>
                </el-table-column>
                <el-table-column label="修改后结束日期" width="120">
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="接口返回" width="100px" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.sapContent}}
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
import { BASICDATA_API, FERMENTATION_API } from '@/api/api'
export default {
  name: 'CategroyJudgement',
  data () {
    return {
      form: {
        factory: '',
        workShop: '',
        holderId: '',
        materialCode: '',
        startDate: '',
        endDate: '',
        isSap: '0',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: '',
      workshop: '',
      activeName: '0',
      materialList: [],
      potList: [],
      dataList: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.GetFactoryList()
  },
  watch: {
    'form.factory' (n, o) {
      this.GetWorkshopList(n)
      this.GetMaterialList(n)
    },
    'form.workShop' (n, o) {
      this.GetPotList(n)
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
        this.form.workShop = ''
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '发酵'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length > 0) {
              this.workshop = data.typeList
              this.form.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.workshop = []
      }
    },
    // 罐号
    GetPotList (id) {
      this.form.holderId = ''
      if (id) {
        this.$http(`${BASICDATA_API.BASEHOLDERLIST_API}`, 'POST', {factory: this.form.factory, workShop: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.potList = data.holderList
          } else {
            this.error_SHINHO(data.msg)
          }
        })
      }
    },
    // 物料
    GetMaterialList (id) {
      this.form.materialCode = ''
      if (id) {
        this.$http(`${BASICDATA_API.BASEMATERIALIST_API}`, 'POST', {factory: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.materialList = data.materialList
          } else {
            this.error_SHINHO(data.msg)
          }
        })
      }
    },
    GetList (st) {
      if (st) {
        this.form.currPage = 1
      }
      this.form.isSap = this.activeName
      this.$http(`${FERMENTATION_API.ORDER_MODIFY_LIST_API}`, 'POST', this.form).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.isSapList.list
          this.form.currPage = data.isSapList.currPage
          this.form.pageSize = data.isSapList.pageSize
          this.form.totalCount = data.isSapList.totalCount
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    handleClick (value) {
      this.activeName = value.name
      this.GetList(true)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    ModifyOrder () {
      this.$http(`${FERMENTATION_API.ORDER_MODIFY_CHANGE_API}`, 'POST', this.multipleSelection).then(({data}) => {
        if (data.code === 0) {
          this.$success_SHINHO('修改成功')
          this.GetList(true)
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
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
