<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" label-width="96px" size="small">
            <el-form-item label="生产工厂："><p class="bottomline" style="width:212px;">{{formHeader.FACTORY}}</p></el-form-item>
            <el-form-item label="生产车间："><p class="bottomline">{{formHeader.WORK_SHOP}}</p></el-form-item>
            <el-form-item label="申请编号："><p class="bottomline">{{formHeader.APPLY_NO}}</p></el-form-item>
            <el-form-item label="半成品类别："><p class="bottomline">{{formHeader.HALF_TYPE}}</p></el-form-item>
            <el-form-item label="酱醪名称："><p class="bottomline" style="width:212px;">{{formHeader.MATERIAL_CODE}}{{formHeader.MATERIAL_NAME}}</p></el-form-item>
            <el-form-item label="生产日期："><p class="bottomline">{{formHeader.PRODUCT_DATE}}</p></el-form-item>
            <el-form-item label="申请数量："><p class="bottomline">{{formHeader.AMOUNT}}</p></el-form-item>
            <el-form-item label="申请人员："><p class="bottomline">{{formHeader.CREATOR}}</p></el-form-item>
            <el-form-item label="申请时间："><p class="bottomline" style="width:212px;">{{formHeader.CREATED}}</p></el-form-item>
            <el-form-item label="状态："><p class="bottomline">{{formHeader.CONFIRM_FLAG === 1 ? '未确认' : '已确认'}}</p></el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top:15px">
      <el-row>
        <el-col style="font-weight: bold;">
          <i class="iconfont factory-shouye"></i>
          <span>开罐列表</span>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px">
        <el-col :span="22">
          <el-form :inline="true" v-model="searchform" size="small">
            <el-form-item label="罐号">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="类别">
              <el-select></el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select></el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :disabled="isRedact" size="small" style="float:right">开罐</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="dataList" border header-row-class-name="tableHead">
            <el-table-column type="selection" :selectable="CheckBoxInit" width="35"></el-table-column>
            <el-table-column label="罐号" prop="id"></el-table-column>
            <el-table-column label="物料" prop=""></el-table-column>
            <el-table-column label="酱醪类别" prop=""></el-table-column>
            <el-table-column label="发酵天数/天" prop=""></el-table-column>
            <el-table-column label="酱醪状态" prop=""></el-table-column>
            <el-table-column label="数量" prop=""></el-table-column>
            <el-table-column label="单位" prop=""></el-table-column>
            <el-table-column label="入库日期" prop=""></el-table-column>
            <el-table-column label="批次" prop=""></el-table-column>
            <el-table-column label="备注" prop=""></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="margin-top:15px">
        <el-col>可用数量：{{total}} 个，已选择：{{already}} 个</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { FERMENTATION_API } from '@/api/api'
import { dateFormat } from '@/net/validate'
export default {
  name: 'detail',
  data () {
    return {
      formHeader: [],
      already: 0,
      searchform: {},
      dataList: [{
        id: 1
      }, {
        id: 2
      }],
      isRedact: false
    }
  },
  mounted () {
    this.Getdetail()
  },
  watch: {
  },
  methods: {
    Getdetail () {
      this.$http(`${FERMENTATION_API.FORRECIPIENTSDETAIL_API}`, 'POST', {id: this.$store.state.common.Fermentation.orderId}).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.openBasicsInfo
          if (data.openBasicsInfo.PRODUCT_DATE <= dateFormat(new Date(), 'yyyy-MM-dd')) {
            this.isRedact = true
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.already = this.multipleSelection.length
    },
    CheckBoxInit (row, index) {
      if (this.formHeader.PRODUCT_DATE <= dateFormat(new Date(), 'yyyy-MM-dd')) {
        return 0
      } else {
        return 1
      }
    }
  },
  computed: {
    total: function () {
      return this.dataList.length
    }
  }
}
</script>

<style lang="less">
.bottomline {border-bottom: 1px solid #D8D8D8; width:152px; overflow:hidden; height:32px;}
</style>
