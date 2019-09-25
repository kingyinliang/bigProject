<template>
  <div class="header_main">
    <el-card class="newCard">
      <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="sole_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" class="width150px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in factoryList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" class="width150px">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期：">
          <el-date-picker type="date" v-model="formHeader.productDate" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:150px"></el-date-picker>
        </el-form-item>
        <el-form-item label="生产订单：">
          <el-input v-model.trim="formHeader.orderNo" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item class="floatr">
          <el-button type="primary" size="small" @click="GetList" v-if="isAuth('bottle:workshop:indexList')" class="floatr">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="20" style="margin-top:5px">
      <el-col :span="8" v-for="(item, index) in dataList" :key="index" style="margin-bottom:15px">
        <div class="sole">
          <div class="top">
            <div>产线：{{item.name}}</div>
            <div class="status">
              <span class="points" :style="{'margin-top':'8px','background': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : item.orderStatus === 'submit'? '#1890ff' : item.orderStatus === 'saved'? '#1890ff' : '#7ED321'}"></span>&nbsp;状态：<i :style="{'color': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : ''}">{{item.orderStatus === 'submit'? '已提交' : item.orderStatus === 'checked' ? '审核通过' : item.orderStatus === 'noPass'?  '审核不通过' : item.orderStatus === 'saved'? '已保存' : item.orderStatus === '已同步' ? '未录入' : item.orderStatus}}</i>
            </div>
          </div>
          <el-row class="content" :gutter="20">
            <el-col class="img" :span="10"><img src="@/assets/img/bottle.png" style="width:95%"></el-col>
            <el-col class="right" :span="14">
              <div class="lines">订单号：
                <el-select v-model="item.orderNo" filterable @change="changeOrder($event, item)" size="mini" style="width:140px;">
                  <el-option v-for="(items, index) in item.orderList" :key="index" :value="items.orderNo" :label="items.orderNo"></el-option>
                </el-select>
              </div>
              <div class="lines">
                <div style="float:left">品项：</div>
                <el-tooltip class="item" effect="dark" :content="item.materialCode + item.materialName" placement="bottom-start">
                  <div style="float:left; width:140px; color:rgba(0, 0, 0, 0.65);overflow: hidden; text-overflow:ellipsis; white-space:nowrap;">{{item.materialCode}}{{item.materialName}}</div>
                </el-tooltip>
              </div>
              <div class="lines">计划产量：<span>{{item.planOutput}} {{item.outputUnit}}</span></div>
              <div class="lines">实时产量：<span>{{item.realOutput}} {{item.realOutput ? item.outputUnit : ''}}</span></div>
            </el-col>
          </el-row>
          <div class="bottom">
            <el-tooltip class="item" effect="dark" :content="item.orderStatus === 'submit' ? '已提交' : item.orderStatus === 'checked' ? '审核通过' : item.orderStatus === 'noPass'?  '审核不通过' : item.orderStatus === 'saved'? '已保存' : item.orderStatus === '已同步' ? '未录入' : item.orderStatus" placement="top-start">
              <el-button :disabled="!isAuth('bottle:inStorage:list')" class="bottom-item" @click="GoDetail(1, item)">生产数据</el-button>
            </el-tooltip>
            <div class="bottom-split"></div>
            <el-tooltip class="item" effect="dark" :content="item.craftDataStatus" placement="top-start">
              <el-button :disabled="!isAuth('bottle:workshop:techProductParameterList')" class="bottom-item" @click="GoDetail(2, item)">工艺数据</el-button>
            </el-tooltip>
            <div class="bottom-split"></div>
            <el-tooltip class="item" effect="dark" :content="item.qualityStatus" placement="top-start">
              <el-button :disabled="!isAuth('bottle:workshop:qualityInspectionList')" class="bottom-item" @click="GoDetail(3, item)">质量检测</el-button>
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { BASICDATA_API, BOTTLE_API } from '@/api/api'
import {dateFormat} from '@/net/validate'
export default {
  name: 'bottleName',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productDate: dateFormat(new Date(), 'yyyy-MM-dd'),
        orderNo: ''
      },
      factoryList: [],
      workshopList: [],
      dataList: [],
      AllList: [],
      orderStatus: ''
    }
  },
  mounted () {
    this.GetFactoryList()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.GetWorkshopList(n)
    }
  },
  methods: {
    // 获取工厂
    GetFactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factoryList = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    GetWorkshopList (id) {
      this.formHeader.workShop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '吹瓶'}).then(({data}) => {
          if (data.code === 0) {
            this.workshopList = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.workshopList = []
      }
    },
    GetList () {
      if (this.formHeader.factory === '') {
        this.$warning_SHINHO('请选择工厂')
        return false
      }
      if (this.formHeader.workShop === '') {
        this.$warning_SHINHO('请选择车间')
        return false
      }
      if ((this.formHeader.productDate === '' || !this.formHeader.productDate) && this.formHeader.orderNo === '') {
        this.$warning_SHINHO('生产日期或生产订单请选填一项')
        return false
      }
      this.$http(`${BOTTLE_API.BOTTLE_INDEX_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.AllList = data.indexInfo
          this.dataList = []
          data.indexInfo.map((item) => {
            let Search = this.dataList.find(items => items.name === item.productLineName)
            if (!Search) {
              this.dataList.push({
                name: item.productLineName,
                orderList: [item],
                orderStatus: item.orderStatus,
                materialCode: item.materialCode,
                materialName: item.materialName,
                planOutput: item.planOutput,
                outputUnit: item.outputUnit,
                realOutput: item.realOutput,
                orderId: item.orderId,
                orderNo: item.orderNo,
                craftDataStatus: item.craftDataStatus,
                qualityStatus: item.qualityStatus
              })
            } else {
              Search.orderList.push(item)
            }
          })
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GoDetail (num, item) {
      let url
      this.$store.state.common.bottle.ProOrderId = item.orderId
      // this.$store.state.common.bottle.ProOrderId = '123'
      switch (num) {
        case 1:
          url = 'DataEntry-Bottle-Production-detail'
          break
        case 2:
          url = 'DataEntry-Bottle-craft'
          break
        case 3:
          url = 'DataEntry-Bottle-qualityTest'
          break
      }
      this.Bottle = {
        orderNo: item.orderNo
      }
      this.mainTabs = this.mainTabs.filter(item => item.name !== url)
      setTimeout(() => {
        this.$router.push({ name: url })
      }, 100)
    },
    changeOrder (event, item) {
      let sole = this.AllList.find(items => items.orderNo === event)
      item.orderStatus = sole.orderStatus
      item.materialCode = sole.materialCode
      item.materialName = sole.materialName
      item.planOutput = sole.planOutput
      item.outputUnit = sole.outputUnit
      item.realOutput = sole.realOutput
      item.orderId = sole.orderId
      item.orderNo = sole.orderNo
      item.craftDataStatus = sole.craftDataStatus
      item.qualityStatus = sole.qualityStatus
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
    },
    Bottle: {
      get () {
        return this.$store.state.common.Bottle
      },
      set (val) {
        this.$store.commit('common/updateBottle', val)
      }
    }
  }
}
</script>

<style lang="less">
.sole {
  background:rgba(255,255,255,1);
  border-radius:2px;
  border:1px solid rgba(232,232,232,1);
  .top {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    .status {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .content {
    padding: 10px;
    .img {
      text-align: center;
      margin-top: 10px;
    }
    .right {
      height: 120px;
      .lines{
        color:rgba(0,0,0,0.45);
        line-height: 26px;
        font-size:12px;
        overflow: hidden;
        span{
          color: rgba(0,0,0,0.65);
          font-size: 12px
        }
      }
      // display: flex;
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;
    background:rgba(247,249,250,1);
    align-items: center;
    width: 100%;
    .bottom-item {
      text-align: center;
      flex: 1;
      font-size: 14px;
      line-height: 40px;
      background: #f7f9fa;
      border-radius: 0;
      border:none; height:40px; padding:0;
      &:hover{
        color:#fff;
        background:#1890FF;
      }
      &.is-disabled{
        color: #606266
      }
      &.is-disabled:hover{
        color: #fff
      }
    }
    .bottom-split {
      width:1px;
      height:16px;
      background:rgba(232,232,232,1);
    }
  }
}
</style>
