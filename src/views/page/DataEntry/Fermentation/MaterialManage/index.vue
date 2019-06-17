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
        <el-form-item label="订单编号：">
          <el-input v-model="formHeader.orderNo" placeholder="订单号" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="罐号：" prop="holderId" label-width="70px">
          <el-select v-model="formHeader.holderId" placeholder="请选择" filterable style="width: 160px">
            <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发料物料：" prop="holderId">
          <el-select v-model="formHeader.holderId" placeholder="请选择" filterable style="width: 160px">
            <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="formHeader.status" placeholder="请选择" style="width: 160px">
            <el-option label="请选择"  value=""></el-option>
            <el-option label="未审核"  value="submit"></el-option>
            <el-option label="审核通过"  value="checked"></el-option>
            <el-option label="审核不通过"  value="noPass"></el-option>
            <el-option label="接口失败"  value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单日期：">
          <el-date-picker v-model="formHeader.commitDateOne" type="date" placeholder="选择日期" style="width:160px;margin-right: 15px"></el-date-picker> - <el-date-picker v-model="formHeader.commitDateTwo" type="date" placeholder="选择日期" style="width:160px;margin-left: 15px"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row style="text-align:right" class="buttonCss">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" >查 询</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm">提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <h2 style="font-size: 16px;font-weight: bolder;margin-bottom: 10px">发料列表</h2>
      <el-table :data="dataList" border tooltip-effect="dark" header-row-class-name="tableHead">
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="订单号" width="120" prop="productDate"></el-table-column>
        <el-table-column label="状态" width="80" prop="productDate"></el-table-column>
        <el-table-column label="容器" width="120" prop="productDate"></el-table-column>
        <el-table-column label="物料" width="120" prop="productDate"></el-table-column>
        <el-table-column label="订单量" width="120" prop="productDate"></el-table-column>
        <el-table-column label="单位" width="50" prop="productDate"></el-table-column>
        <el-table-column label="领用物料" width="120" prop="productDate"></el-table-column>
        <el-table-column label="数量" width="120" prop="productDate"></el-table-column>
        <el-table-column label="单位" width="50" prop="productDate"></el-table-column>
        <el-table-column label="批次" width="120" prop="productDate"></el-table-column>
        <el-table-column label="备注" width="120" prop="productDate"></el-table-column>
        <el-table-column label="提交人员" width="120" prop="productDate"></el-table-column>
        <el-table-column label="提交时间" width="120" prop="productDate"></el-table-column>
      </el-table>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <auditLog :tableData="InAudit"></auditLog>
    </el-card>
  </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {},
      factory: [],
      workshop: [],
      guanList: [],
      dataList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
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
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: ' 发酵'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            this.formHeader.workShop = data.typeList[0].deptId
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 罐号
    PuplWheatList () {
      this.$http(`${BASICDATA_API.PUPLWHEATLIST}`, 'POST', {types: ['002', '012']}).then(({data}) => {
        this.guanList = data.list
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
