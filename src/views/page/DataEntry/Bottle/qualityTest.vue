<template>
  <div class="main">
    <el-card class="searchCards">
      <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
        <el-form-item label="车间：" label-width="60px">
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
        <el-form-item label="品项：" label-width="60px">
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
          <el-button type="primary" size="small" @click="SubmitForm" >提交</el-button>
        </template>
      </el-row>
    </el-card>
    <el-tabs @tab-click='tabClick' ref='tabs' v-model="activeName" type="border-card" class="NewDaatTtabs" style="margin-top:15px">
      <el-tab-pane name="1" label="产品参数">
        <el-row>
          <el-col style="float:right">
            <el-button type="primary" :disabled="!isRedact" @click="AddRow" size="small" style="float:right">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="参数" show-overflow-tooltip width="85" prop="canshu"></el-table-column>
          <el-table-column label="时间" width="140" prop="time"></el-table-column>
          <el-table-column label="1#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="2#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="3#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="4#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="5#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="6#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="7#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="8#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="9#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="10#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="11#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="12#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.one" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="50" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="DelRow(scope.row)" :disabled="!isRedact" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="设备数据">
      </el-tab-pane>
      <el-tab-pane name="3" label="加温参数">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {dateFormat} from '@/net/validate'
export default {
  name: 'qualityTest',
  data () {
    return {
      formHeader: {
        orderNo: this.$store.state.common.Bottle.orderNo
      },
      isRedact: false,
      activeName: '1',
      dataList: []
    }
  },
  methods: {
    AddRow () {
      if (this.dataList.length === 0) {
        this.dataList.push({
          canshu: '拉伸角度',
          time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
          one: ''
        }, {
          canshu: '预吹角度',
          time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
        }, {
          canshu: '主吹角度',
          time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
        }, {
          canshu: '回收角度',
          time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
        }, {
          canshu: '排气角度',
          time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
        })
      } else {
        console.log('test')
      }
    },
    tabClick () {

    }
  }
}
</script>

<style>
.bottom {
  border-bottom: 1px solid #D8D8D8;
  width: 150px;
}
</style>
