<template>
  <div class="header_main" >
    <el-card class="searchCards">
      <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="multi_row">
        <el-form-item label="生产车间：">
          <p class="bottom">{{formHeader.workShopName}}</p>
        </el-form-item>
        <el-form-item label="生产产线：">
          <p class="bottom">{{formHeader.productLineName}}</p>
        </el-form-item>
        <el-form-item label="生产日期：">
          <p class="bottom">{{formHeader.productDate}}</p>
        </el-form-item>
        <el-form-item label="订单号：">
          <p class="bottom">{{formHeader.orderNo}}</p>
        </el-form-item>
        <el-form-item label="生产品项：">
          <el-tooltip class="item" effect="dark" :content="formHeader.materialCode + formHeader.materialName" placement="top-start">
            <p class="bottom">{{formHeader.materialCode}} {{formHeader.materialName}}</p>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="计划产量：">
          <p class="bottom">{{formHeader.planOutput}}</p>
        </el-form-item>
        <el-form-item label="保存人员：">
          <p class="bottom">&nbsp;{{formHeader.changer}}</p>
        </el-form-item>
        <el-form-item label="保存时间：">
          <p class="bottom">&nbsp;{{formHeader.changed}}</p>
        </el-form-item>
        <el-form-item class="floatr">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Bottle-index'})">返回</el-button>
            <el-button type="primary" class="button" v-if="isAuth('bottle:workshop:techProductParameterList')" size="small" @click="isRedact = !isRedact" >{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" v-if="isAuth('bottle:workshop:techProductParameterList')" @click="savedOrSubmitForm('saved')" >保存</el-button>
            <!-- <el-button type="primary" size="small" @click="savedOrSubmitForm('submit')" >提交</el-button> -->
          </template>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="secondcard">
      <el-row>
        <el-col style="float:right">
          <el-button type="primary" :disabled="!isRedact" @click="AddRow" size="small" style="float:right">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="dataList" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="参数" show-overflow-tooltip width="85" prop="parameter"></el-table-column>
        <el-table-column label="时间" width="200" prop="date">
          <template slot-scope="scope">
            <el-date-picker type="datetime" v-model="scope.row.date" :disabled="!isRedact" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" style="width:180px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="1#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.oneWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.oneWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="2#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.twoWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.twoWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="3#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.threeWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.threeWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="4#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fourWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.fourWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="5#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fiveWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.fiveWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="6#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sixWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.sixWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="7#" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.sevenWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.sevenWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="8#" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.eightWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.eightWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="9#" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nineWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.nineWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="10#" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tenWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.tenWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="11#" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.elevenWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.elevenWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column label="12#" show-overflow-tooltip width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.twelveWell" :disabled="!isRedact" size="small" v-if="scope.row.parameter === '外观' || scope.row.parameter === '密封性能' || scope.row.parameter === '跌落性能'">
              <el-option value="合格">合格</el-option>
              <el-option value="不合格">不合格</el-option>
            </el-select>
            <el-input v-model="scope.row.twelveWell" :disabled="!isRedact" size="small" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column width="70" fixed="right">
          <template slot-scope="scope">
            <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row, scope.$index)" :disabled="!isRedact" v-if="scope.row.parameter === '外观'" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages.currPage"
        :page-size="pages.pageSize"
        layout="prev, pager, next, jumper"
        :total="pages.totalCount">
      </el-pagination>
    </el-card>
    <el-card class="secondcard">
      <div style="font-weight:bold;">异常事项</div>
      <el-input type="textarea" v-model="Textareas" :disabled="!isRedact" style="width:100%; margin:10px 0;"></el-input>
    </el-card>
  </div>
</template>

<script>
import {dateFormat} from '@/net/validate'
import { BOTTLE_API } from '@/api/api'
export default {
  name: 'qualityTest',
  data () {
    return {
      loading: false,
      formHeader: {
        orderNo: this.$store.state.common.Bottle.orderNo,
        materialCode: '',
        materialName: ''
      },
      pages: {
        currPage: 1,
        pageSize: 8,
        totalCount: 0
      },
      isRedact: false,
      dataList: [],
      orderId: this.$store.state.common.bottle.ProOrderId,
      Textareas: '',
      paramList: ['外观', '瓶高(mm)', '瓶口内径(mm)', '重量(g)', '满口容量(ml)', '密封性能', '跌落性能', '垂直度']
    }
  },
  mounted () {
    this.GetHeader()
  },
  methods: {
    GetHeader () {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD}`, 'POST', {orderId: this.orderId, type: 'quality'}).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.headInfo
          this.GetList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GetList () {
      this.pages.orderId = this.orderId
      this.$http(`${BOTTLE_API.BOTTLE_QUALITY_LIST}`, 'POST', this.pages).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.qualityInspectionList.list
          if (this.dataList.length !== 0) {
            this.Textareas = this.dataList[0].abnormal
          }
          this.pages.currPage = data.qualityInspectionList.currPage
          this.pages.pageSize = data.qualityInspectionList.pageSize
          this.pages.totalCount = data.qualityInspectionList.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    AddRow () {
      let dataList = this.dataList.filter(item => { return item.delFlag === '0' })
      let dateNow = dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
      if (dataList.length === 0) {
        this.paramList.map(item => {
          let argument = ''
          if (item === '外观' || item === '密封性能' || item === '跌落性能') {
            argument = '合格'
          }
          this.dataList.push({
            id: '',
            parameter: item,
            date: dateNow,
            oneWell: argument,
            twoWell: argument,
            threeWell: argument,
            fourWell: argument,
            fiveWell: argument,
            sixWell: argument,
            sevenWell: argument,
            eightWell: argument,
            nineWell: argument,
            tenWell: argument,
            elevenWell: argument,
            twelveWell: argument,
            delFlag: '0'
          })
        })
      } else {
        let NewList = dataList.slice(0, 9)
        NewList.map((item, index) => {
          if (index < 8) {
            this.dataList.splice(index, 0, {
              id: '',
              parameter: item.parameter,
              date: dateNow,
              oneWell: item.oneWell,
              twoWell: item.twoWell,
              threeWell: item.threeWell,
              fourWell: item.fourWell,
              fiveWell: item.fiveWell,
              sixWell: item.sixWell,
              sevenWell: item.sevenWell,
              eightWell: item.eightWell,
              nineWell: item.nineWell,
              tenWell: item.tenWell,
              elevenWell: item.elevenWell,
              twelveWell: item.twelveWell,
              delFlag: '0'
            })
          }
        })
        console.log(this.dataList)
      }
      // this.loading = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pages.currPage = val
      this.GetList()
    },
    savedOrSubmitForm (str) {
      this.dataList.map(item => {
        item.status = str
        item.orderId = this.orderId
        item.abnormal = this.Textareas
      })
      this.$http(`${BOTTLE_API.BOTTLE_QUALITY_SAVE}`, 'POST', this.dataList).then(({data}) => {
        if (data.code === 0) {
          if (data.code === 0) {
            this.$notify({title: '成功', message: '保存成功', type: 'success'})
            this.pages.currPage = 1
            this.isRedact = false
            this.GetHeader()
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    DelRow (row, index) {
      this.$confirm('正在执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let is = index
        while (is < index + 8) {
          this.dataList[is].delFlag = '1'
          is++
        }
      })
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
.bottom {
  border-bottom: 1px solid #D8D8D8;
  width: 150px;
  overflow: hidden; text-overflow:ellipsis; white-space:nowrap;
}
</style>
