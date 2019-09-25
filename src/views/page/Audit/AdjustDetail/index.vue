<template>
  <div class="header_main">
    <el-card class="searchCards newCard">
      <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="multi_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in factoryList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器类型：">
          <el-select v-model="formHeader.holderType" filterable class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in holderTypeList" :key="index" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器号：">
          <el-select v-model="formHeader.holderId" filterable class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in holderNoList" :key="index" :value="item.holderId" :label="item.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：">
          <el-select v-model="formHeader.materialCode" filterable class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in materialList" :key="index" :value="item.materialCode" :label="item.materialCode + item.materialName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单：">
          <el-input v-model.trim="formHeader.orderNo" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="移动类型：">
          <el-select v-model="formHeader.moveType" filterable class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in moveTypeList" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatr">
          <el-button type="primary" @click="GetList()" v-if="isAuth('ver:adjust:list')" size="small">查询</el-button>
          <el-button type="primary" @click="SubmitInfo()" v-if="isAuth('ver:adjust:adjust')" size="small">调整</el-button>
          <el-button type="primary" @click="ExportExcel(true)" v-if="isAuth('ver:adjust:exportList')" size="small">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-tabs type="border-card" v-model="activeName" @tab-click="TabClick" class="NewDaatTtabs" style="margin-top:5px">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">
          <el-button>待调整</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable1" :row-key="GetRowKeys" @selection-change="handleSelectionChange" header-row-class-name="tableHead" border>
          <el-table-column type="selection" :reserve-selection="true" width="34" fixed="left"></el-table-column>
          <el-table-column label="容器类型" prop="holderTypeName" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" prop="holderName" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="成品批次" width="110" prop="batch" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" width="60" prop="surplusLose" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" prop="amount" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" prop="moveType" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐类型" width="100" prop="inHolderTypeName" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐罐号" width="100" prop="inHolderName" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" width="170" prop="changed" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" prop="changer" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">
          <el-button>调整中</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable2" header-row-class-name="tableHead" @selection-change="handleSelectionChange" border tooltip-effect="dark">
          <el-table-column type="selection" :reserve-selection="true" width="34" fixed="left"></el-table-column>
          <el-table-column label="容器类型" prop="holderTypeName" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" width="100" prop="holderName" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="成品批次" width="110" prop="batch" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" width="60" prop="surplusLose" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" prop="amount" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" prop="moveType" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐类型" width="100" prop="inHolderTypeName" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐罐号" width="100" prop="inHolderName" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" width="170" prop="changed" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" prop="changer" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label" class="spanview">
          <el-button>已调整</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable3" header-row-class-name="tableHead" border tooltip-effect="dark">
          <el-table-column label="订单号" width="120" prop="orderNo"></el-table-column>
          <el-table-column label="容器类型" prop="holderTypeName" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" width="100" prop="holderName" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" width="190" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="成品批次" width="110" prop="batch" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" width="60" prop="surplusLose" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" prop="amount" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" prop="moveType" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" width="170" prop="changed" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" prop="changer" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
      <el-row style="margin:20px 0">
        <div style="display:block; float:left;">移动数量合计（方）：</div>
        <div style="display:block; float:left; width:150px; border-bottom:solid 1px;">{{MoveTotal}}</div>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import { BASICDATA_API, REP_API, AUDIT_API } from '@/api/api'
import { exportFile } from '@/net/validate'
export default {
  name: 'bottleName',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        holderType: '',
        holderId: ''
      },
      holderTypeList: [{
        name: '成品罐',
        value: '007'
      }, {
        name: '半成品罐',
        value: '006'
      }],
      moveTypeList: ['清罐', 'JBS出库', '调整'],
      holderNoList: [],
      materialList: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      factoryList: [],
      workshopList: [],
      activeName: '1',
      dataListAll: [],
      dataList: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.GetFactoryList()
    this.GetPageCurrenList()
    this.GetMaterialList()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.GetWorkshopList(n)
    },
    'formHeader.workShop' (n, o) {
      this.formHeader.holderType = ''
      this.formHeader.holderId = ''
      this.formHeader.holderNoList = []
    },
    'formHeader.holderType' (n, o) {
      if (n) {
        this.GetHolderList(n)
      }
    }
  },
  methods: {
    // 获取工厂
    GetFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factoryList = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    GetWorkshopList (id) {
      this.formHeader.workShop = ''
      this.formHeader.holderType = ''
      this.formHeader.holderId = ''
      this.formHeader.holderNoList = []
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '杀菌 过滤'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshopList = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.workshopList = []
      }
    },
    // 容器号
    GetHolderList (id) {
      this.formHeader.holderId = ''
      this.formHeader.holderNoList = []
      let param = {
        factory: this.formHeader.factory,
        holderType: id
      }
      this.$http(`${BASICDATA_API.DROPDOWN_HOLDER_LIST}`, 'POST', param, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.holderNoList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 物料
    GetMaterialList () {
      this.$http(`${AUDIT_API.AUDIT_ADJUST_MATERIAL}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.materialList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.GetPageCurrenList()
    },
    handleCurrentChange (val) {
      this.pages.currentPage = val
      this.GetPageCurrenList()
    },
    GetPageCurrenList () {
      this.dataList = this.dataListAll.slice((this.pages.currentPage - 1) * this.pages.pageSize, (this.pages.currentPage - 1) * this.pages.pageSize + this.pages.pageSize)
    },
    GetRowKeys (row) {
      return row.id
    },
    TabClick (tab) {
      this.activeName = tab.name
      this.GetList()
    },
    GetList () {
      this.formHeader.witchTable = this.activeName
      this.$refs.multipleTable1.clearSelection()
      this.$refs.multipleTable2.clearSelection()
      this.$http(`${AUDIT_API.AUDIT_ADJUST_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataListAll = data.list
          this.pages.currentPage = 1
          this.pages.total = this.dataListAll.length
          this.GetPageCurrenList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    SubmitInfo () {
      if (this.multipleSelection.length === 0) {
        this.$warning_SHINHO('请勾选调整数据')
        return false
      }
      let startStatus
      let inStatus
      let endStatus
      switch (this.activeName) {
        case '1':
          startStatus = '1'
          inStatus = '0'
          endStatus = ''
          break
        case '2':
          startStatus = '1'
          inStatus = '1'
          endStatus = '0'
          break
      }
      this.multipleSelection.map(item => {
        item.moveType = '调整'
        item.startStatus = startStatus
        item.inStatus = inStatus
        item.endStatus = endStatus
      })
      this.$http(`${AUDIT_API.AUDIT_ADJUST_SUBMIT}`, 'POST', this.multipleSelection).then(({data}) => {
        if (data.code === 0) {
          this.$notify({title: '成功', message: '调整成功', type: 'success'})
          this.GetList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ExportExcel () {
      let that = this
      that.plantList = that.formHeader
      exportFile(`${REP_API.REP_ADJUST_LIST_API}`, '调整明细', that)
    }
  },
  computed: {
    MoveTotal: function () {
      let num = 0
      this.dataListAll.map(item => {
        num = num + item.amount
      })
      return num.toFixed(3)
    }
  }
}
</script>

<style lang="less">

</style>
