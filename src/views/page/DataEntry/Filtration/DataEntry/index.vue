<template>
<div style="padding: 5px 10px">
  <el-card class="newCard" style="min-height: 480px">
    <el-row type="flex" style="border-bottom: 1px solid #E9E9E9;margin-bottom: 12px">
      <el-col>
        <el-form :model="formHeader" size="small" :inline="true" label-position="right" label-width="42px">
          <el-form-item label="工厂：">
            <el-select v-model="formHeader.factory" class="selectwpx" style="width: 140px">
              <el-option label="请选择" value=""></el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车间：">
            <el-select v-model="formHeader.workShop" class="selectwpx" style="width: 140px">
              <el-option label="请选择" value=""></el-option>
              <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产日期：" label-width="70px">
            <el-date-picker type="date" v-model="formHeader.productDate" value-format="yyyy-MM-dd" style="width: 140px"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="width: 340px">
        <el-row class="rowButton">
          <el-button type="primary" size="small" @click="GetOrderList(true)" style="float: right">查询</el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {getFactory, getWorkshop} from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productDate: '',
        currPage: 1,
        pageSize: 2,
        totalCount: 0
      },
      factory: [],
      workshop: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      getWorkshop(this, n, '杀菌')
    }
  },
  mounted () {
    getFactory(this)
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
