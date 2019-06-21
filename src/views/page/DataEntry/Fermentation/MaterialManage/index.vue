<template>
  <div style="padding: 15px">
    <el-card class="searchCard  newCard">
      <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 160px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发料物料：" prop="holderId">
          <el-select v-model="formHeader.ferMaterialCode" placeholder="请选择" filterable style="width: 160px">
            <el-option v-for="(sole, index) in this.material" :key="index" :value="sole.materialCode" :label="sole.materialCode+ ' ' + sole.materialName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="formHeader.approveStatus" placeholder="请选择" style="width: 160px">
            <el-option label="请选择"  value=""></el-option>
            <el-option label="未录入"  value="1"></el-option>
            <el-option label="已保存"  value="saved"></el-option>
            <el-option label="已提交"  value="submit"></el-option>
            <el-option label="审核通过"  value="checked"></el-option>
            <el-option label="审核不通过"  value="noPass"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-select v-model="formHeader.ferOrderNos" placeholder="请选择" multiple filterable allow-create default-first-op style="width: 160px">
            <el-option v-for="(sole, index) in this.OrderList" :key="index" :value="sole.ferOrderNo" :label="sole.ferOrderNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="罐号：" prop="holderId" label-width="70px">
          <el-select v-model="formHeader.holderIds" placeholder="请选择" multiple filterable allow-create default-first-op style="width: 160px">
            <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单日期：">
          <el-date-picker v-model="formHeader.productDateOne" type="date" placeholder="选择日期" style="width:160px;margin-right: 15px"></el-date-picker> - <el-date-picker v-model="formHeader.productDateTwo" type="date" placeholder="选择日期" style="width:160px;margin-left: 15px"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row style="text-align:right" class="buttonCss">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="GetDataList()">查 询</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="isAuth('fer:shoot:update')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm">提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <h2 style="font-size: 16px;font-weight: bolder;margin-bottom: 10px"><i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>发料列表</h2>
      <el-table :data="dataList" @selection-change="handleSelectionChange" @row-dblclick="GetLog" border tooltip-effect="dark" header-row-class-name="tableHead">
        <el-table-column type="selection" :selectable='checkboxT' width="34"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="订单号" width="120" prop="ferOrderNo"></el-table-column>
        <el-table-column label="状态" width="70" prop="approveStatus">
          <template slot-scope="scope">
            {{ scope.row.approveStatus === 'saved'? '已保存': scope.row.approveStatus === 'submit'? ' 已提交' : scope.row.approveStatus === 'noPass'? '审核不通过' : scope.row.approveStatus === 'checked'? '审核通过' : '未录入'}}
          </template>
        </el-table-column>
        <el-table-column label="容器" width="110" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="物料" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.ferMaterialCode + ' ' + scope.row.ferMaterialName}}
          </template>
        </el-table-column>
        <el-table-column label="订单量" width="80" prop="ferAmount" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="单位" width="50" prop="ferUnit"></el-table-column>
        <el-table-column label="领用物料" width="180" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.kjmMaterialCode + ' ' + scope.row.kjmMaterialName}}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="100" prop="kjmAmount">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kjmAmount" size="small" placeholder="手工录入" :disabled="!(isRedact && (scope.row.approveStatus ==='noPass' || scope.row.approveStatus ==='saved' || scope.row.approveStatus ===''))"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" width="50" prop="kjmUnit"></el-table-column>
        <el-table-column label="批次" width="120" prop="batch">
          <template slot-scope="scope">
            <el-input v-model="scope.row.batch" size="small" placeholder="手工录入" :disabled="!(isRedact && (scope.row.approveStatus ==='noPass' || scope.row.approveStatus ==='saved' || scope.row.approveStatus ===''))"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="80" prop="remark">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" size="small" placeholder="手工录入" :disabled="!(isRedact && (scope.row.approveStatus ==='noPass' || scope.row.approveStatus ==='saved' || scope.row.approveStatus ===''))"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="提交人员" width="120" prop="changer" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="提交时间" width="120" prop="changed" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" circle size="small" :disabled="!isRedact" @click="AddData(scope.row, scope.$index)" v-if="scope.row.approveStatus !=='submit' && scope.row.approveStatus !== 'checked'"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delData(scope.row)" v-if="scope.row.approveStatus !== '' && scope.row.approveStatus !=='submit' && scope.row.approveStatus !== 'checked'"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <auditLog :tableData="Audit"></auditLog>
    </el-card>
  </div>
</template>

<script>
import {BASICDATA_API, FERMENTATION_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {
        factory: '',
        workShop: '',
        ferMaterialCode: '',
        ferOrderNos: [],
        holderIds: [],
        approveStatus: '',
        productDateOne: '',
        productDateTwo: ''
      },
      factory: [],
      workshop: [],
      guanList: [],
      OrderList: [],
      material: [],
      dataList: [],
      Audit: [],
      multipleSelection: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
      this.GetMaterial(n)
    },
    'formHeader.workShop' (n, o) {
      this.HolderList(n)
      this.GetOrderList(n)
    }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 查询
    GetDataList () {
      this.$http(`${FERMENTATION_API.SHOOT_LIST_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.ferList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取日志
    GetLog (row) {
      if (this.isRedact) {
        return
      }
      this.$http(`${FERMENTATION_API.SHOOT_LOG_API}`, 'POST', {ferOrderNo: row.ferOrderNo}).then(({data}) => {
        if (data.code === 0) {
          this.Audit = data.verList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 保存 or 提交
    SubmitForm () {
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.savedOrSubmitForm('submit')
      })
    },
    savedOrSubmitForm (str) {
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach((item) => {
          if (item.approveStatus) {
            if (item.approveStatus === 'saved') { item.approveStatus = str } else if (item.approveStatus === 'noPass' && str === 'submit') { item.approveStatus = str }
          } else {
            item.approveStatus = str
          }
        })
      } else {
        this.$message.error('请选择数据后操作')
        return
      }
      if (str === 'submit') {
        this.$http(`${FERMENTATION_API.SHOOT_UPDATE_API}`, 'POST', this.multipleSelection).then(({data}) => {
          if (data.code === 0) {
            this.$http(`${FERMENTATION_API.SHOOT_SUBMIT_API}`, 'POST', this.multipleSelection).then(({data}) => {
              if (data.code === 0) {
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      this.$http(`${FERMENTATION_API.SHOOT_UPDATE_API}`, 'POST', this.multipleSelection).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('操作成功')
          this.GetDataList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 拆分
    AddData (row, index) {
      let newobj = JSON.parse(JSON.stringify(row))
      newobj.approveStatus = ''
      newobj.id = ''
      this.dataList.splice(index + 1, 0, newobj)
    },
    // 删除
    delData (row) {
      this.$http(`${FERMENTATION_API.SHOOT_DEL_API}`, 'POST', {id: row.id}).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('删除成功')
          this.GetDataList()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 审核通过禁用
    checkboxT (row) {
      if (row.approveStatus === 'checked' || row.approveStatus === 'submit') {
        return 0
      } else {
        return 1
      }
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$message.error(data.msg)
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
            if (data.typeList.length) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 罐号
    HolderList () {
      this.$http(`${BASICDATA_API.BASEHOLDERLIST_API}`, 'POST', {factory: this.formHeader.factory, workShop: this.formHeader.workShop}).then(({data}) => {
        this.guanList = data.holderList
      })
    },
    // 订单
    GetOrderList () {
      this.$http(`${FERMENTATION_API.SHOOT_GETORDER_API}`, 'POST', {factory: this.formHeader.factory, workShop: this.formHeader.workShop}).then(({data}) => {
        this.OrderList = data.verList
      })
    },
    // 获取物料
    GetMaterial (n) {
      this.formHeader.ferMaterialCode = ''
      this.$http(`${BASICDATA_API.MATERIAL_LIST}`, 'POST', {factory: n, materialTypeCode: 'ZHAL'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.material = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
