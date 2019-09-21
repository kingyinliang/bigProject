<template>
  <div class="header_main">
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
          <el-form :inline="true" size="small" label-width="70px" class="topforms topformsde multi_row">
            <el-form-item label="生产工厂：">
              <el-tooltip class="item" effect="dark" :content="formData.factoryName ? formData.factoryName : ''" placement="top">
                <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="生产车间：">
              <p class="el-input">{{formData.workShopName ? formData.workShopName : ''}}</p>
            </el-form-item>
            <el-form-item label="当前库存：">
              <p class="el-input">{{formData.amount + formData.unit}}</p>
            </el-form-item>
            <el-form-item label="容量：">
              <p class="el-input">{{(formData.holderHold || '') + (formData.unit||'')}}</p>
            </el-form-item>
            <el-form-item label="当前物料：">
              <el-tooltip class="item" effect="dark" :content="(formData.materialCode? formData.materialCode: '') + ' ' + (formData.materialName? formData.materialName : '')" placement="top">
                <p class="el-input">{{(formData.materialCode? formData.materialCode: '') + ' ' + (formData.materialName? formData.materialName : '')}}</p>
              </el-tooltip>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-tabs v-model="activeName" class="NewDaatTtabs" type="border-card" style="margin-top:5px">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">当前数据</span>
        <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
          <el-table-column type="index" label="序号" width="55" :index="indexOrderMethod"></el-table-column>
          <el-table-column label="成品罐号" :show-overflow-tooltip="true" prop="holderNo" width="80"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true" prop="orderNo" width="160">
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="成品批次" :show-overflow-tooltip="true" prop="batch" width="110"></el-table-column>
          <el-table-column label="移动数量" :show-overflow-tooltip="true" prop="moveAmount" width="85"></el-table-column>
          <el-table-column label="移动类型" :show-overflow-tooltip="true" prop="moveType" width="85"></el-table-column>
          <el-table-column label="单位" :show-overflow-tooltip="true" prop="unit" width="60"></el-table-column>
          <el-table-column label="订单号" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
          <el-table-column label="出/入罐类别" :show-overflow-tooltip="true" prop="inHolderType" width="110"></el-table-column>
          <el-table-column label="出/入罐号" :show-overflow-tooltip="true" prop="inHolderNo" width="110"></el-table-column>
          <el-table-column label="备注" :show-overflow-tooltip="true" prop="remark" width="100"></el-table-column>
          <el-table-column label="操作时间" :show-overflow-tooltip="true" prop="changed" width="110"></el-table-column>
          <el-table-column label="操作人" :show-overflow-tooltip="true" prop="changer" width="110"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">历史数据</span>
        <el-table header-row-class-name="tableHead" :data="dataListRe" border tooltip-effect="dark" >
          <el-table-column type="index" label="序号" width="55" :index="indexOrderMethod"></el-table-column>
          <el-table-column label="成品罐号" :show-overflow-tooltip="true" prop="holderNo" width="80"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true" prop="orderNo" width="160">
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="成品批次" :show-overflow-tooltip="true" prop="batch" width="110"></el-table-column>
          <el-table-column label="移动数量" :show-overflow-tooltip="true" prop="moveAmount" width="85"></el-table-column>
          <el-table-column label="移动类型" :show-overflow-tooltip="true" prop="moveType" width="85"></el-table-column>
          <el-table-column label="单位" :show-overflow-tooltip="true" prop="unit" width="60"></el-table-column>
          <el-table-column label="订单号" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
          <el-table-column label="出/入罐类别" :show-overflow-tooltip="true" prop="inHolderType" width="110"></el-table-column>
          <el-table-column label="出/入罐号" :show-overflow-tooltip="true" prop="inHolderNo" width="110"></el-table-column>
          <el-table-column label="备注" :show-overflow-tooltip="true" prop="remark" width="100"></el-table-column>
          <el-table-column label="操作时间" :show-overflow-tooltip="true" prop="changed" width="110"></el-table-column>
          <el-table-column label="操作人" :show-overflow-tooltip="true" prop="changer" width="110"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      this.$http(`${FILTRATION_API.FILTER_POT_DETAIL_API}`, 'POST', this.$store.state.common.filtrationPot).then(({data}) => {
        if (data.code === 0) {
          this.formData = data.list[0]
          this.dataList = data.current
          this.dataListRe = data.history
        } else {
          this.$notify.error({title: '错误', message: data.msg})
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
