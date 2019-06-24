<template>
<div style="padding: 5px 10px">
  <el-card class="searchCard  newCard ferCard">
    <el-form :inline="true" :model="formHeader" size="small" label-width="75px" class="topform marbottom">
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
      <el-button type="primary" size="small" @click="GetDataList" style="float: right">查询</el-button>
    </el-form>
  </el-card>
  <el-card class="searchCard  newCard ferCard" style="margin-top: 5px">
    <h3 class="cardTit"><i class="iconfont factory-shujuzonglan" style="color: #666666;margin-right: 10px"></i>发酵情况总览 <i class="gotop" @click="gotop">收起 <i class="el-icon-caret-top"></i></i></h3>
    <div class="sumbox">
    <div class="topBox clearfix">
      <div class="clearfix" v-for="(item, index) in topBox" :key="index" style="float: left">
        <div class="topBox_boxItem">
          <div class="topBox_boxItem_bar">
            <div class="topBox_boxItem_bar_box" :style="{'background': `linear-gradient(to right,${item.startColor} 0%,${item.startColor} 10%,${item.endColor})`}"></div>
          </div>
          <p class="topBox_boxItem_tit">空罐</p>
          <p class="topBox_boxItem_detail">
            总计: <span>4</span> 罐
          </p>
          <div class="topBox_boxItem_popover">
            <p class=""><i class="dot" style="background: #1890FF"></i>味达美<span style="float: right">82 罐</span></p>
            <p class=""><i class="dot" style="background: #FFBF00"></i>六月鲜<span style="float: right">82 罐</span></p>
            <i class="topBox_boxItem_popover_ar"></i>
          </div>
        </div>
        <div class="topBox_circle" :style="{'background': item.color}" v-if="item.color">{{item.text}}</div>
      </div>
    </div>
    </div>
  </el-card>
  <el-card class="searchCard  newCard ferCard" style="margin-top: 5px">
    <h3 style="color: black;margin-bottom: 8px"><i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>发酵罐列表</h3>
    <el-form :inline="true" :model="formHeader" size="small" label-width="75px" class="topform marbottom">
      <el-form-item label="罐号：">
        <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
          <el-option label="请选择"  value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别：">
        <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
          <el-option label="请选择"  value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
          <el-option label="请选择"  value=""></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row class="dataList" :gutter="10">
      <el-col :span="6" v-for="item in 40" :key="item">
        <el-card class="dataList_item">
          <h3 class="dataList_item_tit">4#罐 <span style="color: #333333;font-weight: normal">—发酵中</span> <span class="dataList_item_a">详情>></span></h3>
          <div class="dataList_item_pot clearfix">
            <div class="dataList_item_pot_box">
              <div class="dataList_item_pot_box_item1"></div>
              <div class="dataList_item_pot_box_item2"></div>
            </div>
            <div class="dataList_item_pot_detail">
              <p>711000002345</p>
              <p>普通熟酱醪</p>
              <p>80方</p>
              <p>95天</p>
            </div>
          </div>
          <el-row class="dataList_item_btn">
            <el-col :span="6" class="dataList_item_btn_item">发料</el-col>
            <el-col :span="6" class="dataList_item_btn_item">类别判定</el-col>
            <el-col :span="6" class="dataList_item_btn_item">入库</el-col>
            <el-col :span="6" class="dataList_item_btn_item">清洗</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      topBox: [{
        color: '#999999',
        startColor: '#999999',
        endColor: '#999999',
        text: '空'
      }, {
        color: '#D6D2C4',
        startColor: '#E9E9E9',
        endColor: '#D6D2C4',
        text: '1'
      }, {
        color: '#B58150',
        startColor: '#D6D2C4',
        endColor: '#B58150',
        text: '3'
      }, {
        color: '#3F2021',
        startColor: '#B58150',
        endColor: '#3F2021',
        text: '6'
      }, {
        color: '#C70909',
        startColor: '#3F2021',
        endColor: '#C70909',
        text: '超'
      }, {
        color: '#8BC34A',
        startColor: '#C70909',
        endColor: '#8BC34A',
        text: '压'
      }, {
        color: '',
        startColor: '#999999',
        endColor: '#999999',
        text: ''
      }],
      formHeader: {
        factory: '',
        workShop: ''
      },
      factory: [],
      workshop: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
      this.GetMaterial(n)
    }
  },
  mounted () {
    this.Getdeptcode()
    this.ani()
  },
  methods: {
    ani () {
      let $ = this.$
      this.$('.topBox_boxItem').hover(function () {
        $(this).find('.topBox_boxItem_popover').stop()
        $(this).find('.topBox_boxItem_bar_box').stop()
        $(this).find('.topBox_boxItem_popover').show(500)
        $(this).find('.topBox_boxItem_bar_box').css({width: 0})
        $(this).find('.topBox_boxItem_bar_box').animate({width: '100%'}, 500)
        $(this).parent().find('.topBox_circle').css({transform: 'scale(1.2)'})
        $(this).parent().prev().find('.topBox_circle').css({transform: 'scale(1.2)'})
      }, function () {
        $(this).find('.topBox_boxItem_popover').hide(500)
        $(this).parent().find('.topBox_circle').css({transform: 'scale(1.0)'})
        $(this).parent().prev().find('.topBox_circle').css({transform: 'scale(1.0)'})
      })
    },
    gotop () {
      let $ = this.$
      $('.sumbox').stop()
      let hei = $('.sumbox .topBox').height()
      console.log(hei)
      if ($('.sumbox').height()) {
        $('.sumbox').css({overflow: 'hidden'})
        $('.sumbox').animate({height: 0}, 300, function () {})
      } else {
        $('.sumbox').animate({height: `${hei + 35}px`}, 300, function () {
          $('.sumbox').css({overflow: 'initial'})
        })
      }
    },
    GetDataList () {},
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
    godetails () {
      this.$router.push({ name: `DataEntry-Fermentation-Fermenter-details` })
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss">
.marbottom{
  .el-form-item,.el-form-item--small{
    margin-bottom: 0!important;
  }
}
.ferCard{
  .el-card__body{
    padding: 7px;
  }
  .cardTit{
    font-size: 16px;
    color: black;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #E9E9E9;
    .gotop{
      float: right;
      color: #1890FF;
      font-size: 14px;
      cursor: pointer;
      i{
        :before{
          color: #1890FF;
        }
      }
    }
  }
}
.topBox{
  width: 1160px;
  padding: 25px 25px 10px 25px;
  margin: auto;
  &_boxItem{
    position: relative;
    cursor: pointer;
    width: 131px;
    float: left;
    &_bar{
      width: 115px;
      height: 2px;
      margin: 15px 8px 0 8px;
      background: #f2f2f2;
      &_box{
        height: 2px;
      }
    }
    &_tit{
      color: black;
      font-size: 16px;
      margin-top: 10px;
      text-align: center;
      line-height: 32px;
    }
    &_detail{
      font-size: 14px;
      text-align: center;
      color: #666666;
      span{
        color: black;
      }
    }
    &_popover{
      display: none;
      top: -60px;
      min-width: 150px;
      min-height: 52px;
      padding: 10px 16px;
      border-radius: 4px;
      font-size: 13px;
      line-height: 18px;
      position: absolute;
      z-index: 999999;
      background: white;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
      .dot{
        width: 6px;
        height: 6px;
        float: left;
        margin: 4px 5px 0 0;
        border-radius: 50%;
      }
      &_ar{
        position: absolute;
        bottom: -12px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color:#ffffff transparent transparent transparent;
      }
    }
  }
  &_circle{
    width: 32px;
    height: 32px;
    float: left;
    line-height: 32px;
    text-align: center;
    color: white;
    border-radius: 50%;
    background: #999999;
    transition: all .5s;
  }
}
.dataList{
  margin-top: 10px;
  &_item{
    margin-bottom: 10px;
    .el-card__body{
      padding: 0;
    }
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
      &_box{
        float: left;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
        width: 120px;
        height: 229px;
        background: url('~@/assets/img/ferPot.png') no-repeat;
        background-size:contain;
        &_item1,&_item2{
          width: 100%;
          margin: 0 9px;
        }
        &_item1{
          height: 80px;
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
          margin-bottom: 9px;
          height: 30px;
          background: #1890FF;
        }
        &:hover &_item1::before,&:hover &_item1::after{
          animation: roateOne 10s linear infinite;
        }
      }
      &_detail{
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
    &_btn{
      background: #F7F9FA;
      text-align: center;
      color: #333333;
      font-size: 14px;
      padding: 14px 0 10px 0;
      &_item{
        cursor: pointer;
        border-right: 1px solid #E8E8E8;
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
