<template>
  <div class="main">
    <el-card class="searchCards">
      <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
        <el-form-item label="车间：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="产线：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="生产日期：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="订单号：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="品项：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="计划产量：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="提交人员：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="提交时间：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
      </el-form>
      <el-row style="text-align:right">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Bottle-Production-index'})">返回</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" >{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" >保存</el-button>
        </template>
      </el-row>
    </el-card>
    <el-card class="secondcard">
      <el-table :data="dataList" border header-row-class-name="tableHead">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="参数" show-overflow-tooltip width="120" prop="deviceName"></el-table-column>
        <el-table-column label="1#" prop="filterBefTem"></el-table-column>
        <el-table-column label="2#" prop="filterBefPre"></el-table-column>
        <el-table-column label="3#" prop="filterEndPre"></el-table-column>
        <el-table-column label="4#" prop="abnormal"></el-table-column>
        <el-table-column label="5#" prop="backPreNum"></el-table-column>
        <el-table-column label="6# " prop="filterAidBef"></el-table-column>
        <el-table-column label="7#" prop="filterAidAdd"></el-table-column>
        <el-table-column label="8#" show-overflow-tooltip width="120" prop="remark"></el-table-column>
        <el-table-column label="9#" show-overflow-tooltip width="150" prop="changed"></el-table-column>
        <el-table-column label="10#" show-overflow-tooltip width="100" prop="changer"></el-table-column>
        <el-table-column label="11#" show-overflow-tooltip width="150" prop="changed"></el-table-column>
        <el-table-column label="12#" show-overflow-tooltip width="100" prop="changer"></el-table-column>
        <el-table-column width="50" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="DelRow(scope.row)" :disabled="!isRedact || soleStatus " size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'qualityTest',
  data () {
    return {
      formHeader: {
        orderNo: this.$store.state.common.Bottle.orderNo
      },
      isRedact: false
    }
  }
}
</script>
