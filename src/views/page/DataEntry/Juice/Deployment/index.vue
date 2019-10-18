<template>
  <div class="header_main">
    <el-card class="searchCard searchCards">
      <el-row>
        <el-form :model="formHeader" :inline="true" size="small" label-width="70px" class="multi_row">
          <el-form-item label="生产工厂：">
            <el-select v-model="formHeader.factory" placeholder="请选择" class="width150px">
              <el-option value="">请选择</el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产车间：">
            <el-select v-model="formHeader.workShop" palceholder="请选择" class="width150px">
              <el-option value="">请选择</el-option>
              <el-option v-for="(item, index) in workshop" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生产日期：">
            <el-date-picker v-model="formHeader.allocateDate" type="date" placeholder="请选择" style="width:150px" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="调配单号：">
            <el-input v-model="formHeader.orderNo" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item class="floatr" style="width:290px">
            <template style="float:right;">
              <el-button type="primary" size="small" v-if="isAuth('ste:allocate:allocateList')" @click="SearchList">查询</el-button>
              <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="isAuth('ste:allocate:allocateUpdate')">{{isRedact?'取消':'编辑'}}</el-button>
            </template>
            <template v-if="isRedact" style="float:right;">
              <el-button type="primary" size="small" @click="SavedForm()">保存</el-button>
              <el-button type="primary" size="small" @click="SubmitForm()">提交</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
    <div class="secondcard" style="padding-top:0">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-card>
        <el-table :data="dataList" @selection-change="handleSelectionChange" border header-row-class-name="tableHead">
          <el-table-column type="selection" width="35" :selectable="CheckBoxInit"></el-table-column>
          <el-table-column label="状态" width="90" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span :style="{'color' : scope.row.status === '审核不通过' ? 'red' : scope.row.status === '审核通过' ? '#7ED321' : ''}">{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="调配单号" prop="orderNo" width="130"></el-table-column>
          <el-table-column label="生产车间" prop="workShopName" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="调配单日期" prop="allocateDate" width="110" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="杀菌物料" width="190" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{scope.row.materialCode}}{{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="计划BL原汁总量" prop="planAmount"></el-table-column>
          <el-table-column label="BL原汁总量" prop="blAmount"></el-table-column>
          <el-table-column label="单位" prop="unit" width="50"></el-table-column>
          <el-table-column width="130">
            <template slot="header">
              <i class="reqI">*</i> 调配罐
            </template>
            <template slot-scope="scope">
              <el-select v-model="scope.row.holderId" size="small" :disabled="!isRedact">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in holderList" :key="index" :label="item.holderName" :value="item.holderId"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="170">
            <template slot="header">
              <i class="reqI">*</i> 调配日期
            </template>
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.allocateTime" :disabled="!isRedact" type="date" placeholder="请选择" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:150px" size="small"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="调配单备注" prop="remark" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="创建人员" prop="creator" width="150"></el-table-column>
          <el-table-column label="创建时间" prop="created" width="170"></el-table-column>
          <el-table-column label="调配人员" prop="changer" width="150"></el-table-column>
          <el-table-column label="调配时间" prop="changed" width="170"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="ShowDetail(scope.row)" size="small">调配</el-button>
              <el-button type="primary" @click="AddRecord(scope.row)" size="small">记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.currentTotal">
        </el-pagination>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="1000px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">调配列表</div>
      <el-table :data="ItemList" border header-row-class-name="tableHead">
        <el-table-column label="物料" :show-overflow-tooltip="true" width="180">
          <template slot-scope="scope">
            {{scope.row.materialCode}} {{scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="订单单位" width="80" prop="unit"></el-table-column>
        <el-table-column label="计划领料" prop="planAmount" width="80"></el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button type="text" :disabled="SplitStatus(scope.row)" @click="SplitDate(scope.row, scope.$index)"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
          </template>
        </el-table-column>
        <el-table-column label="罐号" prop="productDate" width="150" >
          <template slot-scope="scope">
            <el-select v-model="scope.row.holderId" size="small" @change="changeH(scope.row)" disabled>
              <el-option value=''>请选择</el-option>
              <el-option v-for="(item, index) in thrwHolderList" :key="index" :label="item.holderName" :value="item.holderId"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="类别" :show-overflow-tooltip="true" width="80" >
          <template slot-scope="scope">
            {{scope.row.category}}
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template slot="header">
            <i class="reqI">*</i> 实际领料
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.receiveAmount" :disabled="SplitStatuss(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="130">
          <template slot="header">
            <i class="reqI">*</i> 批次
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.batch" maxlength="10" :disabled="SplitStatuss(scope.row)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" :disabled="!(lineStatus !== '已提交' && lineStatus !== '审核通过' && isRedact !== false)" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="scope.row.isSplit === '0' || lineStatus === '已提交' || lineStatus === '审核通过' || isRedact === false || scope.row.status === 'checked' || scope.row.status === 'submit'"  @click="DelOrderNo(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <template>
          <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="SaveSplit()" size="small" :disabled="!(lineStatus !== '已提交' && lineStatus !== '审核通过' && isRedact !== false)">确 定</el-button>
        </template>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="RecordDialogTableVisible" width="400px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">记录</div>
      <el-form :model="record" size="small" label-width="130px" :rules="recordrules" ref="record">
        <el-form-item label="搅罐时间：" prop="stirringTime">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择" v-model="record.stirringTime" size="small" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-date-picker>
        </el-form-item>
        <el-form-item label="送样时间：" prop="sampleTime">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择" v-model="record.sampleTime" size="small" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-date-picker>
        </el-form-item>
        <el-form-item label="一次性合格：" prop="oneOffSuc">
          <el-select v-model="record.oneOffSuc" filterable class="width220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) of oneOffSucList" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不合格原因：">
          <el-select v-model="record.nonReasons" filterable class="width220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) of nonReasonsList" :key="index" :value="item.code" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不合格调整分类：">
          <el-select v-model="record.nonReasonClass" filterable class="width220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) of nonReasonClassList" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整数量（方）：">
          <el-input v-model="record.adjustAmount" style="width:220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-input>
        </el-form-item>
        <el-form-item label="调前米数：">
          <el-input v-model="record.beforeMet" style="width:220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-input>
        </el-form-item>
        <el-form-item label="调后米数：">
          <el-input v-model="record.afterMet" style="width:220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-input>
        </el-form-item>
        <el-form-item label="合格时间：">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" placeholder="选择" v-model="record.qualTime" size="small" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'"></el-date-picker>
        </el-form-item>
        <el-form-item label="白班操作人：">
          <el-select v-model="record.dayOperator" filterable class="width220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) of userList" :key="index" :value="item.realName+`(${item.userName})`" :label="item.realName+`(${item.userName})`"></el-option>
          </el-select>
        </el-form-item><el-form-item label="夜班操作人：">
          <el-select v-model="record.nightOperator" filterable class="width220px" :disabled="!isRedact || this.soleRowstatus === '已提交' || this.soleRowstatus === '审核通过'">
            <el-option value=''>请选择</el-option>
            <el-option v-for="(item, index) of userList" :key="index" :value="item.realName+`(${item.userName})`" :label="item.realName+`(${item.userName})`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <template>
          <el-button @click="RecordDialogTableVisible = false" size="small" >取 消</el-button>
          <el-button type="primary" @click="RecordSave('record')" size="small" :disabled="!(this.soleRowstatus !== '已提交' && this.soleRowstatus !== '审核通过' && isRedact !== false)">确 定</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {headanimation, dateFormat} from '@/net/validate'
import {BASICDATA_API, STERILIZED_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'JuiceDeployment',
  data () {
    return {
      RecordDialogTableVisible: false,
      recordrules: {
        stirringTime: [
          { required: true, message: '请选择搅罐时间', trigger: 'blur' }
        ],
        sampleTime: [
          { required: true, message: '请选择送样时间', trigger: 'blur' }
        ],
        oneOffSuc: [
          { required: true, message: '请选择一次性合格', trigger: 'blur' }
        ]
      },
      record: {},
      soleRowstatus: '',
      oneOffSucList: ['是', '否'],
      nonReasonsList: ['氨氮高', '盐高', '氨氮低', '盐低'],
      nonReasonClassList: ['原汁', '水', '盐水'],
      formHeader: {
        factory: '',
        workShop: '',
        orderNo: ''
      },
      pages: {
        currentTotal: 0, // 总条数
        currentPage: 1, // 当前页数
        pageSize: 10
      },
      factory: [],
      workshop: [],
      isRedact: false,
      dataList: [],
      dialogTableVisible: false,
      ItemList: [],
      materialName: '',
      orderTypeSign: '',
      multipleSelection: [],
      holderList: [],
      lineStatus: '',
      thrwHolderList: [],
      userList: [],
      strList: [],
      strList1: [],
      strList2: []
    }
  },
  mounted () {
    headanimation(this.$)
    this.Getdeptcode()
    this.GetUserList()
    this.GetHolderStatusList()
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.Getdeptbyid(n)
      this.GetHolderList(n)
    },
    'formHeader.workShop' (n, o) {
      this.dataList = []
      this.ThrowHolder(n)
    }
  },
  methods: {
    IsGuanStatus (row) {
      return (row.materialName.indexOf('原汁') === -1 || !(this.lineStatus !== '已提交' && this.lineStatus !== '审核通过' && this.isRedact !== false && row.status !== 'submit' && row.status !== 'checked'))
    },
    changeH (row) {
      if (row.holderId) {
        if (this.thrwHolderList.filter(item => item.holderId === row.holderId).length > 0) {
          row.category = this.thrwHolderList.filter(item => item.holderId === row.holderId)[0].type
        } else {
          this.$warning_SHINHO('BOOM物料对应批次所需的原汁罐号不存在')
        }
      }
    },
    // 获取不合格原因
    GetHolderStatusList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {type: 'reason_yznopass'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.nonReasonsList = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取工厂
    Getdeptcode () {
      this.workshop = []
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formHeader.workShop = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '杀菌'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length > 0) {
              this.formHeader.workShop = data.typeList[0].deptId
            } else {
              this.formHeader.workShop = ''
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.workshop = []
      }
    },
    // 获取罐
    GetHolderList (id) {
      this.$http(`${STERILIZED_API.JUICEDEPLOYMENTHOLDER}`, 'POST', {factory: id}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.holderList = data.holderList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ThrowHolder (id) {
      this.thrwHolderList = []
      if (id) {
        let params = {
          factory: this.formHeader.factory,
          workShop: id,
          code: '013'
        }
        this.$http(`${STERILIZED_API.SEMIFINISHEDPRODUCTHROWHOLDER}`, 'POST', params, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.thrwHolderList = data.holderList
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 查询
    SearchList () {
      if (this.formHeader.factory === '') {
        this.$notify({title: '警告', message: '请选择工厂', type: 'warning'})
        return false
      }
      this.ThrowHolder(this.formHeader.workShop)
      this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSEARCHLIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataListAll = data.orderInfo
          this.dataListAll.map((item) => {
            if (item.allocateTime === '' || item.allocateTime === null) {
              item.allocateTime = dateFormat(new Date(), 'yyyy-MM-dd')
            }
          })
          this.pages.currentTotal = this.dataListAll.length
          this.pages.currentPage = 1
          this.dataList = this.dataListAll.slice((this.pages.currentPage - 1) * this.pages.pageSize, this.pages.currentPage * this.pages.pageSize)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ShowDetail (row) {
      // row.id = 'C57A2AE171024496AD26B0BEE8B0ACAD'
      this.materialName = row.materialName
      this.$http(`${STERILIZED_API.JUICEDEPLOYMENTITEMS}`, 'POST', {orderNo: row.id, factory: this.formHeader.factory, sign: 'oldMethod'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.ItemList = data.info
          this.ItemList.map((item) => {
            this.changeH(item)
            if (item.receiveAmount === '' || !item.receiveAmount) {
              item.receiveAmount = item.planAmount
            }
          })
          this.dialogTableVisible = true
          this.lineStatus = row.status
          this.ID = row.id
          this.orderTypeSign = data.orderTypeSign
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 拆分
    SplitDate (row, index) {
      this.ItemList.splice(index + 1, 0, {
        materialName: row.materialName,
        materialCode: row.materialCode,
        unit: row.unit,
        planAmount: row.planAmount,
        holderId: '',
        receiveAmount: '',
        batch: '',
        remark: '',
        isSplit: 1
      })
    },
    SaveSplit () {
      let batchList = []
      let ty = true
      for (let item of this.ItemList) {
        batchList.push(item.batch)
        item.ID = this.ID
        if (!item.receiveAmount || item.receiveAmount === '') {
          this.$warning_SHINHO('请填写实际领料')
          return false
        }
        if (!item.batch || item.batch === '') {
          this.$warning_SHINHO('请填写批次')
          return false
        }
        if (item.batch.length !== 10) {
          this.$warning_SHINHO('批次应为10位')
          return false
        }
        if (item.materialName.indexOf('原汁') !== -1 && (item.holderId === '' || !item.holderId)) {
          this.$warning_SHINHO('原汁物料需选择罐号')
          return false
        }
        if (this.orderTypeSign === '1' && item.holderId && this.thrwHolderList.filter(it => item.holderId === it.holderId)[0].isRdSign !== '1') {
          ty = false
        }
        // if (/六月鲜/g.test(this.materialName)) {
        //   if (/味极鲜/g.test(item.category)) {
        //     this.$message.error('领用原汁与生产物料不匹配！无法保存，无法操作')
        //     return false
        //   }
        // }
      }
      if (new Set(batchList).size !== batchList.length) {
        this.$warning_SHINHO('批次不能重复')
        return false
      }
      if (ty) {
        this.$http(`${STERILIZED_API.JUICEDEPLOYMENTITEMSAVE}`, 'POST', {'tiaoHolder': this.dataList, 'params': this.ItemList}).then(({data}) => {
          if (data.code === 0) {
            this.$notify({title: '成功', message: '保存成功', type: 'success'})
            this.SearchList()
            // this.ThrowHolder(this.formHeader.workShop)
            this.dialogTableVisible = false
          } else {
            if (data.mes.length === 0) {
              this.$error_SHINHO(data.msg)
            } else {
              this.$error_SHINHO(data.mes.join(','))
            }
          }
        })
      } else {
        this.$confirm(`领用原汁非R&D原汁，请确认！`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(`${STERILIZED_API.JUICEDEPLOYMENTITEMSAVE}`, 'POST', {'tiaoHolder': this.dataList, 'params': this.ItemList}).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.SearchList()
              // this.ThrowHolder(this.formHeader.workShop)
              this.dialogTableVisible = false
            } else {
              if (data.mes.length === 0) {
                this.$error_SHINHO(data.msg)
              } else {
                this.$error_SHINHO(data.mes.join(','))
              }
            }
          })
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    SavedForm () {
      if (this.multipleSelection.length === 0) {
        this.$warning_SHINHO('请勾选数据')
      } else {
        let st = 0
        this.multipleSelection.map((item) => {
          if (item.status === '已生成') {
            st = 1
            return false
          }
        })
        if (st === 1) {
          let str = ''
          this.strList = []
          this.strList1 = []
          this.strList2 = []
          this.multipleSelection.forEach((item) => {
            if (item.sbList === null) {
              this.strList.push(item.orderNo)
            } else {
              item.sbList.map((items) => {
                if (items.cDay === null) {
                  this.strList.push(item.orderNo)
                } else if (items.cDay === -999) {
                  this.strList1.push(`${items.yzHolderName},${items.batch}`)
                }
                if (items.cDay * 1 < 6) {
                  this.strList2.push(`${items.yzHolderName},${items.batch}`)
                }
              })
            }
          })
          if (this.strList.length !== 0) {
            this.$confirm(`请先保存调配单${this.strList.join(',')}的调配详情信息?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {})
            return false
          }
          if (this.strList1.length !== 0) {
            this.$confirm(`请先确认${this.strList1.join(',')}批次原汁有库存?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {})
            return false
          }
          if (this.strList2.length !== 0) {
            str = this.strList2.join(',')
          }
          // this.multipleSelection.forEach((item) => {
          //   if (item.cDay === null) {
          //     this.$confirm(`请先保存调配单${item.orderNo}的调配详情信息?`, '提示', {
          //       confirmButtonText: '确定',
          //       cancelButtonText: '取消',
          //       type: 'warning'
          //     }).then(() => {})
          //     st = true
          //   } else if (item.cDay === -999) {
          //     this.$confirm(`请确认${item.yzHolderName}，${item.batch}批次原汁有库存?`, '提示', {
          //       confirmButtonText: '确定',
          //       cancelButtonText: '取消',
          //       type: 'warning'
          //     }).then(() => {})
          //     st = true
          //   } else if (item.cDay * 1 < 6) {
          //     str += `${item.yzHolderName}，${item.batch}批次原汁，沉淀天数不足，是否确认使用？`
          //   }
          // })
          if (str.length > 0) {
            this.$confirm(`${str}批次原汁，沉淀天数不足，是否确认使用？`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.multipleSelection.forEach((item) => {
                item.status = '已调配'
              })
              this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSAVE}`, 'POST', this.multipleSelection).then(({data}) => {
                if (data.code === 0) {
                  this.$notify({title: '成功', message: '保存成功', type: 'success'})
                  this.isRedact = false
                  this.SearchList()
                } else {
                  this.$notify.error({title: '错误', message: data.msg})
                }
              })
            })
          } else {
            this.multipleSelection.forEach((item) => {
              item.status = '已调配'
            })
            this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSAVE}`, 'POST', this.multipleSelection).then(({data}) => {
              if (data.code === 0) {
                this.$notify({title: '成功', message: '保存成功', type: 'success'})
                this.isRedact = false
                this.SearchList()
              } else {
                this.$notify.error({title: '错误', message: data.msg})
              }
            })
          }
        } else {
          this.multipleSelection.forEach((item) => {
            item.status = '已调配'
          })
          this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSAVE}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.isRedact = false
              this.SearchList()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        }
      }
    },
    SubmitForm () {
      if (this.multipleSelection.length === 0) {
        this.$warning_SHINHO('请勾选数据')
        return false
      }
      for (let item of this.multipleSelection) {
        if (item.isUpdate === false) {
          this.$warning_SHINHO('请先保存调配详情信息（调配单：' + item.orderNo + '）')
          return false
        }
        if (!item.holderId || !item.allocateTime || item.holderId === '' || item.allocateTime === '') {
          this.$warning_SHINHO('请填写必填项')
          return false
        }
      }
      // let str = ''
      // let st = false
      // this.multipleSelection.forEach((item) => {
      //   if (item.cDay === null) {
      //     this.$confirm(`请先保存调配单${item.orderNo}的调配详情信息?`, '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {})
      //     st = true
      //   } else if (item.cDay * 1 < 6) {
      //     str += `${item.yzHolderName}，${item.batch}批次原汁，沉淀天数不足，是否确认使用？`
      //   }
      // })
      // if (st) {
      //   return false
      // }
      let str = ''
      this.strList = []
      this.strList1 = []
      this.strList2 = []
      this.multipleSelection.forEach((item) => {
        if (item.sbList === null) {
          this.strList.push(item.orderNo)
        } else {
          item.sbList.map((items) => {
            if (items.cDay === null) {
              this.strList.push(item.orderNo)
            } else if (items.cDay === -999) {
              this.strList1.push(`${items.yzHolderName},${items.batch}`)
            }
            if (items.cDay * 1 < 6) {
              this.strList2.push(`${items.yzHolderName},${items.batch}`)
            }
          })
        }
      })
      if (this.strList.length !== 0) {
        this.$confirm(`请先保存调配单${this.strList.join(',')}的调配详情信息?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {})
        return false
      }
      if (this.strList1.length !== 0) {
        this.$confirm(`请先确认${this.strList1.join(',')}批次原汁有库存?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {})
        return false
      }
      if (this.strList2.length !== 0) {
        str = this.strList2.join(',')
      }
      if (str.length > 0) {
        // this.$confirm(str > 0 ? str : '确认要提交数据吗?', '提示', {
        this.$confirm(`${str}批次原汁，沉淀天数不足，是否确认使用？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSAVE}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSUBMIT}`, 'POST', this.multipleSelection).then(({data}) => {
                if (data.code === 0) {
                  this.$notify({title: '成功', message: '提交成功', type: 'success'})
                  this.isRedact = false
                  this.SearchList()
                } else {
                  this.$notify.error({title: '错误', message: data.msg})
                }
              })
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        })
      } else {
        this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSAVE}`, 'POST', this.multipleSelection).then(({data}) => {
          if (data.code === 0) {
            this.$http(`${STERILIZED_API.JUICEDEPLOYMENTSUBMIT}`, 'POST', this.multipleSelection).then(({data}) => {
              if (data.code === 0) {
                this.$notify({title: '成功', message: '提交成功', type: 'success'})
                this.isRedact = false
                this.SearchList()
              } else {
                this.$notify.error({title: '错误', message: data.msg})
              }
            })
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 复选框初始状态
    CheckBoxInit (row, index) {
      if (this.isRedact === false || row.status === '已提交' || row.status === '审核通过') {
        return 0
      } else {
        return 1
      }
    },
    handleSizeChange (val) {
      this.pages.pageSize = val
    },
    handleCurrentChange (val) {
      this.pages.currentPage = val
      this.dataList = this.dataListAll.slice((this.pages.currentPage - 1) * this.pages.pageSize, this.pages.currentPage * this.pages.pageSize)
    },
    // 删除
    DelOrderNo (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ItemList.splice(this.ItemList.indexOf(row), 1)
      })
    },
    SplitStatus (row) {
      if (row.materialName.indexOf('原汁') === -1) {
        return (this.lineStatus === '已提交' || this.lineStatus === '审核通过' || this.isRedact === false || row.status === 'submit' || row.status === 'checked')
      } else {
        return true
      }
    },
    SplitStatuss (row) {
      if (row.materialName.indexOf('原汁') === -1) {
        return (!(this.lineStatus !== '已提交' && this.lineStatus !== '审核通过' && this.isRedact !== false && row.status !== 'submit' && row.status !== 'checked'))
      } else {
        return true
      }
    },
    GetUserList () {
      this.$http(`${STERILIZED_API.JUICEDUSERLIST}`, 'POST', {deptName: '原汁组'}).then(({data}) => {
        if (data.code === 0) {
          this.userList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    AddRecord (row) {
      this.soleRowstatus = row.status
      this.$http(`${STERILIZED_API.JUICEDLIST}`, 'POST', {aId: row.id}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          if (data.list.length === 1) {
            this.record = {
              aId: row.id,
              adjustAmount: data.list[0].adjustAmount,
              afterMet: data.list[0].afterMet,
              beforeMet: data.list[0].beforeMet,
              dayOperator: data.list[0].dayOperator,
              delFlag: '0',
              id: data.list[0].id,
              nightOperator: data.list[0].nightOperator,
              nonReasonClass: data.list[0].nonReasonClass,
              nonReasons: data.list[0].nonReasons,
              oneOffSuc: data.list[0].oneOffSuc,
              qualTime: data.list[0].qualTime,
              remark: '',
              sampleTime: data.list[0].sampleTime,
              stirringTime: data.list[0].stirringTime
            }
          } else {
            this.record = {
              aId: row.id,
              adjustAmount: '',
              afterMet: '',
              beforeMet: '',
              dayOperator: '',
              delFlag: '0',
              id: '',
              nightOperator: '',
              nonReasonClass: '',
              nonReasons: '',
              oneOffSuc: '',
              qualTime: '',
              remark: '',
              sampleTime: '',
              stirringTime: ''
            }
          }
          this.RecordDialogTableVisible = true
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    RecordSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.record.oneOffSuc === '否') {
            if (this.record.nonReasons === '' || this.record.nonReasonClass === '') {
              this.$notify({title: '警告', message: '请选择不合格原因，不合格调整分类', type: 'warning'})
              return false
            }
          }
          this.$http(`${STERILIZED_API.JUICEDRECORDSAVE}`, 'POST', this.record).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.RecordDialogTableVisible = false
              this.$refs[formName].resetFields()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.dialog__class{
  border-radius:6px 6px 6px 6px !important;
  .el-dialog__header{
    height:59px;
    background:rgba(24,144,255,1);
    border-radius:6px 6px 0px 0px;
    color: #fff;
    font-size:20px;
    .el-dialog__headerbtn .el-dialog__close{
      color: #fff
    }
  }
}
</style>
