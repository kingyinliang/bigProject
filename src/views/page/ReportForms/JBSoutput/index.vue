<template>
<el-row v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
  <div class="main">
    <el-card class="searchCard">
      <el-row type="flex">
        <el-col>
          <linkage :plantList="plantList"></linkage>
          <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="70px" class="maintain">
            <el-form-item label="品项：">
              <el-select v-model="plantList.material" filterable placeholder="请选择">
                <el-option
                  v-for="item in SerchSapList"
                  :key="item.sapCode+' '+item.itemName"
                  :label="item.sapCode+' '+item.itemName"
                  :value="item.sapCode+' '+item.itemName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产日期：" style="width: 400px" class="dateinput">
              <el-row>
                <el-col :span="12">
                  <el-date-picker v-model="plantList.commitDateOne" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 135px"></el-date-picker>
                </el-col>
                <el-col :span="12">
                  <el-date-picker v-model="plantList.commitDateTwo" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 135px"></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col style="width: 200px">
          <el-button type="primary" size="small" @click="GetList(true)">查询</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)">导出Excel</el-button>
        </el-col>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
  </div>
  <div class="main" style="padding-top: 0">
    <el-card class="tableCard">
      <div class="toggleSearchTop">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-table
        :data="dataList"
        border
        tooltip-effect="dark"
        header-row-class-name="tableHead"
        style="width: 100%;margin-bottom: 20px">
        <el-table-column
          prop="orderNo"
          label="生产日期"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="工厂"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="车间"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="产线"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="生产订单"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="生产品项"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="生产批次"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="清洗冲顶"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="换罐冲顶"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="开机冲顶"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="包材不良"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="制程不良"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="半成品物料不合格"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="设备残留"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="备注"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</el-row>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      lodingS: false,
      SerchSapList: [],
      dataList: [],
      plantList: {
        status: 'checked',
        orderNo: '',
        factory: '',
        workshop: '',
        productline: '',
        productdate: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  mounted () {
    this.$http(`${BASICDATA_API.FINDSAP_API}`, 'POST', {params: ''}).then(({data}) => {
      if (data.code === 0) {
        this.SerchSapList = data.list
      } else {
        this.$message.error(data.msg)
      }
    })

    let $ = this.$
    // 搜索切换显隐
    $('.toggleSearchBottom').click(function () {
      $('.searchCard').animate({height: 0}, 300, function () {
        $('.searchCard').parent('.main').css('padding-bottom', 0)
      })
      $(this).hide()
      $('.toggleSearchTop').show()
    })
    $('.toggleSearchTop').click(function () {
      $('.searchCard').animate({height: '140px'}, 300, function () {
        $('.searchCard').parent('.main').css('padding-bottom', '15px')
      })
      $(this).hide()
      $('.toggleSearchBottom').show()
    })
  },
  methods: {
    GetList (st) {
      console.log(this.plantList)
    }
  },
  computed: {},
  components: {
    Linkage: resolve => {
      require(['@/views/page/ReportForms/common/linkage'], resolve)
    }
  }
}
</script>

<style lang="scss">
.dateinput{
  .el-form-item__label{
    width: 100px!important;
  }
  .el-form-item__content{
    width: 300px;
  }
}
</style>
