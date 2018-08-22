<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据录入</el-breadcrumb-item>
        <el-breadcrumb-item>包装车间</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-card>
        <el-form :model="plantList" size="small" :inline="true" label-position="left" label-width="40px" ref="" @keyup.enter.native="GetOrderList()">
          <el-form-item label="工厂">
            <el-select v-model="plantList.factoryid" placeholder="请选择">
              <el-option label=""  value=""></el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车间">
            <el-select v-model="plantList.workShop" placeholder="请选择" @change="setworkShopname">
              <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker type="date" placeholder="选择" v-model="plantList.productDate" value-format="yyyyMMdd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="GetOrderList()">查询</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10">
          <el-col :span="12" v-for="(item, index) in list" :key="index" style="margin-bottom: 10px">
            <el-card class="box-card">
              <div class="clearfix">
                <el-button @click="goPro(item)" type="primary" size="small" style="float: right">数据录入</el-button>
              </div>
              <div class="clearfix item">
                <img :src="item.img" alt="">
                <div class="itemForm">
                  <el-form :model="item" size="small" label-position="right" label-width="68px">
                    <el-form-item label="产线">
                     <p>{{item.product_line}}</p>
                    </el-form-item>
                    <el-form-item label="订单号">
                      <el-select v-model="item.order_no" placeholder="请选择" :change="orderchange(item)">
                        <el-option label=""  value=""></el-option>
                        <el-option :label="item" v-for="(item, index) in item.order_arr" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="品项">
                      <p>{{item.name}}</p>
                    </el-form-item>
                    <el-form-item label="计划产量">
                      <p>{{item.plan}}</p>
                    </el-form-item>
                    <el-form-item label="实时产量">
                      <p>{{item.actual}}</p>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import {BASICDATA_API, PACKAGING_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      factory: [],
      workshop: [],
      list: [],
      plantList: {
        factoryid: '',
        workShop: '',
        orderNo: '',
        productDate: ''
      },
      orderNo: '',
      productDate: '',
      factoryid: '',
      workShopname: ''
    }
  },
  watch: {
    'plantList.factoryid' (n, o) {
      this.Getdeptbyid(n)
    }
  },
  mounted () {
    this.GetOrderList()
    this.Getdeptcode()
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', JSON.stringify(id)).then(({data}) => {
        if (data.code === 0) {
          this.workshop = data.childList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取列表
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        // workShop: this.plantList.workShop,
        workShop: '4E5FE5ADEC514FB5B680F1096A9D4AAA',
        productDate: this.plantList.productDate,
        orderNo: this.plantList.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.list = this.orderList(data.list)
          this.orderNo = this.plantList.orderNo
          this.productDate = this.plantList.productDate
          this.factoryid = this.plantList.factoryid
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 订单号下拉
    orderchange (row) {
      if (row.order_no && row.order_no !== row.order_no2) {
        this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
          // workShop: this.plantList.workShop,
          workShop: '4E5FE5ADEC514FB5B680F1096A9D4AAA',
          productDate: this.plantList.productDate,
          orderNo: row.order_no
        }).then(({data}) => {
          if (data.code === 0) {
            row.order_no2 = row.order_no
            row.name = data.list[0].name
            row.properties = data.list[0].properties
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 数据处理
    orderList (data) {
      console.log(data)
      let result = []
      for (let i = 0; i < data.length; i++) {
        let orderNo = [data[i].order_no]
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].product_line === data[j].product_line) {
            j = ++i
            orderNo.push(data[j].order_no)
          }
        }
        result.push({
          product_line: data[i].product_line,
          order_no: '',
          order_no2: '',
          order_arr: orderNo,
          name: '',
          properties: ''
        })
      }
      return result
    },
    setworkShopname (val) {
      this.workShopname = val
    },
    // 数据录入
    goPro (item) {
      if (item.order_no && item.properties) {
        this.$router.push({ path: `DataEntry-Packaging-ProDataIn?order_no=${item.order_no}&factoryid=${this.factoryid}&workShopname=${this.workShopname}&productDate=${this.productDate}` })
      } else {
        this.$message.error('请选择订单号')
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.box-card{
  b{
    font-size: 16px;
    line-height: 32px;
    float: left;
  }
  .item{
    margin-top: 20px;
    display: flex;
    img{
      float: left;
      width: 200px;
      height: 240px;
      margin-right: 50px;
    }
    .itemForm{
      flex: 1;
      p{
        color: #8a979e;
      }
    }
  }
}
</style>
