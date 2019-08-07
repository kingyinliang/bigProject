<template>
  <div style="padding: 10px">
    <el-card class="searchCard  newCard">
      <el-row type="flex">
        <el-col class="header_pot" style="width: 160px">
          <p class='header_pot_label'>罐号：{{formData.holderName ? formData.holderName : ''}}</p>
          <div class="header_pot_image">
            <div class="header_pot_image_content">
            </div>
          </div>
        </el-col>
        <el-col>
          <el-form :inline="true" size="small" label-width="84px" class="topforms topformsde">
            <el-form-item label="生产工厂：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="生产车间：">
              <p class="el-input">{{formData.workShopName ? formData.workShopName : ''}}</p>
            </el-form-item>
            <el-form-item label="当前库存：">
              <p class="el-input">{{formData.amount}}</p>
            </el-form-item>
            <el-form-item label="容量：">
              <p class="el-input">{{formData.holderHold}}</p>
            </el-form-item>
            <el-form-item label="当前物料：">
              <p class="el-input">{{(formData.materialCode? formData.materialCode: '') + ' ' + (formData.materialName? formData.materialName : '')}}</p>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <el-tabs v-model="activeName"  class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">当前数据</span>
          <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55" :index="indexOrderMethod"></el-table-column>
            <el-table-column label="成品罐号" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="90"></el-table-column>
            <el-table-column label="物料" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
            <el-table-column label="成品批次" :show-overflow-tooltip="true" prop="orderType" width="80"></el-table-column>
            <el-table-column label="移动数量" :show-overflow-tooltip="true" prop="batch" width="105"></el-table-column>
            <el-table-column label="移动类型" :show-overflow-tooltip="true" prop="materialCode" width="110"></el-table-column>
            <el-table-column label="单位" :show-overflow-tooltip="true" prop="materialName"></el-table-column>
            <el-table-column label="罐内库存" :show-overflow-tooltip="true" prop="kjmHouse" width="80"></el-table-column>
            <el-table-column label="订单号" :show-overflow-tooltip="true" prop="amount" width="80"></el-table-column>
            <el-table-column label="出/入罐类别" :show-overflow-tooltip="true" prop="instorageAmount" width="80"></el-table-column>
            <el-table-column label="出/入罐号" :show-overflow-tooltip="true" prop="unit" width="50"></el-table-column>
            <el-table-column label="备注" :show-overflow-tooltip="true" prop="shootDate" width="80"></el-table-column>
            <el-table-column label="操作时间" :show-overflow-tooltip="true" prop="inHolderDate" width="80"></el-table-column>
            <el-table-column label="操作人" :show-overflow-tooltip="true" prop="inHolderDate" width="80"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">当前领用信息</span>
          <el-table header-row-class-name="tableHead" :data="dataListRe" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55" :index="indexOrderMethod"></el-table-column>
            <el-table-column label="成品罐号" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="90"></el-table-column>
            <el-table-column label="物料" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
            <el-table-column label="成品批次" :show-overflow-tooltip="true" prop="orderType" width="80"></el-table-column>
            <el-table-column label="移动数量" :show-overflow-tooltip="true" prop="batch" width="105"></el-table-column>
            <el-table-column label="移动类型" :show-overflow-tooltip="true" prop="materialCode" width="110"></el-table-column>
            <el-table-column label="单位" :show-overflow-tooltip="true" prop="materialName"></el-table-column>
            <el-table-column label="罐内库存" :show-overflow-tooltip="true" prop="kjmHouse" width="80"></el-table-column>
            <el-table-column label="订单号" :show-overflow-tooltip="true" prop="amount" width="80"></el-table-column>
            <el-table-column label="出/入罐类别" :show-overflow-tooltip="true" prop="instorageAmount" width="80"></el-table-column>
            <el-table-column label="出/入罐号" :show-overflow-tooltip="true" prop="unit" width="50"></el-table-column>
            <el-table-column label="备注" :show-overflow-tooltip="true" prop="shootDate" width="80"></el-table-column>
            <el-table-column label="操作时间" :show-overflow-tooltip="true" prop="inHolderDate" width="80"></el-table-column>
            <el-table-column label="操作人" :show-overflow-tooltip="true" prop="inHolderDate" width="80"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {FILTRATION_API} from '@/api/api'
export default {
  name: 'detail',
  data () {
    return {
      formData: {},
      activeName: '1',
      dataList: [],
      dataListRe: []
    }
  },
  mounted () {
    this.GetDataList()
  },
  methods: {
    GetDataList () {
      this.$http(`${FILTRATION_API.FILTER_POT_LIST_API}`, 'POST', {
        factory: this.$store.state.common.filtrationPot.factory,
        workShop: this.$store.state.common.filtrationPot.workShop,
        holderId: this.$store.state.common.filtrationPot.holderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.formData = data.list[0]
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss">
  .topformsde{
    .el-form-item__content{
      height: 32px;
      border-bottom: 1px solid #D8D8D8;
    }
    .noneBorder{
      .el-form-item__content{
        border-bottom: none;
      }
    }
    .el-input{
      width: 145px!important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 32px;
    }
  }
</style>
<style lang="scss" scoped>
  .header_pot{
    width: 160px;
    &_label{
      font-size: 14px;
      font-weight: 400;
      color: rgba(102,102,102,1);
      margin-bottom: 15px;
    }
    &_image{
      width: 70px;
      height: 100px;
      margin-left: 20px;
      background: url('~@/assets/img/ferPot.png') no-repeat center center;
      background-size:contain;
      display: flex;
      align-items:flex-end;
      justify-content: center;
      &_content{
        margin-bottom: 4px;
        width: 42px;
        height: 45px;
        background: linear-gradient(#35C3FF,#1890FF);
      }
    }
  }
</style>
