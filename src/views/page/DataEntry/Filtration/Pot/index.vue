<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard">
      <el-form :inline="true" size="small" :model="formHeader" label-width="75px" class="topform marbottom">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期：">
          <el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="formHeader.productDate" style="width: 180px"></el-date-picker>
        </el-form-item>
        <el-button type="primary" size="small" @click="GetDataList(true)" style="float: right" v-if="isAuth('ste:order:list')">查询</el-button>
      </el-form>
    </el-card>
    <el-card class="searchCard  newCard ferCard" style="margin-top: 5px"  v-show="fastS">
      <h3 style="color: black;margin-bottom: 8px"><i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>发酵罐列表</h3>
      <el-row class="dataList" :gutter="10" style="min-height: 150px">
        <el-col :span="4" v-for="(item, index) in 10" :key="index">
          <el-card class="dataList_item">
            <h3 class="dataList_item_tit">
              {{item.holderNo}}
              <span style="color: #333333;font-weight: normal;font-size: 14px">
                -{{item.holderStatus === '0' ? '空罐' : item.holderStatus === '1' ? '投料中' : item.holderStatus === '2' ? '发酵中' : item.holderStatus === '3' ? '发酵中' : item.holderStatus === '4' ? '领用中' : item.holderStatus === '5' ? '待清洗' : ''}}
              </span>
              <span class="dataList_item_a" @click="godetails(item)" style="font-size: 14px" v-if="isAuth('fer:holderManage:detail')">详情>></span>
            </h3>
            <div class="dataList_item_pot clearfix">
              <div class="dataList_item_pot_box_detail" v-if="item.sumAmout">
                <p>{{item.ferOrderNo}}</p>
                <p>{{item.halfTypeName? item.halfTypeName : item.ferMaterialName}}</p>
                <p>{{item.ferDays}}天</p>
                <p>{{(item.sumAmout / 1000).toFixed(2)}}方</p>
                <p v-if="item.holderStatus === '3'">已入库</p>
              </div>
            </div>
            <el-row class="dataList_item_btn">
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('1', item)">清罐</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('2', item)">JBS出库</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('3', item)">转储</p></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getFactory, getWorkshop, dateFormat} from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      fastS: false,
      formHeader: {
        factory: '',
        workShop: '',
        productDate: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      },
      factory: [],
      workshop: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      getWorkshop(this, n, '过滤')
    }
  },
  mounted () {
    getFactory(this)
  },
  methods: {
    GetDataList () {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
