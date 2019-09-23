<template>
<div class="header_main">
  <el-card class="newCard" style="min-height:480px">
    <el-row type="flex" style="border-bottom: 1px solid #E9E9E9;">
      <el-col>
        <el-form :model="formHeader" size="small" :inline="true" label-position="right" label-width="70px" class="multi_row">
          <el-form-item label="生产工厂：">
            <el-select v-model="formHeader.factory" class="selectwpx" style="width: 140px">
              <el-option label="请选择" value=""></el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产车间：">
            <el-select v-model="formHeader.workShop" class="selectwpx" style="width: 140px">
              <el-option label="请选择" value=""></el-option>
              <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产日期：">
            <el-date-picker type="date" v-model="formHeader.productDate" value-format="yyyy-MM-dd" style="width: 140px"></el-date-picker>
          </el-form-item>
          <el-form-item label="订单：" label-width="42px">
            <el-input type="text" v-model="formHeader.orderNo" clearable ></el-input>
          </el-form-item>
          <el-form-item class="floatr">
            <el-button type="primary" size="small" @click="GetOrderList(true)" style="float: right" v-if="isAuth('filter:order:list')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in dataList" :key="index" id="normal" :span="12" style="margin-top:12px; padding-bottom:20px">
        <div class="title_left" style="font-size: 16px;font-weight: bold;margin-bottom: 8px;">工序： <font style="color:red">{{item.productLineName}}</font></div>
        <div class="sole_cont">
          <el-form size="small" :inline="true" label-position="right" label-width="90px">
            <div class="itemImg">
              <img :src="'data:image/gif;base64,' + item.img" alt="" style="width:100%; min-height:181px">
            </div>
            <div class="title_left">
              <div style="float: left;font-size: 14px;font-weight: normal;line-height: 60px">
                <span class="points" :style="{'background': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : item.orderStatus === 'submit'? '#1890ff' : item.orderStatus === 'saved'? '#1890ff' : '#7ED321'}"></span>订单状态：<i :style="{'color': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : ''}">{{item.orderStatus === 'submit'? '已提交' : item.orderStatus === 'checked' ? '审核通过' : item.orderStatus === 'noPass'?  '审核不通过' : item.orderStatus === 'saved'? '已保存' : item.orderStatus === '已同步' ? '未录入' : item.orderStatus}}</i>
              </div>
              <el-button @click="go(item)" type="primary" size="small" style="float: right; margin-top: 14px;background-color: #1890FF;color: white" v-if="isAuth('filter:instorage:list')">数据录入</el-button>
            </div>
            <div class="normal_bottom">
              <el-form-item label="订单号：" class="width50b">
                <el-select v-model="item.orderNo" placeholder="请选择" :change="orderchange(item)" style="width:150px">
                  <el-option :label="item" v-for="(item, index) in item.order_arr" :key="index" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="计划产量：" class="width50b">
                <div style="width:152px; border-bottom:1px solid #ccc">&nbsp;{{(item.planOutput || '0') + ' ' + (item.outputUnit || '')}}</div>
              </el-form-item>
              <el-form-item label="品项：" class="width50b">
                <el-tooltip class="item" effect="dark" :content="(item.materialCode || '') + ' ' + (item.materialName || '')" placement="top">
                  <div class="hiddenP">&nbsp;{{(item.materialCode || '') + ' ' + (item.materialName || '')}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="实际产量：" class="width50b">
                <div style="width:152px; border-bottom:1px solid #ccc">&nbsp;{{(item.countOutput || '0') + ' ' + (item.outputUnit || '')}}</div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {getFactory, getWorkshop, orderList} from '@/net/validate'
import {FILTRATION_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productDate: '',
        orderNo: ''
      },
      factory: [],
      workshop: [],
      dataList: []
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
    GetOrderList () {
      if (this.formHeader.factory === '') {
        this.$warning_SHINHO('请选择工厂')
        return
      }
      if (this.formHeader.workShop === '') {
        this.$warning_SHINHO('请选择车间')
        return
      }
      if ((this.formHeader.productDate === '' || !this.formHeader.productDate) && this.formHeader.orderNo === '') {
        this.$warning_SHINHO('生产日期或生产订单请选填一项')
        return false
      }
      this.$http(`${FILTRATION_API.FILTER_HOME_LIST_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = orderList(data.list)
          console.log(this.dataList[0].img.length)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 订单号下拉
    orderchange (row) {
      if (row.orderNo && row.orderNo !== row.orderNo2) {
        this.$http(`${FILTRATION_API.FILTER_HOME_LIST_API}`, 'POST', {
          orderNo: row.orderNo
        }).then(({data}) => {
          if (data.code === 0) {
            row.orderNo2 = row.orderNo
            row.materialCode = data.list[0].materialCode
            row.materialName = data.list[0].materialName
            row.planOutput = data.list[0].planOutput
            row.orderStatus = data.list[0].orderStatus
            row.outputUnit = data.list[0].outputUnit
            row.properties = data.list[0].properties
            row.countOutput = data.list[0].countOutput
            row.plan = data.list[0].plan
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 跳转
    go (item) {
      if (!item.orderNo) {
        this.$warning_SHINHO('请选择订单号')
        return
      }
      this.$store.state.common.orderNo = item.orderNo
      this.$store.state.common.orderId = item.orderIdList[item.orderNo]
      this.mainTabs = this.mainTabs.filter(item => item.name !== 'DataEntry-Filtration-DataEntry-detail')
      setTimeout(() => {
        this.$router.push({ name: `DataEntry-Filtration-DataEntry-detail` })
      }, 100)
    }
  },
  computed: {
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  .itemImg{
    position: relative;
    width:100%;
    min-height:181px;
    overflow: hidden;
    cursor: pointer;
    img{
      transition:All 1s ease-in-out;
    }
  }
  .itemImg:hover{
    img{
      transform:scale(1.2);
    }
  }
  .rowButton{
    button{
      margin: 0px 3px!important;
    }
  }
  .box-card{
    .pro-line { border-bottom: 1px solid #dcdfe6; }
    .pro-line p { color: red; font-size: 16px; letter-spacing: .1em; }
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
        width: 220px;
        height: 220px;
        border-radius: 6px;
        border: 1px solid #dcdfe6;
        margin-right: 20px;
      }
      .itemForm{
        flex: 1;
        p{
          color: #8a979e;
        }
      }
      .margb20px{margin-bottom: 10px}
    }
  }
  #normal{
    .sole_cont{
      border: #E9E9E9 1px solid;
      .sole_status{
        float: right;color: #565656;font-size: 14px;min-width: 150px; position: absolute; right: 15px;top: 20px;
      }
      .points{width: 5px; height: 5px; border-radius: 50%; display: block; float: left;margin-top: 27px;margin-right: 8px}
      .title_left{border-bottom:#E9E9E9 1px solid; padding:0 15px; font-weight: bold;height: 60px;line-height: 60px;display: block;}
      .el-form-item__content{
        width: 61%;
        border-bottom: #ccc solid 1px;
      }
      .width50b{ width: 49%; margin: 5px 0}
      .normal_bottom{padding: 5px 0}
    }
  }
  .selectwpx{
    width:120px;
  }
  .hiddenP{
    width:150px;
    border-bottom: 1px solid #cccccc;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
