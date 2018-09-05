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
                <img :src="'http://10.8.4.153:50080' + item.img" alt="">
                <div class="itemForm">
                  <el-form :model="item" size="small" label-position="right" label-width="68px">
                    <el-form-item label="产线">
                     <p>{{item.productLineName}}</p>
                    </el-form-item>
                    <el-form-item label="订单号">
                      <el-select v-model="item.orderNo" placeholder="请选择" :change="orderchange(item)">
                        <el-option label=""  value=""></el-option>
                        <el-option :label="item" v-for="(item, index) in item.order_arr" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="品项">
                      <p>{{item.materialCode + ' ' + item.materialName}}</p>
                    </el-form-item>
                    <el-form-item label="计划产量">
                      <p>{{item.planOutput + ' ' + item.outputUnit}}</p>
                    </el-form-item>
                    <el-form-item label="实时产量">
                      <p>{{item.realOutput? item.realOutput : '0' + ' ' + item.outputUnit}}</p>
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
      plantList: {
        factoryid: '',
        workShop: '',
        orderNo: '',
        productDate: ''
      },
      list: [],
      workShop: '',
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
    this.plantList.factoryid = this.Pkgfactoryid
    this.plantList.productDate = this.PkgproductDate
    this.plantList.workShop = this.PkgworkShop
    let that = this
    setTimeout(function () {
      that.plantList.workShop = that.PkgworkShop
      that.GetOrderList()
    }, 1000)
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
    Getdeptbyid (id, typ) {
      this.plantList.workShop = ''
      this.$http(`${BASICDATA_API.FINDORGBYID_API}/${id}`, 'GET').then(({data}) => {
        if (data.code === 0) {
          this.workshop = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取列表
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        workShop: this.plantList.workShop,
        productDate: this.plantList.productDate,
        orderNo: ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.Pkgfactoryid = this.plantList.factoryid
          this.PkgworkShop = this.plantList.workShop
          this.PkgproductDate = this.plantList.productDate
          this.list = this.orderList(data.list)
          this.workShop = this.plantList.workShop
          this.productDate = this.plantList.productDate
          this.factoryid = this.plantList.factoryid
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 订单号下拉
    orderchange (row) {
      if (row.orderNo && row.orderNo !== row.orderNo2) {
        this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
          workShop: this.workShop,
          productDate: this.productDate,
          orderNo: row.orderNo
        }).then(({data}) => {
          if (data.code === 0) {
            row.orderNo2 = row.orderNo
            row.materialCode = data.list[0].materialCode
            row.materialName = data.list[0].materialName
            row.planOutput = data.list[0].planOutput
            row.outputUnit = data.list[0].outputUnit
            row.properties = data.list[0].properties
            row.plan = data.list[0].plan
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
        let orderNo = [data[i].orderNo]
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].productLine === data[j].productLine) {
            j = ++i
            orderNo.push(data[j].orderNo)
          }
        }
        let orderNos = ''
        if (orderNo.length === 1) {
          orderNos = orderNo[0]
        } else {
          orderNos = ''
        }
        result.push({
          img: data[i].img,
          productLine: data[i].productLine,
          productLineName: data[i].productLineName,
          orderNo: orderNos,
          orderNo2: '',
          order_arr: orderNo,
          materialCode: '',
          materialName: '',
          planOutput: '',
          outputUnit: '',
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
      if (item.orderNo && item.properties) {
        this.$router.push({ path: `DataEntry-Packaging-ProDataIn?order_no=${item.orderNo}&workShop=${this.workShop}&factoryid=${this.factoryid}&productDate=${this.productDate}` })
      } else {
        this.$message.error('请选择订单号')
      }
    }
  },
  computed: {
    Pkgfactoryid: {
      get () { return this.$store.state.common.Pkgfactoryid },
      set (val) { this.$store.commit('common/updateFactoryid', val) }
    },
    PkgworkShop: {
      get () { return this.$store.state.common.PkgworkShop },
      set (val) { this.$store.commit('common/updateWorkShop', val) }
    },
    PkgproductDate: {
      get () { return this.$store.state.common.PkgproductDate },
      set (val) { this.$store.commit('common/updateProductDate', val) }
    }
  },
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
      width: 180px;
      height: 300px;
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
