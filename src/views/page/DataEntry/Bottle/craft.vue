<template>
  <div class="header_main">
    <el-card class="searchCards newCard">
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
          <template style="float:right;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Bottle-index'})">返回</el-button>
            <el-button type="primary" class="button" v-if="isAuth('bottle:workshop:techProductParameterSave')" size="small" @click="isRedact = !isRedact" >{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right;">
            <el-button type="primary" size="small" v-if="isAuth('bottle:workshop:techProductParameterSave')" @click="savedOrSubmitForm('saved')" >保存</el-button>
            <!-- <el-button type="primary" size="small" @click="savedOrSubmitForm('submit')" >提交</el-button> -->
          </template>
        </el-form-item>
      </el-form>
    </el-card>
    <el-tabs @tab-click='tabClick' ref='tabs' v-model="activeName" type="border-card" class="NewDaatTtabs secondcard">
      <el-tab-pane name="1" label="产品参数">
        <el-row>
          <el-col style="float:right">
            <el-button type="primary" :disabled="!isRedact" @click="AddProductRow" size="small" style="float:right">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="productList" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="产品参数" show-overflow-tooltip width="85" prop="parameter"></el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">
              <el-date-picker type="datetime" v-model="scope.row.time" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="width:180px" placeholder="请选择日期" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="1#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.oneWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="2#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.twoWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="3#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.threeWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="4#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fourWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="5#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fiveWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="6#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sixWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="7#" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sevenWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="8#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.eightWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="9#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nineWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="10#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.tenWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="11#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.elevenWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="12#" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.twelveWell" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="70" fixed="right">
            <template slot-scope="scope">
              <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row, 1, scope.$index)" :disabled="!isRedact" v-if="scope.row.parameter === '拉伸角度'" size="mini">删除</el-button>
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
      </el-tab-pane>
      <el-tab-pane name="2" label="设备数据">
        <el-row>
          <el-col style="float:right">
            <el-button type="primary" :disabled="!isRedact" @click="AddEquipmentRow" size="small" style="float:right">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="equipmentList" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">
              <el-date-picker type="datetime" v-model="scope.row.date" :disabled="!isRedact" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="width:180px" placeholder="请选择日期" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="电压V" >
            <template slot-scope="scope">
              <el-input type="text" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="scope.row.voltage" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="电流A">
            <template slot-scope="scope">
              <el-input onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" v-model.number="scope.row.current" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="高压气压力Mpa">
            <template slot-scope="scope">
              <el-input v-model="scope.row.highPressure" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="低压气压力Mpa">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lowPressure" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="冷水机1进水温度(°C)" width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.oneInletWaterTemp" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="冷水机2进水温度(°C)" width="160">
            <template slot-scope="scope">
              <el-input v-model="scope.row.twoInletWaterTemp" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="70" fixed="right">
            <template slot-scope="scope">
              <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row,2)" :disabled="!isRedact" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="3" label="加温参数">
        <el-row>
          <el-col style="float:right">
            <el-button type="primary" :disabled="!isRedact" @click="AddWarmingRow" size="small" style="float:right">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="warmingList" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="时间" width="200">
            <template slot-scope="scope">
              <el-date-picker type="datetime" v-model="scope.row.date" :disabled="!isRedact" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" style="width:180px" placeholder="请选择日期" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="前1" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeOne" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前2" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeTwo" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前3" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeThree" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前4" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeFour" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前5" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeFive" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前6" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeSix" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前7" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeSevev" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前8" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.beforeEight" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后1" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterOne" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后2" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterTwo" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后3" show-overflow-tooltip :disabled="!isRedact" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterThree" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后4" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterFour" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后5" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterFive" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后6" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterSix" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后7" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterSeven" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="后8" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.afterEight" :disabled="!isRedact" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="70" fixed="right">
            <template slot-scope="scope">
              <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row,3)" :disabled="!isRedact" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {dateFormat} from '@/net/validate'
import { BOTTLE_API } from '@/api/api'
export default {
  name: 'qualityTest',
  data () {
    return {
      formHeader: {
        orderNo: this.$store.state.common.Bottle.orderNo,
        materialCode: '',
        materialName: ''
      },
      pages: {
        currPage: 1,
        pageSize: 5,
        totalCount: 0
      },
      isRedact: false,
      activeName: '1',
      orderId: this.$store.state.common.bottle.ProOrderId,
      productList: [],
      equipmentList: [],
      warmingList: [],
      paramList: ['拉伸角度', '预吹角度', '主吹角度', '回收角度', '排气角度']
    }
  },
  mounted () {
    this.GetHeader()
  },
  methods: {
    GetHeader () {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD}`, 'POST', {orderId: this.orderId, type: 'craft'}).then(({data}) => {
        if (data.code === 0) {
          this.formHeader = data.headInfo
          this.GetProductList()
          this.GetEquipmentList()
          this.GetWarmingList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GetProductList () {
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_PRODUCT_LIST}`, 'POST', {orderId: this.orderId, pageSize: this.pages.pageSize, currPage: this.pages.currPage, totalCount: this.pages.totalCount}).then(({data}) => {
        if (data.code === 0) {
          this.productList = data.techProductParameterList.list
          this.pages.totalCount = data.techProductParameterList.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GetEquipmentList () {
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_EQUIPMENT_LIST}`, 'POST', {orderId: this.orderId}).then(({data}) => {
        if (data.code === 0) {
          this.equipmentList = data.techMachineList.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    GetWarmingList () {
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_WARMING_LIST}`, 'POST', {orderId: this.orderId}).then(({data}) => {
        if (data.code === 0) {
          this.warmingList = data.techTempParameterList.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    AddProductRow () {
      let productList = this.productList.filter(item => { return item.delFlag === '0' })
      let dateNow = dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
      if (productList.length === 0) {
        this.paramList.map(item => {
          this.productList.push({
            id: '',
            parameter: item,
            time: dateNow,
            oneWell: '',
            twoWell: '',
            threeWell: '',
            fourWell: '',
            fiveWell: '',
            sixWell: '',
            sevenWell: '',
            eightWell: '',
            nineWell: '',
            tenWell: '',
            elevenWell: '',
            twelveWell: '',
            delFlag: '0'
          })
        })
      } else {
        // let NewList = productList.slice((productList.length - 5))
        let NewList = productList.slice(0, 6)
        NewList.map((item, index) => {
          if (index < 5) {
            this.productList.splice(index, 0, {
              id: '',
              parameter: item.parameter,
              time: dateNow,
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
      }
    },
    AddEquipmentRow () {
      let NewequipmentList = this.equipmentList.filter(item => { return item.delFlag === '0' })
      this.equipmentList.unshift({
        id: '',
        date: dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
        voltage: NewequipmentList.length > 0 ? NewequipmentList[0].voltage : '',
        current: NewequipmentList.length > 0 ? NewequipmentList[0].current : '',
        highPressure: NewequipmentList.length > 0 ? NewequipmentList[0].highPressure : '',
        lowPressure: NewequipmentList.length > 0 ? NewequipmentList[0].lowPressure : '',
        oneInletWaterTemp: NewequipmentList.length > 0 ? NewequipmentList[0].oneInletWaterTemp : '',
        twoInletWaterTemp: NewequipmentList.length > 0 ? NewequipmentList[0].twoInletWaterTemp : '',
        delFlag: '0'
      })
    },
    AddWarmingRow () {
      let NewarmingList = this.warmingList.filter(item => { return item.delFlag === '0' })
      this.warmingList.unshift({
        id: '',
        date: dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
        beforeOne: NewarmingList.length > 0 ? NewarmingList[0].beforeOne : '',
        beforeTwo: NewarmingList.length > 0 ? NewarmingList[0].beforeTwo : '',
        beforeThree: NewarmingList.length > 0 ? NewarmingList[0].beforeThree : '',
        beforeFour: NewarmingList.length > 0 ? NewarmingList[0].beforeFour : '',
        beforeFive: NewarmingList.length > 0 ? NewarmingList[0].beforeFive : '',
        beforeSix: NewarmingList.length > 0 ? NewarmingList[0].beforeSix : '',
        beforeSevev: NewarmingList.length > 0 ? NewarmingList[0].beforeSevev : '',
        beforeEight: NewarmingList.length > 0 ? NewarmingList[0].beforeEight : '',
        afterOne: NewarmingList.length > 0 ? NewarmingList[0].afterOne : '',
        afterTwo: NewarmingList.length > 0 ? NewarmingList[0].afterTwo : '',
        afterThree: NewarmingList.length > 0 ? NewarmingList[0].afterThree : '',
        afterFour: NewarmingList.length > 0 ? NewarmingList[0].afterFour : '',
        afterFive: NewarmingList.length > 0 ? NewarmingList[0].afterFive : '',
        afterSix: NewarmingList.length > 0 ? NewarmingList[0].afterSix : '',
        afterSeven: NewarmingList.length > 0 ? NewarmingList[0].afterSeven : '',
        afterEight: NewarmingList.length > 0 ? NewarmingList[0].afterEight : '',
        delFlag: '0'
      })
    },
    tabClick () {
    },
    // 删除
    DelRow (row, type, index = null) {
      this.$confirm('正在执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 1) {
          // 一次删5条
          let is = index
          while (is < index + 5) {
            this.productList[is].delFlag = '1'
            is++
          }
        } else {
          if (row.id === '') {
            if (type === 2) {
              this.equipmentList.splice(this.equipmentList.indexOf(row), 1)
            } else {
              this.warmingList.splice(this.warmingList.indexOf(row), 1)
            }
          } else {
            row.delFlag = '1'
          }
        }
      })
    },
    //  RowDelFlag
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    savedOrSubmitForm (str) {
      let net0 = new Promise((resolve, reject) => {
        this.SaveProduct(str, resolve, reject)
      })
      let net1 = new Promise((resolve, reject) => {
        this.Savequipment(str, resolve, reject)
      })
      let net2 = new Promise((resolve, reject) => {
        this.Savewarming(str, resolve, reject)
      })
      // let net3 = new Promise((resolve, reject) => {
      //   this.SaveHeader(str, resolve, reject)
      // })
      Promise.all([net0, net1, net2]).then(() => {
        this.$notify({title: '成功', message: '保存成功', type: 'success'})
        this.pages.currPage = 1
        this.GetHeader()
        this.isRedact = false
      }).catch((err) => {
        this.$notify.error({title: '错误', message: err})
      })
    },
    SaveProduct (str, resolve, reject) {
      this.productList.map(item => {
        item.status = str
        item.orderId = this.orderId
      })
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_PRODUCT_SAVE}`, 'POST', this.productList).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('产品参数' + data.msg)
          }
        }
      })
    },
    Savequipment (str, resolve, reject) {
      this.equipmentList.map(item => {
        item.status = str
        item.orderId = this.orderId
      })
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_EQUIPMENT_SAVE}`, 'POST', this.equipmentList).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('设备数据' + data.msg)
          }
        }
      })
    },
    Savewarming (str, resolve, reject) {
      this.warmingList.map(item => {
        item.status = str
        item.orderId = this.orderId
      })
      this.$http(`${BOTTLE_API.BOTTLE_CRAFT_WARMING_SAVE}`, 'POST', this.warmingList).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('加温参数' + data.msg)
          }
        }
      })
    },
    SaveHeader (str, resolve, reject) {
      this.$http(`${BOTTLE_API.BOTTLE_PRO_HEAD_UPDATE}`, 'POST', {orderId: this.orderId, type: 'craft'}).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('头部数据' + data.msg)
          }
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pages.currPage = val
      this.GetProductList()
    }
    // GetPageProductList () {
    //   this.PageProductList = this.productList.slice((this.pages.currPage - 1) * this.pages.pageSize, (this.pages.currPage - 1) * this.pages.pageSize + this.pages.pageSize)
    // }
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
