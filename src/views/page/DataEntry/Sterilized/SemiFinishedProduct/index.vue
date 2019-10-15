<template>
<div class="header_main">
  <el-card class="searchCard  newCard ferCard">
    <el-form :inline="true" :model="formHeader" size="small" label-width="70px" class="topform sole_row">
      <el-form-item label="生产工厂：">
        <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 160px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产车间：">
        <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 160px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="半成品罐：">
        <el-select v-model="formHeader.holderId" filterable>
          <el-option value=''>请选择</el-option>
          <el-option v-for="(item, index) in HolderList" :key="index" :value="item.holderId" :label="item.holderName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatr">
        <el-button type="primary" size="small" @click="GetList(true)" v-if="isAuth('ste:semi:list')">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="searchCard  newCard ferCard" style="margin-top:5px; padding:0px !important;"  v-show="fastS">
    <h3 style="color: black;margin-bottom: 8px"><i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>半成品罐列表</h3>
    <el-row class="dataList" :gutter="10" style="min-height: 150px">
      <el-col :span="4" v-for="(item, index) in DataList" :key="index">
        <el-card class="dataList_item">
          <h3 class="dataList_item_tit">
            {{item.holderNo}} - <span style="color:rgb(51, 51, 51); font-weight:normal; font-size:14px;">{{item.holderStatus === '1' ? '入库中' : item.holderStatus === '0' ? '空罐' : item.holderStatus === '2' ? '满罐' : item.holderStatus === '3' ? '领用中' : ''}}</span>
            <!--<span style="cursor:pointer; color:#1890FF; float:right; font-size:12px;">详情>></span>-->
            <span style="cursor:pointer; color:#bbbbbb; float:right; font-size:12px;">详情>></span>
          </h3>
          <div class="dataList_item_pot clearfix" style="position:relative;">
            <img src="@/assets/img/RD.png" alt="" v-if="item.isRdSign === '1'" style="position:absolute; left:10px; top:10px;">
            <div class="dataList_item_pot_box">
              <div class="dataList_item_pot_box1" style="display:flex; flex-wrap:wrap; align-content:flex-end; position:relative;">
                <div v-if="item.holderStatus === '1' || item.holderStatus === '3'" class="dataList_item_pot_box_item1" :style="`height:${item.amount <= 0 ? '0' : (item.amount / item.holderHold) > 1 ? '100' : (item.amount / item.holderHold) * 100}%`"></div>
                <div v-if="item.holderStatus === '2'" class="dataList_item_pot_box_item2 dataList_item_pot_box_item2s"  :style="`height:150%`"></div>
                <div v-else class="dataList_item_pot_box_item1" :style="`height:0%`"><p></p></div>
                <div class="dataList_item_pot_detail" v-if="item.holderStatus === '1' || item.holderStatus === '2' || item.holderStatus === '3'">
                  <p>{{item.batch}}</p>
                  <p>{{item.materialName}}</p>
                  <p>{{(item.amount / 1000).toFixed(3)}}方</p>
                  <p style="font-size:12px;">{{item.gnEndTime}}</p>
                  <p>{{item.timeLength}}<span v-if="item.timeLength !== '' && item.timeLength !== null">H</span></p>
                </div>
              </div>
            </div>
          </div>
          <el-row class="bottom">
            <el-button class="bottom-item" :disabled="!isAuth('ste:gn:save') || item.holderStatus === '0'" @click="GnProp(item)" style='border:none; padding:0px;'>GN搅罐</el-button>
            <div class="bottom-split"></div>
            <!-- <el-col :span="12" class="dataList_item_btn_item"><p @click="GnProp(item)">GN搅罐</p></el-col> -->
            <el-button class="bottom-item" :disabled="!isAuth('ste:gn:save') || item.holderStatus === '0'" @click="JsbProp(item)" style='border:none; padding:0px;'>JBS出库</el-button>
            <div class="bottom-split"></div>
            <el-button class="bottom-item" :disabled="!isAuth('ste:semi:dumpSemiMaterial') || item.holderStatus === '0'" @click="ZcProp(item)" style='border:none; padding:0px;'>转储</el-button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formHeader.currPage"
        :page-sizes="[18, 24, 30]"
        :page-size="formHeader.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="formHeader.totalCount">
      </el-pagination>
    </el-row>
  </el-card>
  <el-dialog :visible.sync="GnDialogTableVisible" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">GN搅罐</div>
    <div>
      <el-form size="small" :model="formGn" :rules="Gnrulestar" ref="Gnstar" label-width="150px">
        <el-form-item label="罐号：">{{formGn.holderName}}</el-form-item>
        <el-form-item label="搅罐开始时间：" prop="gnStartTime">
          <el-date-picker v-model="formGn.gnStartTime" type="datetime" placeholder="请选择" style="width:200px" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="搅罐结束时间：" prop="gnEndTime">
          <el-date-picker v-model="formGn.gnEndTime" type="datetime" placeholder="请选择" style="width:200px" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formGn.remark" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="操作人：" prop="operator">
          <el-select v-model="formGn.operator">
            <el-option v-for="(item, index) in PeopleList" :key="index" :label="item.realName + `(${item.userName})`" :value="item.realName + `(${item.userName})`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="GnDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="GnSave('Gnstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="JsbDialogTableVisible" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">JSB出库</div>
    <div>
      <el-form size="small" :model="formJsb" :rules="Jsbrulestar" ref="Jsbstar" label-width="150px">
        <el-form-item label="领用罐号：">{{formJsb.holderName}}</el-form-item>
        <el-form-item label="物料：">{{formJsb.materialCode}} {{formJsb.materialName}}</el-form-item>
        <el-form-item label="批次：">{{formJsb.batch}}</el-form-item>
        <el-form-item label="领用量（L）：" prop="receiveAmount">
          <el-input v-model="formJsb.receiveAmount" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="formJsb.inHolderType" filterable>
            <el-option v-for="(item, index) in typeList" :key="index" :value="item.code" :label="item.code + ` ${item.name}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select filterable v-model="formJsb.inHolderId">
            <el-option v-for="(item, index) in thrwHolderList" :key="index" :value="item.holderId" :label="item.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否满灌：">
          <el-select filterable v-model="formJsb.isFull">
            <el-option v-for="(item, index) in isFullList" :key="index" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满灌时间：">
          <el-date-picker v-model="formJsb.fullDate" type="datetime" placeholder="请选择" style="width:200px" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formJsb.remark" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="JsbDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="JsbSave('Jsbstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="ZcDialogTableVisible" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">转储</div>
    <div>
      <el-form size="small" :model="formZc" :rules="Zcrulestar" ref="Zcstar" label-width="150px">
        <el-form-item label="领用罐号：">{{formZc.holderName}}</el-form-item>
        <el-form-item label="物料：">{{formZc.materialCode}} {{formZc.materialName}}</el-form-item>
        <el-form-item label="批次：">{{formZc.batch}}</el-form-item>
        <el-form-item label="领用量（L）：" prop="receiveAmount">
          <el-input v-model="formZc.receiveAmount" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="formZc.inHolderType" filterable @change="GetZhuanPot($event, formZc)">
            <el-option v-for="(item, index) in typeZcList" :key="index" :value="item.code" :label="item.code + ` ${item.name}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select filterable v-model="formZc.inHolderId">
            <el-option v-for="(item, index) in zhuanHolderList" :key="index" :value="item.holderId" :label="item.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否满灌：">
          <el-select filterable v-model="formZc.isFull">
            <el-option v-for="(item, index) in isFullList" :key="index" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满灌时间：">
          <el-date-picker v-model="formZc.fullDate" type="datetime" placeholder="请选择" style="width:200px" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="formZc.remark" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="ZcDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="ZcSave('Zcstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {BASICDATA_API, STERILIZED_API, SYSTEMSETUP_API, FILTRATION_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        holderId: '',
        currPage: 1,
        pageSize: 18,
        totalCount: 0
      },
      HolderList: [],
      DataList: [],
      GnDialogTableVisible: false,
      formGn: {},
      Gnrulestar: {
        gnStartTime: [
          {required: true, message: '请选择搅罐开始时间', trigger: 'change'}
        ],
        gnEndTime: [
          {required: true, message: '请选择搅罐结束时间', trigger: 'change'}
        ],
        operator: [
          { required: true, message: '请选择操作人', trigger: 'blur' }
        ]
      },
      JsbDialogTableVisible: false,
      formJsb: {},
      Jsbrulestar: {
        receiveAmount: [
          { required: true, message: '请填写领用量', trigger: 'blur' }
        ],
        inHolderType: [
          { required: true, message: '请选择打入罐类别', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '请填写打入罐号', trigger: 'blur' }
        ]
      },
      ZcDialogTableVisible: false,
      formZc: {},
      Zcrulestar: {
        receiveAmount: [
          { required: true, message: '请填写领用量', trigger: 'blur' }
        ],
        inHolderType: [
          { required: true, message: '请选择打入罐类别', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '请填写打入罐号', trigger: 'blur' }
        ]
      },
      fastS: false,
      factory: [],
      workshop: [],
      typeList: [],
      thrwHolderList: [],
      PeopleList: [],
      isFullList: [{
        name: '是',
        value: '1'
      }, {
        name: '否',
        value: '0'
      }],
      typeZcList: [{
        code: '006',
        name: '半成品罐'
      }, {
        code: '007',
        name: '成品罐'
      }],
      zhuanHolderList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      this.Getdeptbyid(n)
    },
    'formHeader.workShop' (n, o) {
      this.GetHolder(n)
      this.GetPeople(n)
    },
    'formJsb.inHolderType' (n, o) {
      this.getPot(n)
    }
    // 'formZc.inHolderType' (n, o) {
    //   this.getPot(n)
    // }
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
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
      if (id) {
        this.DataList = []
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '杀菌'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 罐
    GetHolder (id) {
      this.formHeader.holderId = ''
      this.DataList = []
      if (id) {
        this.$http(`${BASICDATA_API.DROPDOWN_HOLDER_LIST}`, 'POST', {factory: this.formHeader.factory, workShop: id, holderType: '006'}).then(({data}) => {
          if (data.code === 0) {
            this.HolderList = data.list
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    GetList (st) {
      if (!this.formHeader.factory) {
        this.$warning_SHINHO('请选择工厂')
        return false
      }
      if (!this.formHeader.workShop) {
        this.$warning_SHINHO('请选择车间')
        return false
      }
      if (st) {
        this.formHeader.currPage = 1
      }
      this.$http(`${STERILIZED_API.SEMIFINISHEDPRODUCTLIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.DataList = data.list.list
          this.formHeader.totalCount = data.list.totalCount
          this.fastS = true
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.formHeader.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.formHeader.currPage = val
      this.GetList()
    },
    GnProp (row) {
      if (row.holderStatus === '1' || row.holderStatus === '2') {
        this.formGn = {
          holderName: row.holderName,
          holderId: row.holderId,
          holderNo: row.holderNo,
          gnStartTime: '',
          gnEndTime: '',
          remark: ''
        }
        this.GnDialogTableVisible = true
      } else {
        this.$warning_SHINHO('当前状态不能搅罐')
      }
    },
    GnSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http(`${STERILIZED_API.SEMIFINISHEDPRODUCTGNSAVE}`, 'POST', this.formGn).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.GnDialogTableVisible = false
              this.GetList()
              this.$refs[formName].resetFields()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    // 打入罐类别
    GetInHolderType (id) {
      this.$http(`${FILTRATION_API.FILTER_INHOLDERTYPE_LIST_API}`, 'POST', {factory: this.formHeader.factory}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.typeList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // JBS 打入罐下拉
    getPot (id) {
      this.$http(`${BASICDATA_API.DROPDOWN_HOLDER_LIST}`, 'POST', { factory: this.formHeader.factory, holderType: id }, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.thrwHolderList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 转储打入罐下拉
    GetZhuanPot (event, item) {
      this.formZc.inHolderId = ''
      this.$http(`${STERILIZED_API.SEMIFINIS_DROPDOWN_LIST}`, 'POST', { factory: this.formHeader.factory, code: event, materialCode: item.materialCode, batch: item.batch, holderId: item.holderId }, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.zhuanHolderList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    JsbProp (row) {
      // 领用中 满灌 入库中
      if (row.holderStatus === '1' || row.holderStatus === '2' || row.holderStatus === '3') {
        this.typeList = []
        this.GetInHolderType()
        this.formJsb = {
          amount: row.amount,
          holderId: row.holderId,
          holderName: row.holderName,
          receiveHolderId: row.holderId,
          materialName: row.materialName,
          materialCode: row.materialCode,
          batch: row.batch,
          receiveAmount: '',
          inHolderType: '',
          inHolderId: '',
          isFull: '0',
          fullDate: '',
          remark: ''
        }
        this.JsbDialogTableVisible = true
      } else {
        this.$warning_SHINHO('当前状态不能JBS出库')
      }
    },
    ZcProp (row) {
      if (row.holderStatus === '1' || row.holderStatus === '2' || row.holderStatus === '3') {
        this.typeList = []
        this.GetInHolderType()
        this.formZc = {
          amount: row.amount,
          holderId: row.holderId,
          holderName: row.holderName,
          receiveHolderId: row.holderId,
          materialName: row.materialName,
          materialCode: row.materialCode,
          batch: row.batch,
          receiveAmount: '',
          inHolderType: '',
          inHolderId: '',
          isFull: '0',
          fullDate: '',
          remark: ''
        }
        this.ZcDialogTableVisible = true
      } else {
        this.$warning_SHINHO('当前状态不能转储')
      }
    },
    JsbSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formJsb.receiveAmount > this.formJsb.amount) {
            this.$warning_SHINHO('领用量不能大于库存')
            return false
          }
          if (this.formJsb.isFull === '1' && (this.formJsb.fullDate === '' || !this.formJsb.fullDate)) {
            this.$warning_SHINHO('满灌时请选择满罐时间')
            return false
          }
          this.formJsb.factory = this.formHeader.factory
          this.formJsb.workShop = this.formHeader.workShop
          this.$http(`${STERILIZED_API.SEMIFINISHEDPRODUCTJSBSAVE}`, 'POST', this.formJsb).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.JsbDialogTableVisible = false
              this.GetList()
              this.$refs[formName].resetFields()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    ZcSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formZc.receiveAmount > this.formZc.amount) {
            this.$warning_SHINHO('领用量不能大于库存')
            return false
          }
          if (this.formZc.isFull === '1' && (this.formZc.fullDate === '' || !this.formZc.fullDate)) {
            this.$warning_SHINHO('满灌时请选择满罐时间')
            return false
          }
          this.$http(`${STERILIZED_API.SEMIFINISHEDPRODUCTZCSAVE}`, 'POST', this.formZc).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '保存成功', type: 'success'})
              this.ZcDialogTableVisible = false
              this.GetList()
              this.$refs[formName].resetFields()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    GetPeople (id) {
      this.PeopleList = []
      if (id) {
        this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {currPage: '1', deptId: id, pageSize: '1000', param: ''}).then(({data}) => {
          if (data.code === 0) {
            this.PeopleList = data.page.list
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    }
  },
  computed: {
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.dataList{
  margin-top: 10px;
  &_item{
    margin-bottom: 10px;
    &_tit{
      font-weight: 600;
      color: black;
      font-size: 16px;
      padding: 0 10px;
      line-height: 45px;
      border-bottom: 1px solid #E8E8E8;
    }
    &_a{
      cursor: pointer;
      color: #1890FF;
      float: right;
    }
    &_pot{
      padding: 17px 10px 10px 10px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: hidden;
      &_box1{
        overflow: hidden;
        width: 102px;
        height: 197px;
      }
      &_box{
        overflow: hidden;
        padding: 25px 9px 9px 9px;
        // color: white;
        float: left;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
        width: 120px;
        height: 229px;
        min-width: 120px;
        background: url('~@/assets/img/ferPot.png') no-repeat;
        background-size:contain;
        &_item1,&_item2{
          width: 100%;
          display:flex;
          align-items:center;
          justify-content: center;
          font-size: 14px;
        }
        &_item2s,&_item1{
          height: 50px;
          background: #69C0FF;
          position: relative;
          overflow: hidden;
          &::before,&::after{
            content: "";
            position: absolute;
            left: 50%;
            min-width: 175px;
            min-height: 165px;
            background: #fff;
            animation: roateTwo 10s linear infinite;
          }
          &::before {
            top: -158px;
            border-radius: 45%;
          }
          &::after {
            top: -152px;
            opacity: 0.5;
            border-radius: 47%;
          }
        }
        &_item2{
          height: 100px;
          background: #69C0FF;
        }
        &:hover &_item1::before,&:hover &_item1::after,&:hover &_item2s::before,&:hover &_item2s::after{
          animation: roateOne 10s linear infinite;
        }
      }
      &_detail{
        max-width: 112px;
        position: absolute;
        height: auto;
        float: left;
        // margin-top: 75px;
        // margin-left: 10px;
        color: #333333;
        font-size: 14px;
        line-height: 18px;
        // padding: 5px 4px;
        border-radius: 4px;
        // border: 1px solid #1890FF;
        left: 0;
        top: 66px;
      }
    }
    .bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      background:rgba(247,249,250,1);
      align-items: center;
      width: 100%;
      .bottom-item {
        text-align: center;
        flex: 1;
        font-size: 14px;
        line-height: 40px;
        background: #f7f9fa;
        border-radius: 0;
        border:none; height:40px; padding:0;
        &:hover{
          color:#fff;
          background:#1890FF;
        }
        &.is-disabled{
          color: #606266
        }
        &.is-disabled:hover{
          color: #fff
        }
      }
      .bottom-split {
        width:1px;
        height:16px;
        background:rgba(232,232,232,1);
      }
    }
  }
}
@keyframes roateOne {
   0% {
     transform: translate(-50%, -0%) rotateZ(0deg);
   }
   50% {
     transform: translate(-50%, -1%) rotateZ(180deg);
   }
   100% {
     transform: translate(-50%, -0%) rotateZ(360deg);
   }
 }
@keyframes roateTwo {
  0% {
    transform: translate(-50%, -0%) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -0%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -0%) rotateZ(0deg);
  }
}
</style>
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
