<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="header_main">
        <el-card class="newCard">
          <el-row type="flex">
            <el-col>
              <el-form :model="params" size="small" :inline="true" label-position="right" label-width="70px" class="sole_row">
                <el-form-item label="生产工厂：" >
                  <el-select v-model="params.factoryId" style="width:150px" @change="changeOptions('factory')" >
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生产车间：">
                  <el-select v-model="params.workshopId"  style="width:150px" @change="changeOptions('workshop')">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入罐日期：" >
                  <el-date-picker type="date" v-model="params.applyDate" value-format="yyyy-MM-dd" style="width:150px"></el-date-picker>
                </el-form-item>
                <el-form-item class="floatr">
                  <el-button type="primary" size="small"  @click="getOrderList()"  v-if="isAuth('prs:inStorage:list')">查询</el-button>
                  <el-button type="primary" size="small"  @click="setDisabled(!disabled)"  v-if="(isAuth('prs:inStorage:mySaveOrUpdate') || isAuth('prs:inStorage:submitToOrde')) && searched && orderStatus !== 'submit' &&  orderStatus !== 'checked'">{{disabled?'编辑':'返回'}}</el-button>
                  <el-button type="primary" size="small"  @click="doSaveAction()"  v-if="isAuth('prs:inStorage:mySaveOrUpdate') && searched && !disabled && orderStatus !== 'submit' &&  orderStatus !== 'checked'">保存</el-button>
                  <el-button type="primary" size="small"  @click="doSubmitAction()"  v-if="isAuth('prs:inStorage:submitToOrder') && searched && !disabled && orderStatus !== 'submit' &&  orderStatus !== 'checked'">提交</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <el-row v-if="searched" style="margin-top:10px;background-color:#fff;padding-bottom:10px;">
          <el-col :span="5" style="">
            <el-row type="flex" justify="center" style="margin-top:20px">
              <div  class="pot-box">
                <div class="pot-box-header">
                  <span class="pot-box-title" style="margin-left:5px;">原汁罐</span>
                  <span class="pot-box-title" style="float:right;margin-right:5px;">{{isAvailable==='0'? '待入库': '入库中'}}</span>
                </div>
                <div class='pot-box-container img'>
                </div>
                <div class="pot-box-footer">
                  <div class="pot-box-button"  v-if="!disabled && isAvailable === '0' && orderStatus !== 'submit' &&  orderStatus !== 'checked'" @click="inPotStart()">
                    <span class="pot-box-button-title">入罐开始</span>
                  </div>
                  <div class="pot-box-button-disabled"  v-else>
                    <span class="pot-box-button-title-disabled">入罐开始</span>
                  </div>
                  <div class="pot-box-button"  v-if="!disabled && isAvailable === '1' && orderStatus !== 'submit' &&  orderStatus !== 'checked'" @click="inPotEnd()">
                    <span class="pot-box-button-title" >入罐结束</span>
                  </div>
                  <div class="pot-box-button-disabled"  v-else>
                    <span class="pot-box-button-title-disabled" >入罐结束</span>
                  </div>
                </div>
              </div>
            </el-row>
          </el-col>
          <el-col :span="19">
            <el-row  style="margin-top:20px">
              <el-table header-row-class-name="tableHead" :row-class-name="rowDelFlag" :data="dataList" border tooltip-effect="dark" @row-dblclick="modifyRecord" ref='table'>
                <el-table-column label="状态" width='95'>
                  <template slot-scope="scope">
                    <span :style="{'color': scope.row.status === 'noPass'? 'red' : scope.row.status === 'checked'? '#67C23A' : ''}">{{scope.row.status === 'noPass'? '审核不通过':scope.row.status === 'saved'? '已保存':scope.row.status === 'submit' ? '已提交' : scope.row.status === 'checked'? '通过':scope.row.status === '已同步' ? '未录入' : '未录入'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="日期" width='100'>
                  <template slot-scope="scope">
                     {{scope.row.inDate}}
                  </template>
                </el-table-column>
                <el-table-column label="原汁罐号" :show-overflow-tooltip="true" width='120'>
                  <template slot-scope="scope">
                    {{scope.row.potName}}
                  </template>
                </el-table-column>
                <el-table-column label="物料" :show-overflow-tooltip="true" width='120'>
                  <template slot-scope="scope">
                    {{scope.row.materialCode + ' ' + scope.row.materialName}}
                  </template>
                </el-table-column>
                <el-table-column label="原汁批次" width='120' >
                  <template slot-scope="scope">
                    {{scope.row.batch}}
                  </template>
                </el-table-column>
                <el-table-column label="起始数">
                  <template slot-scope="scope">
                    {{scope.row.startAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="结束数">
                  <template slot-scope="scope">
                    {{scope.row.endAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="入罐数量">
                  <template slot-scope="scope">
                    {{scope.row.inAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="满罐数量">
                  <template slot-scope="scope">
                    {{scope.row.fullPotAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="单位">
                  <template slot-scope="scope">
                    {{scope.row.unit}}
                  </template>
                </el-table-column>
                <el-table-column label="混合罐类型" width="120">
                  <template slot-scope="scope">
                    {{scope.row.mixType}}
                  </template>
                </el-table-column>
                <el-table-column label="是否满罐" >
                  <template slot-scope="scope">
                    {{scope.row.fullPot==='1'?'是' : '否'}}
                  </template>
                </el-table-column>
                <el-table-column label="满罐日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.fulPotDate}}
                  </template>
                </el-table-column>
                <el-table-column label="操作人" width='140' >
                  <template slot-scope="scope">
                    {{scope.row.changer}}
                  </template>
                </el-table-column>
                <el-table-column label="备注" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.remark}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width='70' fixed="right">
                  <template slot-scope="scope">
                    <el-button  class="delBtn" type="text" icon="el-icon-delete" size="small" @click="delRow(scope.row)" :disabled="!(!disabled && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="500px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>入罐开始</span>
        </div>
        <div >
          <el-form :model="startForm"  :label-width="formLabelWidth" size="small" ref="startForm">
            <el-form-item label="原汁罐号：" required>
              <el-select @change="changeOptions('pot')"  v-model="startForm.potNo" value-key="holderId" placeholder="请选择" filterable style="width:220px" >
                <el-option v-for="(item, index) in potList" :key="index" :label="item.holderName" :value="item.holderId" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物料：" required>
              <el-select v-model="startForm.materialCode" :disabled="startForm.materialSt" @change="setmaterial(startForm)" filterable placeholder="请选择" size="small" style="width:220px" >
                <el-option v-for="item in SerchSapList" :key="item.code" :label="item.code + ' ' + item.value" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="混合罐类型：" required>
              <el-select v-model="startForm.mixType" placeholder="请选择" :disabled="startForm.mixTypeSt" filterable style="width:220px" >
                <el-option label="正常" value="正常"></el-option>
                <el-option label="单用混合" value="单用混合"></el-option>
                <el-option label="共用混合" value="共用混合"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="批次：" required>
              <el-input v-model.trim="startForm.batch" maxlength="10" style='width:220px' :disabled="startForm.batchSt"/>
            </el-form-item>
            <el-form-item label="起始数：" required>
              <el-input  type='number' v-model.number="startForm.startAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="单位：" required>
              {{startForm.unit = 'L'}}
            </el-form-item>
            <el-form-item label="操作时间：">
              <label>{{startForm.changed}}</label>
            </el-form-item>
            <el-form-item label="操作人：">
              <label>{{startForm.changer}}</label>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="saveStart()">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible2" width="500px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>入罐结束</span>
        </div>
        <div>
          <el-form :model="endForm"  :label-width="formLabelWidth" size="small" ref="endForm">
            <el-form-item label="原汁罐号：" required>
              {{endForm.potName}}
            </el-form-item>
            <el-form-item label="批次：" required>
              {{endForm.batch}}
            </el-form-item>
            <el-form-item label="结束数：" required>
              <el-input  type='number' @change="abc" v-model.number="endForm.endAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="单位：" required>
              {{endForm.unit = 'L'}}
            </el-form-item>
            <el-form-item label="是否满罐：">
              <el-select v-model="endForm.fullPot" placeholder="请选择" @change="setfullPotAmount('endForm')" filterable style="width:220px" >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="满罐数量：">
              <el-input  type='number' disabled v-model.number="endForm.fullPotAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="满罐日期：">
              <el-date-picker type="date" v-model="endForm.fulPotDate" value-format="yyyy-MM-dd" style="width:220px"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注：" >
              <el-input v-model.trim="endForm.remark" style='width:220px'/>
            </el-form-item>
            <el-form-item label="操作时间：" >
              <label>{{endForm.changed}}</label>
            </el-form-item>
            <el-form-item label="操作人：" >
              <label>{{endForm.changer}}</label>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="saveEnd()">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible3" width="500px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>入罐修改</span>
        </div>
        <div >
          <el-form :model="modifyForm"  :label-width="formLabelWidth" size="small" ref="modifyForm">
            <el-form-item label="原汁罐号：" required>
              <el-select @change="changeOptions('potModify')"  v-model="modifyForm.potNo" value-key="holderId" placeholder="请选择" filterable style="width:220px" >
                <el-option v-for="(item, index) in potList" :key="index" :label="item.holderName" :value="item.holderId" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物料：" required>
              <el-select v-model="modifyForm.materialCode" :disabled="modifyForm.materialSt" @change="setmaterial(modifyForm)" filterable placeholder="请选择" size="small" style="width:220px" >
                <el-option v-for="item in SerchSapList" :key="item.code" :label="item.code + ' ' + item.value" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="混合罐类型：" required>
              <el-select v-model="modifyForm.mixType" placeholder="请选择" :disabled="modifyForm.mixTypeSt" filterable style="width:220px" >
                <el-option label="正常" value="正常"></el-option>
                <el-option label="单用混合" value="单用混合"></el-option>
                <el-option label="共用混合" value="共用混合"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="批次：" required>
              <el-input v-model.trim="modifyForm.batch" style='width:220px' maxlength="10" :disabled="modifyForm.batchSt"/>
            </el-form-item>
            <el-form-item label="起始数：" required>
              <el-input  type='number' v-model.number="modifyForm.startAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="结束数：" required>
              <el-input  type='number' v-model.number="modifyForm.endAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="是否满罐：">
              <el-select v-model="modifyForm.fullPot" placeholder="请选择" @change="setfullPotAmount('modifyForm')"  filterable style="width:220px" >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="满罐数量：">
              <el-input  type='number' v-model.number="modifyForm.fullPotAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="满罐日期：">
              <el-date-picker type="date" v-model="modifyForm.fulPotDate" value-format="yyyy-MM-dd" style="width:220px"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注：" >
              <el-input v-model.trim="modifyForm.remark" style='width:220px'/>
            </el-form-item>
            <el-form-item label="操作时间：">
              <label>{{modifyForm.changed}}</label>
            </el-form-item>
            <el-form-item label="操作人：">
              <label>{{modifyForm.changer}}</label>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible3 = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="saveModify()">保存</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {BASICDATA_API, SQU_API, SYSTEMSETUP_API} from '@/api/api'
import {dateFormat} from '@/net/validate'
import {Vue, Component, Watch} from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.SqueezeWorkshop))
  factoryList = []
  workshopList = []
  productlineList = []
  SerchSapList = []
  dataList = []
  potList = []
  isAvailable = '0'
  searched: boolean = false
  disabled: boolean = true
  dialogFormVisible:boolean = false
  dialogFormVisible2:boolean = false
  dialogFormVisible3:boolean = false
  formLabelWidth: string = '130px'
  teststr: string = ''
  ci: Number = 0
  startForm = {
    inDate: '',
    potNo: '',
    potName: '',
    materialCode: '',
    materialName: '',
    materialSt: false,
    mixTypeSt: false,
    batch: '',
    batchSt: false,
    unit: 'L',
    startAmount: 0,
    mixType: '',
    changed: '',
    changer: '',
    uuid: ''
  }
  endForm = {
    potNo: '',
    potName: '',
    batch: '',
    unit: 'L',
    endAmount: 0,
    fullPot: '',
    fullPotAmount: 0,
    fulPotDate: '',
    remark: '',
    changed: '',
    changer: ''
  }
  modifyForm = {
    id: '',
    recordId: '',
    inDate: '',
    potNo: '',
    potName: '',
    materialCode: '',
    materialName: '',
    materialSt: false,
    mixTypeSt: false,
    batch: '',
    batchSt: false,
    startAmount: 0,
    endAmount: 0,
    mixType: '',
    fullPot: '',
    fullPotAmount: 0,
    fulPotDate: '',
    remark: '',
    changed: '',
    changer: '',
    uuid: ''
  }
  mounted () {
    this.params.applyDate = dateFormat(new Date(), 'yyyy-MM-dd')
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
    // this.getProductLine(this.params.workshopId)
    this.getPot(this.params)
    this.getMaterial(this.params.factoryId)
  }
  isAuth (key) {
    return Vue.prototype.isAuth(key)
  }
  delRow (row) {
    this.$confirm('是否删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      row.delFlag = '1'
    })
  }
  rowDelFlag ({row, rowIndex}) {
    if (row.delFlag === '1') {
      return 'rowDel'
    } else {
      return ''
    }
  }
  get mainTabs () {
    return this.$store.state.common.mainTabs
  }
  set mainTabs (val) {
    this.$store.commit('common/updateMainTabs', val)
  }
  get orderStatus () {
    let status = ''
    let no = 0
    let sub = 0
    let che = 0
    let sav = 0
    this.dataList.forEach((item) => {
      if (item.status === 'noPass') {
        no = no + 1
      } else if (item.status === 'saved') {
        sav = sav + 1
      } else if (item.status === 'submit') {
        sub = sub + 1
      } else if (item.status === 'checked') {
        che = che + 1
      }
    })
    if (no > 0) {
      // 有一条数据不通过，则总状态为不通过
      status = 'noPass'
    } else if (sav > 0) {
      status = 'saved'
    } else if (sub > 0) {
      status = 'submit'
    } else if (che > 0) {
      status = 'checked'
    }
    return status
  }
  modifyRecord (row) {
    this.ci = 0
    if (this.disabled || row.status === 'submit' || row.status === 'checked') {
      return
    }
    this.teststr = row.potNo
    if (this.potList.find(item => item.holderId === row.potNo) === undefined) {
      this.potList.push({
        holderId: row.potNo,
        holderName: row.potName,
        batch: row.batch,
        potType: row.mixType,
        materialCode: row.materialCode,
        materialName: row.materialName
      })
    }
    this.modifyForm = {
      id: row.id ? row.id : 'id',
      recordId: row.recordId ? row.recordId : 'record',
      inDate: row.inDate ? row.inDate : dateFormat(new Date(), 'yyyy-MM-dd'),
      potNo: row.potNo ? row.potNo : '',
      potName: row.potName ? row.potName : '',
      materialCode: row.materialCode ? row.materialCode : '',
      materialName: row.materialName ? row.materialName : '',
      materialSt: false,
      mixTypeSt: false,
      batch: row.batch ? row.batch : '',
      batchSt: false,
      startAmount: row.startAmount ? row.startAmount : 0,
      endAmount: row.endAmount ? row.endAmount : 0,
      mixType: row.mixType ? row.mixType : '正常',
      fullPot: row.fullPot ? row.fullPot : '0',
      fullPotAmount: row.fullPotAmount ? row.fullPotAmount : 0,
      // fulPotDate: row.fulPotDate ? row.fulPotDate : dateFormat(new Date(), 'yyyy-MM-dd'),
      fulPotDate: row.fulPotDate ? row.fulPotDate : '',
      remark: row.remark ? row.remark : '',
      changed: dateFormat(new Date(), 'yyyy-MM-dd h:m:s'),
      changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
      uuid: row.uuid
    }
    this.dialogFormVisible3 = true
    this.changeOptions('potModify')
  }
  saveModify () {
    if (this.modifyValidate()) {
      let matchedIndex = -1
      this.dataList.forEach((item, index) => { if (item.id === this.modifyForm.id) { matchedIndex = index } })
      if (matchedIndex < 0) {
        // 新增
        this.dataList.forEach((item, index) => { if (item.recordId === this.modifyForm.recordId) { matchedIndex = index } })
      }
      if (matchedIndex >= 0) {
        let record = this.dataList[matchedIndex]
        Object.assign(record, {
          batch: this.modifyForm.batch,
          materialCode: this.modifyForm.materialCode,
          materialName: this.modifyForm.materialName,
          inDate: this.modifyForm.inDate,
          potNo: this.modifyForm.potNo,
          potName: JSON.parse(JSON.stringify(this.modifyForm.potName)),
          startAmount: this.modifyForm.startAmount,
          mixType: this.modifyForm.mixType,
          endAmount: this.modifyForm.endAmount,
          inAmount: this.modifyForm.endAmount - this.modifyForm.startAmount,
          remark: this.modifyForm.remark,
          fullPot: this.modifyForm.fullPot,
          fullPotAmount: this.modifyForm.fullPotAmount,
          fulPotDate: this.modifyForm.fulPotDate,
          changed: this.modifyForm.changed,
          changer: this.modifyForm.changer,
          uuid: this.modifyForm.uuid
        })
        this.dataList.splice(matchedIndex, 1, record)
      }
      if (this.dataList.findIndex(ite => ite.uuid === this.modifyForm.uuid) + 1 === this.dataList.length) {
        this.isAvailable = '0'
      }
      this.dialogFormVisible3 = false
    }
  }
  inPotStart () {
    this.startForm = {
      inDate: this.params.applyDate,
      potNo: '',
      potName: '',
      materialCode: '',
      materialName: '',
      materialSt: false,
      mixTypeSt: false,
      batch: '',
      batchSt: false,
      unit: '',
      startAmount: 0,
      mixType: '正常',
      changed: dateFormat(new Date(), 'yyyy-MM-dd h:m:s'),
      changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
      uuid: ''
    }
    this.dialogFormVisible = true
  }
  saveStart () {
    if (this.startValidate()) {
      let recordId = Vue.prototype.uuid()
      let result = {
        recordId,
        factory: this.params.factoryId,
        workShop: this.params.workshopId,
        productLine: this.params.productLineId,
        batch: this.startForm.batch,
        materialCode: this.startForm.materialCode,
        materialName: this.startForm.materialName,
        unit: this.startForm.unit,
        inDate: this.startForm.inDate,
        potNo: this.startForm.potNo,
        potName: this.startForm.potName,
        startAmount: this.startForm.startAmount,
        mixType: this.startForm.mixType,
        changed: this.startForm.changed,
        changer: this.startForm.changer,
        delFlag: 0,
        uuid: Vue.prototype.uuid()
      }
      this.dataList.push(result)
      this.dialogFormVisible = false
      this.isAvailable = '1'
    }
  }
  inPotEnd () {
    let startData = this.dataList.find((item, index) => index === this.dataList.length - 1)
    this.endForm = {
      potNo: startData.potNo,
      potName: startData.potName,
      batch: startData.batch,
      unit: startData.unit,
      endAmount: startData.endAmount ? startData.endAmount : 0,
      fullPot: startData.fullPot ? startData.fullPot : '0',
      fullPotAmount: startData.fullPotAmount ? startData.fullPotAmount : 0,
      fulPotDate: '',
      // fulPotDate: startData.fulPotDate ? startData.fulPotDate : dateFormat(new Date(), 'yyyy-MM-dd'),
      remark: startData.remark ? startData.remark : '',
      changed: dateFormat(new Date(), 'yyyy-MM-dd h:m:s'),
      changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
    }
    this.dialogFormVisible2 = true
  }
  saveEnd () {
    if (this.endValidate()) {
      this.isAvailable = '0'
      let startData = this.dataList.pop()
      if (startData) {
        Object.assign(startData, {
          endAmount: this.endForm.endAmount,
          inAmount: this.endForm.endAmount - startData.startAmount,
          remark: this.endForm.remark,
          fullPot: this.endForm.fullPot,
          fullunitPot: this.endForm.unit,
          fullPotAmount: this.endForm.fullPotAmount,
          fulPotDate: this.endForm.fulPotDate,
          changed: this.endForm.changed,
          changer: this.endForm.changer})
        this.dataList.push(startData)
      }
      this.dialogFormVisible2 = false
    }
  }
  setmaterial (it) {
    let item = this.SerchSapList.find(ele => ele.code === it.materialCode)
    it.materialName = item ? item.value : ''
  }
  startValidate () {
    if (this.startForm.potNo === '') {
      Vue.prototype.$warning_SHINHO('原汁罐号不能为空')
      return false
    } else if (this.startForm.materialCode === '') {
      Vue.prototype.$warning_SHINHO('物料不能为空')
      return false
    } else if (this.startForm.batch.length !== 10) {
      Vue.prototype.$warning_SHINHO('批次长度必须为10')
      return false
    } else if (this.startForm.startAmount.toString() === '') {
      Vue.prototype.$warning_SHINHO('起始数不能为空')
      return false
    }
    return true
  }
  endValidate () {
    if (this.endForm.endAmount.toString() === '') {
      Vue.prototype.$warning_SHINHO('结束数不能为空')
      return false
    } else if (this.endForm.fullPot === '1' && (this.endForm.fullPotAmount.toString() === '' || this.endForm.fullPotAmount.toString() === '0')) {
      Vue.prototype.$warning_SHINHO('满罐数量不能为空')
      return false
    } else if (this.endForm.fullPot === '1' && this.endForm.fulPotDate === '') {
      Vue.prototype.$warning_SHINHO('满罐日期不能为空')
      return false
    }
    return true
  }
  modifyValidate () {
    if (this.modifyForm.potNo === '') {
      Vue.prototype.$warning_SHINHO('原汁罐号不能为空')
      return false
    } else if (this.modifyForm.batch.length !== 10) {
      Vue.prototype.$warning_SHINHO('批次长度必须为10')
      return false
    } else if (this.modifyForm.materialCode === '') {
      Vue.prototype.$warning_SHINHO('物料不能为空')
      return false
    } else if (this.modifyForm.startAmount.toString() === '') {
      Vue.prototype.$warning_SHINHO('起始数不能为空')
      return false
    } else if (this.modifyForm.endAmount.toString() === '') {
      Vue.prototype.$warning_SHINHO('结束数不能为空')
      return false
    } else if (this.modifyForm.fullPot === '1' && this.modifyForm.fullPotAmount.toString() === '') {
      Vue.prototype.$warning_SHINHO('满罐数量不能为空')
      return false
    } else if (this.modifyForm.fullPot === '1' && this.modifyForm.fulPotDate === '') {
      Vue.prototype.$warning_SHINHO('满罐日期不能为空')
      return false
    }
    return true
  }
  changeOptions (flag: string) {
    if (flag === 'factory') {
      let item = this.factoryList.find(ele => ele.deptId === this.params.factoryId)
      this.params.factoryName = item ? item.deptName : ''
    } else if (flag === 'workshop') {
      let item = this.workshopList.find(ele => ele.deptId === this.params.workshopId)
      this.params.workshopName = item ? item.deptName : ''
    } else if (flag === 'productline') {
      let item = this.productlineList.find(ele => ele.deptId === this.params.productLineId)
      this.params.productLineName = item ? item.deptName : ''
    } else if (flag === 'pot') {
      let item = this.potList.find(ele => ele.holderId === this.startForm.potNo)
      this.startForm.potName = item ? item.holderName : ''
      this.startForm.batch = item ? item.batch : ''
      if (item && item.potType) {
        this.startForm.mixType = item.potType
        this.startForm.mixTypeSt = true
      } else {
        this.startForm.mixTypeSt = false
      }
      this.startForm.materialCode = item.materialCode || ''
      this.startForm.materialName = item.materialName || ''
      item.materialCode ? this.startForm.materialSt = true : this.startForm.materialSt = false
      item.batch ? this.startForm.batchSt = true : this.startForm.batchSt = false
    } else if (flag === 'potModify') {
      this.ci = Number(this.ci) + Number(1)
      console.log(this.ci)
      let item = this.potList.find(ele => ele.holderId === this.modifyForm.potNo)
      if (item.batch === '') {
        if (this.teststr !== this.modifyForm.potNo) {
          this.modifyForm.potName = this.potList.find(it => it.holderId === this.modifyForm.potNo).holderName
          this.modifyForm.batch = ''
          this.modifyForm.mixType = '正常'
          this.modifyForm.materialCode = item.materialCode
          this.modifyForm.materialName = item.materialName
          this.modifyForm.batchSt = false
          this.modifyForm.materialSt = false
          this.modifyForm.mixTypeSt = false
        } else {
          if (this.ci !== 1) {
            this.modifyForm.potName = this.potList.find(it => it.holderId === this.modifyForm.potNo).holderName
            this.modifyForm.batch = ''
            this.modifyForm.mixType = '正常'
            this.modifyForm.materialCode = item.materialCode
            this.modifyForm.materialName = item.materialName
            this.modifyForm.batchSt = false
            this.modifyForm.materialSt = false
            this.modifyForm.mixTypeSt = false
          }
        }
      } else {
        this.modifyForm.potName = item ? item.holderName : ''
        this.modifyForm.batch = item ? item.batch : ''
        if (item && item.potType) {
          this.modifyForm.mixType = item.potType
          this.modifyForm.mixTypeSt = true
        }
        this.modifyForm.materialCode = item.materialCode || ''
        this.modifyForm.materialName = item.materialName || ''
        item.materialCode ? this.modifyForm.batchSt = true : this.modifyForm.batchSt = false
        item.batch ? this.modifyForm.materialSt = true : this.modifyForm.materialSt = false
      }
    }
  }
  abc () {
    if (this.endForm.fullPot === '1') {
      let startData = this.dataList.find((item, index) => index === this.dataList.length - 1)
      this.endForm.fullPotAmount = this.potList.find(ele => ele.holderId === this.endForm.potNo).amount * 1000 + (this.endForm.endAmount * 1 - startData.startAmount)
    }
  }
  setfullPotAmount (str) {
    if (str === 'endForm') {
      if (this.endForm.fullPot === '1') {
        let startData = this.dataList.find((item, index) => index === this.dataList.length - 1)
        this.endForm.fullPotAmount = this.potList.find(ele => ele.holderId === this.endForm.potNo).amount * 1000 + (this.endForm.endAmount * 1 - startData.startAmount)
      } else {
        this.endForm.fullPotAmount = 0
      }
    } else if (str === 'modifyForm') {
      if (this.modifyForm.fullPot === '1') {
        this.modifyForm.fullPotAmount = this.potList.find(ele => ele.holderId === this.modifyForm.potNo).amount * 1000 + (this.modifyForm.endAmount - this.modifyForm.startAmount)
      } else {
        this.modifyForm.fullPotAmount = 0
      }
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
        if (!this.params.factoryId && res.data.typeList.length > 0) {
          this.params.factoryId = res.data.typeList[0].deptId
          this.params.factoryName = res.data.typeList[0].deptName
        }
      } else {
        this.$notify.error({title: '错误', message: res.data.msg})
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '压榨'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
          if (!this.params.workshopId && res.data.typeList.length > 0) {
            this.params.workshopId = res.data.typeList[0].deptId
            this.params.workshopName = res.data.typeList[0].deptName
          }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
  }
  // 产线
  getProductLine (wid: string) {
    this.productlineList = []
    if (wid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: wid, deptType: 'proLine'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.productlineList = data.childList
          if (!this.params.productLineId && data.childList.length > 0) {
            this.params.productLineId = data.childList[0].deptId
            this.params.productLineName = data.childList[0].deptName
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    }
  }
  // 获取物料下拉
  getMaterial (factory) {
    Vue.prototype.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {factory: factory, type: 'YA_M_MATERIAL'}, false, false, false).then(({data}) => {
      if (data.code === 0) {
        this.SerchSapList = data.dicList
      } else {
        this.$notify.error({title: '错误', message: data.msg})
      }
    })
  }
  // 原汁罐
  getPot (params) {
    this.potList = []
    if (params.workshopId) {
      Vue.prototype.$http(`${SQU_API.PRE_INSTORAGE_LIST_API}`, 'POST', {factory: params.factoryId, workShop: params.workshopId}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.potList = res.data.holderList
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
    // let params = {
    //   type: 'holder_type',
    //   holder_type: '013',
    //   pageSize: 9999,
    //   workShopName: wName,
    //   currPage: 1
    // }
    // this.potList = []
    // if (wName) {
    //   Vue.prototype.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', params, false, false, false).then(res => {
    //     if (res.data.code === 0) {
    //       this.potList = res.data.page.list
    //     } else {
    //       this.$notify.error({title: '错误', message: res.data.msg})
    //     }
    //   })
    // }
  }
  setDisabled (flag: boolean) {
    this.disabled = flag
  }
  setStore (params) {
    this.$store.commit('common/updateSqueezeWorkshop', params)
  }
  getOrderList () {
    if (this.params.factoryId === '') {
      this.$notify({title: '警告', message: '请选择工厂', type: 'warning'})
      return
    }
    if (this.params.workshopId === '') {
      this.$notify({title: '错误', message: '请选择车间', type: 'warning'})
      return
    }
    // if (this.params.productLineId === '') {
    //   this.$message.error('请选择布浆线')
    //   return
    // }
    if (this.params.applyDate === null || this.params.applyDate === '') {
      this.$notify({title: '错误', message: '请选择入罐日期', type: 'warning'})
      return
    }
    // 保存选项值到common store
    this.setStore(this.params)
    this.searched = true
    let params = {
      factory: this.params.factoryId,
      workShop: this.params.workshopId,
      productLine: this.params.productLineId,
      created: this.params.applyDate
    }
    this.retrieveOrderList(params)
  }
  retrieveOrderList (params) {
    Vue.prototype.$http(`${SQU_API.MATERIAL_IN_LIST_API}`, `POST`, params).then((res) => {
      if (res.data.code === 0) {
        this.isAvailable = '0'
        this.dataList = res.data.list
        this.dataList.map(item => {
          item.uuid = item.id
        })
      } else {
        this.$notify.error({title: '错误', message: res.data.msg})
      }
    })
  }
  async save () {
    let result = {code: 0, msg: ''}
    this.dataList.map(item => { if (item.status !== 'submit' && item.status !== 'checked') { item.status = 'saved' } })
    await Vue.prototype.$http(`${SQU_API.MATERIAL_IN_SAVE_API}`, `POST`, this.dataList).then((res) => {
      result = {code: res.data.code, msg: res.data.code === 0 ? '保存成功' : res.data.msg}
    }).catch(err => {
      result = {code: 1, msg: '保存失败：' + err}
    })
    return result
  }
  save2 () {
    let that = this
    that.dataList.map(item => { if (item.status !== 'submit' && item.status !== 'checked') { item.status = 'saved' } })
    return new Promise(function (resolve, reject) {
      let result = {code: 0, msg: ''}
      Vue.prototype.$http(`${SQU_API.MATERIAL_IN_SAVE_API}`, `POST`, that.dataList).then((res) => {
        result = {code: res.data.code, msg: res.data.code === 0 ? '保存成功' : res.data.msg}
        if (res.data.code === 0) {
          resolve(result)
        } else {
          reject(result)
        }
      }).catch(err => {
        result = {code: 1, msg: '保存失败：' + err}
        reject(result)
      })
    })
  }
  doSaveAction () {
    // Promise.resolve(this.save()).then((result) => {
    //   this.$message.success(result.msg)
    //   if (result.code === 0) {
    //     this.getOrderList()
    //   }
    // })
    let that = this
    this.save2().then((result : { code: number, msg: string }) => {
      that.$notify({title: '成功', message: result.msg, type: 'success'})
      that.getOrderList()
    }).catch((result: { code: number, msg: string }) => {
      Vue.prototype.$error_SHINHO(result.msg)
    })
  }
  async submit () {
    let result = {code: 0, msg: ''}
    this.dataList.map(item => { if (item.status !== 'checked') { item.status = 'submit' } })
    await Vue.prototype.$http(`${SQU_API.MATERIAL_IN_SUBMIT_API}`, `POST`, this.dataList).then((res) => {
      result = {code: res.data.code, msg: res.data.code === 0 ? '提交成功' : res.data.msg}
    }).catch(err => {
      result = {code: 1, msg: '提交失败：' + err}
    })
    return result
  }
  submit2 () {
    let that = this
    let result = {code: 0, msg: ''}
    that.dataList.map(item => { if (item.status !== 'checked') { item.status = 'submit' } })
    return new Promise(function (resolve, reject) {
      Vue.prototype.$http(`${SQU_API.MATERIAL_IN_SUBMIT_API}`, `POST`, that.dataList).then((res) => {
        result = {code: res.data.code, msg: res.data.code === 0 ? '提交成功' : res.data.msg}
        if (res.data.code === 0) {
          resolve(result)
        } else {
          reject(result)
        }
      }).catch(err => {
        result = {code: 1, msg: '提交失败：' + err}
        reject(result)
      })
    })
  }
  doSubmitAction () {
    // Promise.all([this.save(), this.submit()]).then((result) => {
    //   if (result[0].code === 0 && result[1].code === 0) {
    //     this.getOrderList()
    //   } else {
    //     this.$message.success('提交失败')
    //   }
    // })
    this.$confirm('确认提交, 是否继续?', '提交', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let that = this
      this.save2().then(() => this.submit2()).then((result : { code: number, msg: string }) => {
        that.$notify({title: '成功', message: result.msg, type: 'success'})
        that.getOrderList()
      }).catch((result : { code: number, msg: string }) => {
        Vue.prototype.$error_SHINHO(result.msg)
      })
    })
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
    this.disabled = true
  }
  @Watch('params.factoryId')
  onFactoryValue (newVal: string, oldVal: string) {
    this.params.workshopId = ''
    this.params.workshopName = ''
    this.getWorkshop(newVal)
    this.getMaterial(newVal)
  }
  @Watch('params.workshopId')
  onChangeWorkshop (newVal: string, oldVal: string) {
    this.params.productLineId = ''
    this.params.productLineName = ''
    // this.getProductLine(newVal)
    this.getPot(this.params)
  }
}
</script>
<style lang="scss" >
.dialog__class{
  border-radius:6px 6px 0px 0px !important;
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
  .reqI{
    color: red;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
.pot-box {
  width:217px;
  height:250px;
  border-radius:2px;
  border:1px solid rgba(232,232,232,1);
  .pot-box-header {
    height:40px;
    line-height:40px;
    background:rgba(235,235,235,1);
    border-radius:4px 4px 0px 0px;
    .pot-box-title {
      font-size:14px;
      font-family:PingFangSC-Medium;
      font-weight:500;color:rgba(0,0,0,0.65);
    }
  }
  .pot-box-container {
    width:120px;
    height:120px;
    margin:auto;
    margin-top:16px;
  }
  .img {
    background: url('~@/assets/img/sq_G1.png')
  }
  .pot-box-footer {
    margin-top:20px;
    display:flex;
    justify-content:center;
    .pot-box-button {
      width:72px;
      height:24px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.25);
      text-align:center;
      cursor:pointer;
      margin-left: 4px;
      margin-right: 4px;
      &:hover{
        background:rgba(24,144,255,1);
      }
    }
    .pot-box-button-title {
      line-height:24px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#000;
      &:hover{
        color:#fff;
      }
    }
    .pot-box-button-disabled{
      width:72px;
      height:24px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.25);
      text-align:center;
      cursor:pointer;
      margin-left: 4px;
      margin-right: 4px;
      color:rgba(0, 0, 0, 0.6);
      background:#F7F9FA;
      &:hover{
        cursor:not-allowed
      }
    }
    .pot-box-button-title-disabled {
      line-height:24px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,0.6);
    }
  }
}
.rowButton{
  button{
    margin: 0px 3px!important;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
