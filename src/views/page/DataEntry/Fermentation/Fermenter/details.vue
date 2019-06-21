<template>
  <div style="padding: 10px">
    <el-card class="searchCard  newCard">
      <el-row type="flex">
        <el-col class="header_pot">
          <p class='header_pot_label'>罐号：{{formData.holderName ? formData.holderName : ''}}</p>
          <div class="header_pot_image">
            <div class="header-pot__image_content">
            </div>
          </div>
        </el-col>
        <el-col>
          <el-form :inline="true" size="small" label-width="84px" class="topforms topformsde">
            <el-form-item label="生产工厂：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="生产车间：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="订单编号：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="入库状态：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="容器号：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="订单数量：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="入库数量：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="图层物料：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="半成品类别：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="投料日期：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="发酵天数：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="是否成熟：">
              <p class="el-input">{{formData.factoryName ? formData.factoryName : ''}}</p>
            </el-form-item>
            <el-form-item label="订单选择：" class="noneBorder">
              <el-radio-group v-model="formData.resource">
                <el-radio label="正常"></el-radio>
                <el-radio label="冻结"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="searchCard  newCard" style="margin-top: 10px">
      <el-tabs v-model="activeName"  class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">当前订单信息</span>
          <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="车间" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="生产订单号" :show-overflow-tooltip="true" prop="" width="100"></el-table-column>
            <el-table-column label="订单类型" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="物料批次" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="物料编码" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="物料描述" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="曲房号" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="数量" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="单位" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="投料日期" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="入罐日期" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
          </el-table>
          <el-row>
            <el-pagination
              @size-change="handleDataSizeChange"
              @current-change="handleDataCurrentChange"
              :current-page="dataCurrPage"
              :page-sizes="[10, 15, 20]"
              :page-size="dataPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataTotalCount">
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">当前领用信息</span>
          <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="领用日期" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="领用车间" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="领用量(方)" :show-overflow-tooltip="true" prop="" width="100"></el-table-column>
            <el-table-column label="批次" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="原汁罐" :show-overflow-tooltip="true" prop="" width="80"></el-table-column>
            <el-table-column label="入库量(方)" :show-overflow-tooltip="true" prop="" width="100"></el-table-column>
          </el-table>
          <el-row>
            <el-pagination
              @size-change="handleDataSizeChange"
              @current-change="handleDataCurrentChange"
              :current-page="dataCurrPage"
              :page-sizes="[10, 15, 20]"
              :page-size="dataPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dataTotalCount">
            </el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Ferdetails',
  data () {
    return {
      formData: {},
      activeName: '1',
      dataList: [],
      dataCurrPage: 1,
      dataPageSize: 10,
      dataTotalCount: 0
    }
  },
  mounted () {
  },
  methods: {
    handleDataSizeChange (val) {
      this.dataPageSize = val
      this.dataCurrPage = 1
      this.dataList = this.totalDataList.slice((this.dataCurrPage - 1) * this.dataPageSize, (this.dataCurrPage - 1) * this.dataPageSize + this.dataPageSize)
    },
    handleDataCurrentChange (val) {
      this.dataCurrPage = val
      this.dataList = this.totalDataList.slice((this.dataCurrPage - 1) * this.dataPageSize, (val - 1) * this.dataPageSize + this.dataPageSize)
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
.header_pot{
  width: 160px;
  &_label{
    font-size: 18px;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
  &_image{
    width: 160px;
    height: 190px;
    background: url('~@/assets/img/pot.png') no-repeat;
    background-size:contain;
  }
}
</style>
