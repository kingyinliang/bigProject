<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in filterList" :key="index">
          <div class="grid-content">
            <el-row style="flex-grow:1">
              <el-col :span="10" style="padding-left:16px;">
                <div class="title">{{item.deviceName}}</div>
                <div class="content">
                  请点击下方操作按钮，<br>进行相应操作
                </div>
              </el-col>
              <el-col :span="14">
                <img src="@/assets/img/Filtration.png" alt="" style="width:92%; margin-top:19px;">
              </el-col>
            </el-row>
            <el-row class="footer">
              <el-col>
                <el-button class="button" @click="ShowDialog(item)" :disabled="!isRedact || soleStatus">数据录入</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-table :data="techList" @row-dblclick="EditTechInfo" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="过滤机号" show-overflow-tooltip width="120" prop="deviceName"></el-table-column>
        <el-table-column label="过滤前温度(°C)" prop="filterBefTem"></el-table-column>
        <el-table-column label="过滤前压力(Mpa)" prop="filterBefPre"></el-table-column>
        <el-table-column label="过滤后压力(Mpa)" prop="filterEndPre"></el-table-column>
        <el-table-column label="感官指标有无异常" prop="abnormal"></el-table-column>
        <el-table-column label="回压数量(方)" prop="backPreNum"></el-table-column>
        <el-table-column label="助滤剂预涂量(kg) " prop="filterAidBef"></el-table-column>
        <el-table-column label="助滤剂添加量(kg)" prop="filterAidAdd"></el-table-column>
        <el-table-column label="备注" show-overflow-tooltip width="120" prop="remark"></el-table-column>
        <el-table-column label="操作时间" show-overflow-tooltip width="150" prop="changed"></el-table-column>
        <el-table-column label="操作人" show-overflow-tooltip width="100" prop="changer"></el-table-column>
        <el-table-column width="70" fixed="right">
          <template slot-scope="scope">
            <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row)" :disabled="!isRedact || soleStatus " size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="audit"><i class="iconfont factory-shouqicaidan"></i><span>辅料领用</span></div>
      <el-table :data="supMaterialList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="过滤机号" show-overflow-tooltip width="120" prop="deviceName"></el-table-column>
        <el-table-column label="物料" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.materialCode" :disabled="!isRedact || soleStatus " size="small">
              <el-option v-for="(item, index) in filterAidMaterialList" :label="item.CODE+ ' ' +item.VALUE" :value="item.CODE" :key="index"></el-option>
            </el-select>
            <!-- {{scope.row.materialCode}} {{scope.row.materialName}} -->
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.isSplit === '0'" @click="SplitData(scope.row, scope.$index)" :disabled="!isRedact || soleStatus"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
          </template>
        </el-table-column>
        <el-table-column width="110">
          <template slot="header">
            <i class="reqI">*</i>
            <span>过滤剂用量</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.filterAidAmount" :disabled="!isRedact || soleStatus" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位" prop="unit" width="50"></el-table-column>
        <el-table-column width="140">
          <template slot="header">
            <i class="reqI">*</i>
            <span>批次</span>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.batch" :disabled="!isRedact || soleStatus" maxlength="10" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="助滤剂型号" width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.filterAidModel" :disabled="!isRedact || soleStatus" size="small">
              <el-option v-for="(item, index) in filterAidModelList" :label="item.VALUE" :value="item.VALUE" :key="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="助滤剂厂家" show-overflow-tooltip width="140">
          <template slot-scope="scope">
            <el-select v-model="scope.row.filterAidVender" :disabled="!isRedact || soleStatus" size="small">
              <el-option v-for="(item, index) in filterAidVenderList" :label="item.VALUE" :value="item.VALUE" :key="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip width="120" prop="remark"></el-table-column>
        <el-table-column width="70" fixed="right">
          <template slot-scope="scope">
            <el-button class="delBtn" type="text" icon="el-icon-delete" size="mini" v-if="scope.row.isSplit === '1'" circle @click="DelMaterial(scope.row)" :disabled="!isRedact || soleStatus">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="450px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">{{this.techInfo.deviceName}}</div>
      <el-form :model="techInfo" size="small" label-width="160px" :rules="techInforules" ref="techInfo" @keyup.enter.native="SaveDialog('techInfo')">
        <el-form-item label="过滤前温度(℃)：" prop="filterBefTem">
          <el-input v-model="techInfo.filterBefTem" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="过滤前压力(Mpa)：" prop="filterBefPre">
          <el-input v-model="techInfo.filterBefPre" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="过滤后压力(Mpa)：" prop="filterEndPre">
          <el-input v-model="techInfo.filterEndPre" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="感官指标有无异常：" prop="abnormal">
          <el-select v-model="techInfo.abnormal" style="width:220px">
            <el-option v-for="(item, index) in abnormalList" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回压数量(方)：" prop="backPreNum">
          <el-input v-model="techInfo.backPreNum" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="助滤剂预涂量(kg)：" prop="filterAidBef">
          <el-input min="0" onkeyup="value=value.replace(/[^\d]+/g,'')" v-model="techInfo.filterAidBef" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="助滤剂添加量(kg)：" prop="filterAidAdd">
          <el-input min="0" onkeyup="value=value.replace(/[^\d]+/g,'')" v-model="techInfo.filterAidAdd" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="techInfo.remark" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="SaveDialog('techInfo')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/net/validate'
import { FILTRATION_API, AUDIT_API } from '@/api/api'
export default {
  name: 'equworkinghours',
  data () {
    return {
      dialogVisible: false,
      filterList: [],
      techList: [],
      techInfo: {},
      abnormalList: ['澄清', '浑浊'],
      techInforules: {
        filterBefTem: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        filterBefPre: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        filterEndPre: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        abnormal: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        backPreNum: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        filterAidBef: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        filterAidAdd: [
          {required: true, message: '必填', trigger: 'blur'}
          // {validator: (rule, value, callback) => {
          //   if (value < 0) {
          //     return callback(new Error('不能为负数'))
          //   }
          // },
          // trigger: 'blur' }
        ]
      },
      supMaterialList: [],
      supMaterialListS: [],
      orderId: '',
      delSupMater: {},
      filterAidMaterialList: [],
      filterAidModelList: [],
      filterAidVenderList: [],
      soleStatus: false,
      craftStatus: ''
    }
  },
  props: ['isRedact'],
  watch: {
    // 'techInfo.filterAidAdd' (n, o) {
    //   this.techInfo.filterAidAdd = this.techInfo.filterAidAdd.replace(/^[0]+/, '')
    // }
  },
  methods: {
    GetList (params) {
      this.orderId = params.orderId
      this.$http(`${FILTRATION_API.FILTER_CRAFT_LIST}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.filterList = data.listInfo.filterList
          this.techList = data.listInfo.techList
          this.supMaterialList = data.listInfo.supMaterial
          this.techList.map((item) => {
            item.uid = item.id
          })
          if (this.techList.length > 0) {
            this.craftStatus = this.techList[0].status
            if (this.techList[0].status === 'submit') {
              this.soleStatus = true
            }
          }
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      }).finally(() => {
        this.$emit('setCraftStatus', this.craftStatus)
      })
      // 过滤机详细信息
      this.$http(`${FILTRATION_API.FILTER_CRAFT_MATERIALIST}`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.filterAidMaterialList = data.materialInfo.material
          this.filterAidModelList = data.materialInfo.materialType
          this.filterAidVenderList = data.materialInfo.materialSupplier
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ShowDialog (item) {
      this.techInfo = {
        xiu: 0,
        orderId: this.orderId,
        id: '',
        uid: this.uuid(),
        deviceName: item.deviceName,
        filterMachineId: item.deviceId,
        filterAidAdd: 0,
        abnormal: '澄清',
        backPreNum: '',
        filterAidBef: '',
        filterBefTem: '',
        filterEndPre: '',
        delFlag: '0',
        status: '',
        materialCode: item.materialCode,
        materialName: item.materialName,
        materialUnit: item.materialUnit,
        materialSupplier: item.materialSupplier,
        materialType: item.materialType,
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
      this.dialogVisible = true
    },
    SaveDialog (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let currentRecord = []
          currentRecord = this.techList.filter(data => data.uid === this.techInfo.uid)
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], this.techInfo)
          } else {
            this.techList.push(this.techInfo)
          }
          if (this.techInfo.xiu === 0) {
            // 新增
            if (this.techInfo.filterAidAdd + this.techInfo.filterAidBef > 0) {
              let p = -2
              this.supMaterialList.map((item, index) => {
                if (item.filterMachineId === this.techInfo.filterMachineId) {
                  p = index
                }
              })
              if (p === -2) {
                this.supMaterialList.push({
                  orderId: this.orderId,
                  deviceName: this.techInfo.deviceName,
                  filterAidAmount: Number(this.techInfo.filterAidBef) + Number(this.techInfo.filterAidAdd),
                  materialCode: this.filterAidMaterialList[0].CODE,
                  materialName: this.filterAidMaterialList[0].VALUE,
                  unit: 'KG',
                  batch: '',
                  isSplit: '0',
                  filterAidModel: this.filterAidModelList[0].VALUE,
                  filterAidVender: this.filterAidVenderList[0].VALUE,
                  filterMachineId: this.techInfo.filterMachineId
                })
                this.dialogVisible = false
                return false
              } else {
                for (let item of this.supMaterialList) {
                  if (item.filterMachineId === this.techInfo.filterMachineId && (item.batch === '' || item.batch === null)) {
                    item.filterAidAmount = Number(item.filterAidAmount) + Number(this.techInfo.filterAidBef) + Number(this.techInfo.filterAidAdd)
                    // let filterAidAmountss = 0
                    // this.techList.map((itemss) => {
                    //   if (itemss.delFlag === '0' && itemss.filterMachineId === this.techInfo.filterMachineId) {
                    //     filterAidAmountss = Number(filterAidAmountss) + Number(itemss.filterAidBef) + Number(itemss.filterAidAdd)
                    //   }
                    // })
                    // item.filterAidAmount = filterAidAmountss
                    this.dialogVisible = false
                    return false
                  }
                }
                this.supMaterialList.splice(Number(p) + 1, 0, {
                  orderId: this.orderId,
                  deviceName: this.techInfo.deviceName,
                  filterAidAmount: Number(this.techInfo.filterAidBef) + Number(this.techInfo.filterAidAdd),
                  materialCode: this.filterAidMaterialList[0].CODE,
                  materialName: this.filterAidMaterialList[0].VALUE,
                  unit: 'KG',
                  batch: '',
                  isSplit: '0',
                  filterAidModel: this.filterAidModelList[0].VALUE,
                  filterAidVender: this.filterAidVenderList[0].VALUE,
                  filterMachineId: this.techInfo.filterMachineId
                })
                this.dialogVisible = false
                return false
              }
            }
          } else {
            // 修改
            this.SupMaterDel(this.techInfo)
            this.dialogVisible = false
            return false
          }
        } else {
          return false
        }
      })
    },
    EditTechInfo (row) {
      if (this.isRedact && !this.soleStatus) {
        this.dialogVisible = true
        row.xiu = 1
        this.techInfo = Object.assign({}, row)
      }
    },
    SplitData (row, index) {
      this.supMaterialList.splice(index + 1, 0, {
        orderId: this.orderId,
        deviceName: row.deviceName,
        materialCode: row.materialCode,
        materialName: row.materialName,
        filterAidAmount: '',
        unit: 'KG',
        batch: '',
        isSplit: '1',
        filterAidModel: row.filterAidModel,
        filterAidVender: row.filterAidVender,
        remark: row.remark,
        filterMachineId: row.filterMachineId
      })
    },
    // 辅料删除
    DelMaterial (row) {
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sum = 0
        for (let item of this.supMaterialList) {
          if (row.filterMachineId === item.filterMachineId) {
            sum = sum + 1
          }
        }
        if (sum > 1) {
          this.supMaterialList.splice(this.supMaterialList.indexOf(row), 1)
          return false
        } else {
          this.$warning_SHINHO('最后一条禁止删除')
          return false
        }
      })
    },
    SaveTech (resolve, reject) {
      this.techList.map((item) => {
        item.status = 'saved'
      })
      this.$http(`${FILTRATION_API.FILTER_CRAFT_TECHSAVE}`, 'POST', this.techList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    SaveMaterial (resolve, reject) {
      this.supMaterialList.map((item) => {
        item.materialName = this.filterAidMaterialList.find(items => items.CODE === item.materialCode).VALUE
      })
      this.$http(`${FILTRATION_API.FILTER_CRAFT_MATERIALSAVE}`, 'POST', [{orderId: this.orderId, materialInfo: this.supMaterialList}]).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    aidSubmit (str, id, resolve, reject) {
      this.supMaterialList.map((item) => {
        item.materialName = this.filterAidMaterialList.find(items => items.CODE === item.materialCode).VALUE
        item.workShop = id
      })
      this.$http(`${AUDIT_API.AUDIT_AID_SUBMIT}`, 'POST', [{orderId: this.orderId, materialInfo: this.supMaterialList}]).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    DelRow (row) {
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = 1
        this.SupMaterDel(row)
      })
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === 1) {
        return 'rowDel'
      } else {
        return ''
      }
    },
    // 辅料删除，汇总一条
    SupMaterDel (row) {
      let sum = 0
      for (let item of this.techList) {
        if (row.filterMachineId === item.filterMachineId && item.delFlag === '0') {
          sum = sum + 1
        }
      }
      this.supMaterialListS = []
      this.supMaterialList.map((item, index) => {
        if (item.filterMachineId !== row.filterMachineId) {
          this.supMaterialListS.push(item)
        } else {
          this.delSupMater = item
        }
      })
      this.supMaterialList = []
      this.supMaterialList = this.supMaterialListS
      if (sum !== 0) {
        this.delSupMater['batch'] = ''
        let filterAidAmount = 0
        this.techList.map((item) => {
          if (item.delFlag === '0' && item.filterMachineId === row.filterMachineId) {
            filterAidAmount = filterAidAmount + Number(item.filterAidBef) + Number(item.filterAidAdd)
          }
        })
        this.delSupMater['filterAidAmount'] = filterAidAmount
        this.supMaterialList.push(this.delSupMater)
      }
    },
    // 提交验证
    Readyrules () {
      let ty = true
      let i = 0
      this.techList.map((item) => {
        if (item.delFlag === '0') {
          i = 1
        }
      })
      if (i === 0) {
        ty = false
        this.$warning_SHINHO('请录入工艺控制数据')
        return false
      }
      for (let item of this.supMaterialList) {
        if (item.filterAidAmount === '' || !item.filterAidAmount || item.batch === '' || !item.batch) {
          ty = false
          this.$warning_SHINHO('工艺控制中辅料领用必填项不能为空')
          return false
        }
      }
      let techTotal = []
      this.techList.map((item) => {
        let Record = techTotal.filter(data => data.id === item.filterMachineId)
        if (Record && Record.length > 0) {
          techTotal.find(items => items.id === item.filterMachineId).sum = Number(techTotal.find(items => items.id === item.filterMachineId).sum) + Number(item.filterAidBef) + Number(item.filterAidAdd)
        } else {
          techTotal.push({
            id: item.filterMachineId,
            sum: Number(item.filterAidBef) + Number(item.filterAidAdd)
          })
        }
      })
      let SupMaTotal = []
      this.supMaterialList.map((item) => {
        let RecordSup = SupMaTotal.filter(data => data.id === item.filterMachineId)
        if (RecordSup && RecordSup.length > 0) {
          SupMaTotal.find(items => items.id === item.filterMachineId).sum = Number(SupMaTotal.find(items => items.id === item.filterMachineId).sum) + Number(item.filterAidAmount)
        } else {
          SupMaTotal.push({
            id: item.filterMachineId,
            sum: item.filterAidAmount,
            deviceName: item.deviceName
          })
        }
      })
      for (let item of SupMaTotal) {
        if (item.sum !== techTotal.find((items) => items.id === item.id).sum) {
          ty = false
          this.$warning_SHINHO(item.deviceName + ' 剂用量不相等')
          return false
        }
      }
      return ty
    },
    SubmitMaterial (resolve, reject) {
      this.$http(`${FILTRATION_API.FILTER_CRAFT_MATERIASUBMIT}`, 'POST', this.techList).then(({data}) => {
        if (data.code === 0) {} else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.rowDel{
  display: none;
}
.grid-content {
  height:176px;
  border-radius:2px;
  border:1px solid rgba(233,233,233,1);
  margin-bottom: 15px;
  display: flex;
  flex-direction:column;
  .title {
    font-size: 14px;
    font-weight:bold;
    color:rgba(0,0,0,0.85);
    line-height:24px;
    margin-top: 20px;
  }
  .content{
    margin-top: 7px;
    font-size:12px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:22px;
  }
  .footer {
    background:rgba(247,249,250,1);border-top:1px solid rgba(233,233,233,1);
    .button {
      border:none; background:none; padding:0px; border-right:1px solid #E8E8E8; width:100%; line-height:20px; margin: 10px 0;
    }
  }
}
.audit{
  line-height: 40px;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    margin-left: 12px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
