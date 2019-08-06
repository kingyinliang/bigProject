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
        <el-col :span="4" v-for="(item, index) in dataList" :key="index">
          <el-card class="dataList_item">
            <h3 class="dataList_item_tit">
              {{item.holderNo}}
              <span style="color: #333333;font-weight: normal;font-size: 14px">
                -{{item.holderStatus === '0' ? '空罐' : item.holderStatus === '1' ? '投料中' : item.holderStatus === '2' ? '发酵中' : item.holderStatus === '3' ? '发酵中' : item.holderStatus === '4' ? '领用中' : item.holderStatus === '5' ? '待清洗' : ''}}
              </span>
              <span class="dataList_item_a" @click="godetails(item)" style="font-size: 14px" v-if="isAuth('fer:holderManage:detail')">详情>></span>
            </h3>
            <div class="dataList_item_pot clearfix">
              <div class="dataList_item_pot_box">
                <div class="dataList_item_pot_box1">
                  <div class="dataList_item_pot_box_item2"></div>
                  <div class="dataList_item_pot_box_detail" v-if="item.sumAmout">
                    <p>{{item.ferOrderNo}}</p>
                    <p>{{item.halfTypeName? item.halfTypeName : item.ferMaterialName}}</p>
                    <p>{{item.ferDays}}天</p>
                    <p>{{(item.sumAmout / 1000).toFixed(2)}}方</p>
                    <p v-if="item.holderStatus === '3'">已入库</p>
                  </div>
                </div>
              </div>
            </div>
            <el-row class="dataList_item_btn">
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('1', item)">清罐</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('2', item)"><i class="dataList_item_btn_item_bor"></i>JBS出库</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="toRouter('3', item)"><i class="dataList_item_btn_item_bor"></i>转储</p></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getFactory, getWorkshop, dateFormat} from '@/net/validate'
// import {FERMENTATION_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      fastS: true,
      formHeader: {
        factory: '',
        workShop: '',
        productDate: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
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
    GetDataList () {
      this.$http(`/data/index`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.list
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .dataList{
    margin-top: 10px;
    &_item{
      margin-bottom: 10px;
      &_tit{
        font-weight: 600;
        color: black;
        font-size: 16px;
        padding: 0 10px;
        line-height: 45px;
        border-bottom: 1px solid #E8E8E8;
      }
      &_a{
        cursor: pointer;
        color: #1890FF;
        float: right;
      }
      &_pot{
        padding: 17px 10px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
        &_box1{
          position: relative;
          overflow: hidden;
          width: 102px;
          height: 197px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-end;
        }
        &_box{
          overflow: hidden;
          padding: 25px 9px 9px 9px;
          color: white;
          float: left;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-end;
          width: 120px;
          height: 229px;
          min-width: 120px;
          background: url('~@/assets/img/ferPot.png') no-repeat;
          background-size:contain;
          &_detail{
            width: 100%;
            position: absolute;
            font-size: 14px;
            top: 70px;
            color: black;
            left: 3px;
          }
          &_item1,&_item2{
            width: 100%;
            display:flex;
            align-items:center;
            justify-content: center;
            font-size: 14px;
          }
          &_item2,&_item1{
            width: 100%;
            height: 50px;
            background: #69C0FF;
            position: relative;
            overflow: hidden;
            &::before,&::after{
              content: "";
              position: absolute;
              left: 50%;
              min-width: 175px;
              min-height: 165px;
              background: #fff;
              animation: roateTwo 10s linear infinite;
            }
            &::before {
              top: -158px;
              border-radius: 45%;
            }
            &::after {
              top: -152px;
              opacity: 0.5;
              border-radius: 47%;
            }
          }
          &_item2{
            height: 100px;
            background: #1890FF;
          }
          &:hover &_item1::before,&:hover &_item1::after,&:hover &_item2::before,&:hover &_item2::after{
            animation: roateOne 10s linear infinite;
          }
        }
        &_detail{
          max-width: 112px;
          height: auto;
          float: left;
          margin-top: 25px;
          margin-left: 10px;
          color: #333333;
          font-size: 14px;
          line-height: 18px;
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #1890FF;
        }
      }
    }
  }
  @keyframes roateOne {
    0% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, -1%) rotateZ(180deg);
    }
    100% {
      transform: translate(-50%, -0%) rotateZ(360deg);
    }
  }
  @keyframes roateTwo {
    0% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
  }
</style>
