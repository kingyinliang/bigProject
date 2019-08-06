<template>
  <div class="main">
    <el-card>
      <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
        <el-form-item label="工厂：" label-width="60px">
          <el-select v-model="formHeader.factory" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in factoryList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车间：">
          <el-select v-model="formHeader.workshop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器类型：">
          <el-select v-model="formHeader.workshop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器号：">
          <el-select v-model="formHeader.workshop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：" label-width="60px">
          <el-select v-model="formHeader.workshop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单：">
          <el-input v-model="formHeader.workshop"></el-input>
        </el-form-item>
        <el-form-item label="移动类型：">
          <el-select v-model="formHeader.workshop" class="width180px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col style="text-align:right">
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">调整</el-button>
          <el-button type="primary" size="small">导出</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs type="border-card" v-model="activeName" @tab-click="TabClick" class="NewDaatTtabs" style="margin-top:15px">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">
          <el-button>待调整</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable1" :row-key="GetRowKeys" @selection-change="handleSelectionChange" header-row-class-name="tableHead" border>
          <el-table-column type="selection" :reserve-selection="true" width="34"></el-table-column>
          <el-table-column label="容器类型" prop="id" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" show-overflow-tooltip></el-table-column>
          <el-table-column label="成品批次" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐罐号" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">
          <el-button>调整中</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable2" header-row-class-name="tableHead" @selection-change="handleSelectionChange" border tooltip-effect="dark">
          <el-table-column type="selection" width="34"></el-table-column>
          <el-table-column label="容器类型" prop="id" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" show-overflow-tooltip></el-table-column>
          <el-table-column label="成品批次" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="打入罐罐号" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label" class="spanview">
          <el-button>已调整</el-button>
        </span>
        <el-table :data="dataList" ref="multipleTable3" header-row-class-name="tableHead" @selection-change="handleSelectionChange" border tooltip-effect="dark">
          <el-table-column label="订单号"></el-table-column>
          <el-table-column label="容器类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="容器号" show-overflow-tooltip></el-table-column>
          <el-table-column label="物料" show-overflow-tooltip></el-table-column>
          <el-table-column label="成品批次" show-overflow-tooltip></el-table-column>
          <el-table-column label="盈/亏" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动数量" show-overflow-tooltip></el-table-column>
          <el-table-column label="移动类型" show-overflow-tooltip></el-table-column>
          <el-table-column label="单位" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" show-overflow-tooltip></el-table-column>
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
        <div style="display:block; float:left; width:150px; border-bottom:solid 1px;">123</div>
      </el-row>
    </el-tabs>
  </div>
</template>

<script>
import { BASICDATA_API } from '@/api/api'
// import {dateFormat} from '@/net/validate'
export default {
  name: 'bottleName',
  data () {
    return {
      formHeader: {
        factory: '',
        workshop: ''
      },
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 11
      },
      factoryList: [],
      workshopList: [],
      activeName: '1',
      dataListAll: [{id: 1}, {id: 3}, {id: 2}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}],
      dataList: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.GetFactoryList()
    this.GetPageCurrenList()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.GetWorkshopList(n)
    }
  },
  methods: {
    // 获取工厂
    GetFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factoryList = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    GetWorkshopList (id) {
      this.formHeader.workshop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '吹瓶'}).then(({data}) => {
          if (data.code === 0) {
            this.workshopList = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workshop = data.typeList[0].deptId
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.workshopList = []
      }
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
    TabClick () {
      this.$refs.multipleTable1.clearSelection()
    }
  }
}
</script>

<style lang="less">

</style>
