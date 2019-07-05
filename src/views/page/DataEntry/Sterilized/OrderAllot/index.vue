<template>
  <div>
    <div class="main">
      <el-card class="searchCards searchCard">
        <el-row>
          <el-col>
            <el-form :model="formHeader" :inline="true" size="small" label-width="82px">
              <el-form-item label="生产工厂：">
                <el-select v-model="formHeader.factory" placeholder="请选择" class="width180px">
                  <el-option value="">请选择</el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产车间：">
                <el-select v-model="formHeader.workShop" palceholder="请选择" class="width180px">
                  <el-option value="">请选择</el-option>
                  <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单号：">
                <el-input v-model="formHeader.orderId"></el-input>
              </el-form-item>
              <el-form-item label="订单状态：">
                <el-select v-model="formHeader.materialCode" palceholder="请选择" class="width180px">
                  <el-option value="">请选择</el-option>
                  <el-option v-for="(item, index) in materialList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产日期：">
                <el-date-picker v-model="formHeader.created" type="date" placeholder="请选择" style="width:180px"></el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="text-align:right">
          <template>
            <el-button type="primary" size="small" @click="GetList(true)">查询</el-button>
            <el-button type="primary" size="small" @click="isRedact = !isRedact">{{isRedact === false? '编辑' : '取消'}}</el-button>
          </template>
          <template v-if="isRedact">
            <el-button type="primary" size="small" @click="GetList(true)">保存</el-button>
            <el-button type="primary" size="small" @click="isRedact = !isRedact">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-card>
        <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">>
          <el-table-column label="序号"></el-table-column>
          <el-table-column label="订单状态"></el-table-column>
          <el-table-column label="订单号"></el-table-column>
          <el-table-column label="品项"></el-table-column>
          <el-table-column label="数量"></el-table-column>
          <el-table-column label="单位"></el-table-column>
          <el-table-column label="订单开始日期"></el-table-column>
          <el-table-column label="订单结束日期"></el-table-column>
          <el-table-column label="调配罐号"></el-table-column>
          <el-table-column label="BL原汁量"></el-table-column>
          <el-table-column label="生产日期"></el-table-column>
          <el-table-column label="锅号"></el-table-column>
          <el-table-column label="备注"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
import {headanimation} from '@/net/validate'
export default {
  name: 'OrderAllot',
  data () {
    return {
      isRedact: false,
      formHeader: {
        factory: '',
        workShop: '',
        currPage: '1',
        pageSize: '10',
        totalCount: '0'
      },
      factory: [],
      workshop: []
    }
  },
  mounted () {
    headanimation(this.$)
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.workshop = []
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
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
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '杀菌'}).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workShop = data.typeList[0].deptId
            } else {
              this.formHeader.workShop = ''
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

<style>

</style>
