<template>
<div>
  <el-table ref="table1" :row-class-name="tableRowClassName" header-row-class-name="tableHead" :data="listbomP" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column width="240" :show-overflow-tooltip="true" label="物料">
      <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
    </el-table-column>
    <el-table-column prop="unit" label="单位" width="60"></el-table-column>
    <el-table-column prop="needNum" label="需求用量" width="90"></el-table-column>
    <el-table-column label="生产使用" width="135">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-input size="small" v-model="scope.row.productUseNum" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
          <el-input size="small" v-model="scope.row.productUseNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="本班损耗">
      <template slot-scope="scope">
        <el-input size="small" v-model="scope.row.classLoss" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
        <el-input size="small" v-model="scope.row.classLoss" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="不合格数">
      <template slot-scope="scope">
        <el-input size="small" v-model="scope.row.belowGradeNum" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
        <el-input size="small" v-model="scope.row.belowGradeNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="不良批次">
      <template slot-scope="scope">
        <el-input size="small" maxlength="10" v-model="scope.row.badBatch" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
        <el-input size="small" v-model="scope.row.badBatch" placeholder="手工录入" v-else disabled></el-input>
      </template>
    </el-table-column>
    <el-table-column label="厂家">
      <template slot-scope="scope">
        <el-input size="small" v-model="scope.row.factory" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
        <el-input size="small" v-model="scope.row.factory" placeholder="手工录入" v-else disabled></el-input>
      </template>
    </el-table-column>
    <el-table-column label="批次" :show-overflow-tooltip="true" width="90">
      <template slot-scope="scope">
        <span>{{scope.row.batch}}</span>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
        <el-input size="small" v-model="scope.row.remark" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
        <el-input size="small" v-model="scope.row.remark" v-else disabled></el-input>
      </template>
    </el-table-column>
  </el-table>
  <el-table ref="table1" header-row-class-name="tableHead" :data="listbomS" :row-class-name="RowDelFlag" border v-if="order.properties !== '二合一&礼盒产线'" tooltip-effect="dark" style="width: 100%;margin-bottom: 20px">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column width="120" label="物料（半成品）">
      <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
    </el-table-column>
    <el-table-column prop="unit" label="单位" width="60">
    </el-table-column>
    <el-table-column width="150" label="领用罐号">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-select v-model="scope.row.potNo" @change="HolderChange($event, scope.row)" placeholder="请选择" filterable v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small">
            <!-- <el-option :label="iteam.holderNo + iteam.typeName" :value="iteam.holderNo + iteam.typeName" v-for="iteam in finHolder" :key="iteam.holderId"></el-option> -->
            <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
          </el-select>
          <el-select v-model="scope.row.potNo" placeholder="请选择" filterable v-else disabled size="small">
            <!-- <el-option :label="iteam.holderName" :value="iteam.holderName" v-for="iteam in finHolder" :key="iteam.holderId"></!--> -->
            <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="190" label="过滤日期">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-date-picker size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.filterDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked') && order.factoryCode=== '6010'"></el-date-picker>
          <el-date-picker size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.filterDate" v-else disabled></el-date-picker>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="150" label="批次">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-input size="small" maxlength="10" v-model="scope.row.batch" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked') && order.factoryCode=== '6010'"></el-input>
          <el-input size="small" v-model="scope.row.batch" v-else disabled></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="120" label="生产使用量">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-input size="small" v-model="scope.row.productUseNum" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
          <el-input size="small" v-model="scope.row.productUseNum" v-else disabled></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="120" label="使用情况" v-if="order.factoryCode !== '6010'">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-select v-model="scope.row.useUsage" size="small" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')">
            <el-option v-for="(item, index) in useUsageList" :value="item" :label="item" :key="index"></el-option>
          </el-select>
          <el-select v-model="scope.row.useUsage" size="small" v-else disabled>
            <el-option v-for="(item, index) in useUsageList" :value="item" :label="item" :key="index"></el-option>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="库存量" width="120" v-if="order.factoryCode !== '6010'">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <!-- <el-input size="small" maxlength="10" v-model="scope.row.batch" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input> -->
          <el-input size="small" v-model="scope.row.surplusAmount" disabled></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="250" label="换罐时间">
      <template slot-scope="scope">
        <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.changePotDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-date-picker>
        <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.changePotDate" v-else disabled></el-date-picker>
      </template>
    </el-table-column>
    <el-table-column width="250" label="用完时间">
      <template slot-scope="scope">
        <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.usePotDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-date-picker>
        <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.usePotDate" v-else disabled></el-date-picker>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template slot-scope="scope">
        <el-input size="small" v-model="scope.row.remark" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
        <el-input size="small" v-model="scope.row.remark" v-else disabled></el-input>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="70">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="addSapS(listbomS, scope.row)" v-if="scope.row.isSplit === '0' && isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
        <el-button class="delBtn" type="text" icon="el-icon-delete" size="small" v-if="scope.row.isSplit === '1' && isRedact  && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='')" @click="dellistbomS(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <auditLog :tableData="SapAudit"></auditLog>
</div>
</template>

<script>
import {PACKAGING_API} from '@/api/api'
export default {
  name: 'listBom',
  data () {
    return {
      Sapstatus: '',
      finHolder: [],
      semiHolder: [],
      listbomP: [],
      listbomS: [],
      listbomSS: [],
      SapAudit: [],
      useUsageList: ['领用完', '转他用'],
      repertory: [],
      distinctListbomS: []
    }
  },
  props: {
    isRedact: {},
    order: {}
  },
  mounted () {
  },
  methods: {
    // 获取包装车间物料领用列表
    GetpkgSap (order, data) {
      if (data) {
        this.listbomP = data.listbomP
        this.listbomS = data.listbomS
        this.listbomSS = data.listbomS
        this.listbomS.forEach((item) => {
          item.isSplit = '0'
          item.delFlag = '0'
          item.id = ''
          item.orderId = data.list[0].orderId
        })
        this.listbomP.forEach((item) => {
          item.id = ''
          item.orderId = data.list[0].orderId
        })
      } else {
        this.$http(`${PACKAGING_API.PKGSPALIST_API}`, 'POST', {
          order_id: order.orderId,
          factory: order.factory
        }).then(({data}) => {
          if (data.code === 0) {
            this.listbomP = data.listFormP
            this.listbomS = data.listFormS
            this.listbomSS = JSON.parse(JSON.stringify(data.listFormS))
            this.SapAudit = data.listApproval
            let sub = 0
            let che = 0
            let no = 0
            let sav = 0
            this.listbomP.forEach((item) => {
              if (item.status === 'noPass') {
                no = no + 1
              } else if (item.status === 'submit') {
                sub = sub + 1
              } else if (item.status === 'checked') {
                che = che + 1
              } else if (item.status === 'saved') {
                sav = sav + 1
              }
            })
            this.listbomS.forEach((item) => {
              if (item.status === 'noPass') {
                no = no + 1
              } else if (item.status === 'submit') {
                sub = sub + 1
              } else if (item.status === 'checked') {
                che = che + 1
              } else if (item.status === 'saved') {
                sav = sav + 1
              }
              item.useUsage = item.useUsage ? item.useUsage : ''
              if (item.delFlag === '0' && item.holderId) {
                this.distinctListbomS.push(item.holderId)
              }
            })
            let set = new Set(this.distinctListbomS)
            Array.from(set).map(item => {
              if (!this.semiHolder.find(items => items.holderId === item)) {
                let total = 0
                this.listbomS.map((itemB) => {
                  if (itemB.holderId === item && itemB.delFlag === '0') {
                    total = total + itemB.productUseNum
                  }
                })
                let itemC = this.listbomS.find(itemD => itemD.holderId === item)
                this.semiHolder.push({
                  amount: total,
                  batch: itemC.batch,
                  fullDate: itemC.filterDate,
                  holderId: itemC.holderId,
                  holderName: itemC.holderName,
                  holderNo: '',
                  holderType: itemC.holderType,
                  materialCode: itemC.materialCode,
                  materialName: itemC.materialName
                })
              }
            })
            if (no > 0) {
              this.Sapstatus = 'noPass'
            } else if (sav > 0) {
              this.Sapstatus = 'saved'
            } else if (sub > 0) {
              this.Sapstatus = 'submit'
            } else if (che > 0) {
              this.Sapstatus = 'checked'
            }
            this.$emit('GetlistbomStatus', this.Sapstatus)
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 修改
    UpdateSap (str, resolve) {
      this.listbomP.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.listbomS.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
        // item.holderType = this.semiHolder.find(items => items.holderId === item.potNo).holderType
      })
      this.$http(`${PACKAGING_API.PKGSPAUPDATEP_API}`, 'POST', this.listbomP).then(({data}) => {
        this.$http(`${PACKAGING_API.PKGSPAUPDATES_API}`, 'POST', this.listbomS).then(({data}) => {
          if (resolve) {
            resolve('resolve')
          }
          if (data.code === 0) {
          } else {
            this.$notify.error({title: '错误', message: '物料领用' + data.msg})
          }
        })
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: '物料领用' + data.msg})
        }
      })
    },
    // 物料提交
    subSap (resolve) {
      this.$http(`${PACKAGING_API.PKGSAVEFORMP_API}`, 'POST', this.listbomP).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        this.$http(`${PACKAGING_API.PKGSAVEFORMS_API}`, 'POST', this.listbomS).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
          if (resolve) {
            resolve('resolve')
          }
        })
      })
    },
    // 校验
    saprul (st) {
      let ty = true
      // for (var i = 0; i < this.listbomS.length - 1; i++) {
      //   for (var j = i + 1; j < this.listbomS.length; j++) {
      //     if (this.listbomS[i].delFlag !== '1' && this.listbomS[j].delFlag !== '1') {
      //       if (this.listbomS[i].potNo !== '' && this.listbomS[i].batch !== '' && this.listbomS[j].potNo !== '' && this.listbomS[j].batch !== '' && this.listbomS[i].materialCode === this.listbomS[j].materialCode && this.listbomS[i].potNo === this.listbomS[j].potNo && this.listbomS[i].batch === this.listbomS[j].batch) {
      //         ty = false
      //         this.$message.error('存在重复批次，请核实')
      //         return false
      //       }
      //     }
      //   }
      // }
      if (st === 'submit') {
        this.listbomP.forEach((item) => {
          if (item.delFlag !== '1') {
            if (item.productUseNum === 0 || item.productUseNum) {
            } else {
              ty = false
              this.$warning_SHINHO('物料必填项未填')
              return false
            }
          }
        })
        // if (this.order.properties !== '二合一&礼盒产线') {
        //   for (var itema of this.listbomS) {
        //     if (itema.delFlag !== '1') {
        //       if (itema.potNo && itema.filterDate && itema.productUseNum && itema.batch) {
        //         if (!itema.useUsage && this.order.factoryCode !== '6010') {
        //           ty = false
        //           this.$warning_SHINHO('物料半成品必填项未填')
        //           return false
        //         }
        //       } else {
        //         ty = false
        //         this.$warning_SHINHO('物料半成品必填项未填')
        //         return false
        //       }
        //     }
        //   }
        // }
      }
      return ty
    },
    ListbomsRule (str) {
      let ty = true
      if (this.order.properties !== '二合一&礼盒产线') {
        for (var itema of this.listbomS) {
          if (itema.delFlag !== '1') {
            if (str === 'saved') {
              if (itema.potNo) {
                if (!this.ListbomsAllMustFill(itema)) {
                  return false
                }
              }
            } else {
              if (!this.ListbomsAllMustFill(itema)) {
                return false
              }
            }
          }
        }
      }
      return ty
    },
    ListbomsAllMustFill (item) {
      let ty = true
      if (item.potNo && item.filterDate && item.productUseNum && item.batch) {
        if (!item.useUsage && this.order.factoryCode !== '6010') {
          ty = false
          this.$warning_SHINHO('物料半成品必填项未填')
          return false
        }
      } else {
        ty = false
        this.$warning_SHINHO('物料半成品必填项未填')
        return false
      }
      let holderId
      this.repertory = []
      this.repertoryS = []
      this.listbomSS.map(item => {
        if (item.holderType === '006' && item.delFlag === '0') {
          let sole = ''
          sole = this.repertoryS.find(items => items.holderId === item.potNo)
          holderId = item.potNo
          if (sole) {
            sole.total = Number(sole.total) + Number(item.productUseNum)
          } else {
            this.repertoryS.push({
              holderId: holderId,
              total: item.productUseNum ? item.productUseNum : 0
            })
          }
        }
      })
      this.listbomS.map(item => {
        if (item.holderType === '006' && item.delFlag === '0') {
          let sole = ''
          sole = this.repertory.find(items => items.holderId === item.potNo)
          holderId = item.potNo
          if (sole) {
            sole.total = Number(sole.total) + Number(item.productUseNum)
          } else {
            this.repertory.push({
              holderId: holderId,
              total: item.productUseNum ? item.productUseNum : 0
            })
          }
        }
      })
      for (let items of this.repertory) {
        let amount = 0
        if (this.repertoryS.find(sos => sos.holderId === items.holderId)) {
          amount = this.repertoryS.find(sos => sos.holderId === items.holderId).total + this.semiHolder.find(so => so.holderId === items.holderId).amount
        } else {
          amount = this.semiHolder.find(so => so.holderId === items.holderId).amount
        }
        if (items.total > amount) {
          ty = false
          this.$warning_SHINHO(this.semiHolder.find(so => so.holderId === items.holderId).holderName + '罐生产使用量超过库存，请重新调整')
          return false
        }
      }
      return ty
    },
    ListbomsRule_BackUp (str) {
      let ty = true
      if (this.order.properties !== '二合一&礼盒产线') {
        for (var itema of this.listbomS) {
          if (itema.delFlag !== '1') {
            if (itema.potNo && itema.filterDate && itema.productUseNum && itema.batch) {
              if (!itema.useUsage && this.order.factoryCode !== '6010') {
                ty = false
                this.$warning_SHINHO('物料半成品必填项未填')
                return false
              }
            } else {
              ty = false
              this.$warning_SHINHO('物料半成品必填项未填')
              return false
            }
          }
        }
      } else {
        let holderId
        this.repertory = []
        this.repertoryS = []
        this.listbomSS.map(item => {
          if (item.holderType === '006' && item.delFlag === '0') {
            let sole = ''
            sole = this.repertoryS.find(items => items.holderId === item.potNo)
            holderId = item.potNo
            if (sole) {
              sole.total = Number(sole.total) + Number(item.productUseNum)
            } else {
              this.repertoryS.push({
                holderId: holderId,
                total: item.productUseNum ? item.productUseNum : 0
              })
            }
          }
        })
        this.listbomS.map(item => {
          if (item.holderType === '006' && item.delFlag === '0') {
            let sole = ''
            // if (item.id === '') {
            sole = this.repertory.find(items => items.holderId === item.potNo)
            holderId = item.potNo
            // } else {
            //   sole = this.repertory.find(items => items.holderId === item.holderId)
            //   holderId = item.holderId
            // }
            if (sole) {
              sole.total = Number(sole.total) + Number(item.productUseNum)
            } else {
              this.repertory.push({
                holderId: holderId,
                total: item.productUseNum ? item.productUseNum : 0
              })
            }
          }
        })
        for (let items of this.repertory) {
          let amount = 0
          if (this.repertoryS.find(sos => sos.holderId === items.holderId)) {
            amount = this.repertoryS.find(sos => sos.holderId === items.holderId).total + this.semiHolder.find(so => so.holderId === items.holderId).amount
          } else {
            amount = this.semiHolder.find(so => so.holderId === items.holderId).amount
          }
          // console.log(items.holderId + ' total: ' + items.total + ' amount: ' + amount)
          if (items.total > amount) {
            ty = false
            this.$warning_SHINHO(this.semiHolder.find(so => so.holderId === items.holderId).holderName + '罐生产使用量超过库存，请重新调整')
            return false
          }
        }
      }
      return ty
    },
    // 获取罐
    GetPot (id, orderNo) {
      /*
      // 成品罐
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', {
        factory: id,
        type: 'holder_type',
        holder_type: '007',
        pageSize: 9999,
        workShopName: this.order.workShopName,
        currPage: 1
      }).then(({data}) => {
        if (data.code === 0) {
          this.finHolder = data.page.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
      // 半成品罐
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', {
        factory: id,
        type: 'holder_type',
        holder_type: '006',
        pageSize: 9999,
        workShopName: this.order.workShopName,
        currPage: 1
      }).then(({data}) => {
        if (data.code === 0) {
          this.semiHolder = data.page.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    */
      this.$http(`${PACKAGING_API.PKGSAVEMATERIALHOLDER_API}`, 'POST', {factory: id, orderNo: orderNo}).then(({data}) => {
        if (data.code === 0) {
          this.semiHolder = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    HolderChange (val, row) {
      let semiInfo = this.semiHolder.find(item => item.holderId === val)
      row.filterDate = semiInfo.fullDate
      row.batch = semiInfo.batch
      row.holderType = semiInfo.holderType
      row.surplusAmount = semiInfo.amount.toString()
    },
    // 删除半成品
    dellistbomS (row, num) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = '1'
        num++
      })
    },
    // 新增物料半成品
    addSapS (form, row) {
      form.push({
        batch: '',
        orderId: this.order.orderId,
        status: '',
        id: '',
        materialCode: row.materialCode,
        materialName: row.materialName,
        unit: row.unit,
        potNo: '',
        filterDate: null,
        productUseNum: '',
        changePotDate: null,
        usePotDate: null,
        isSplit: '1',
        delFlag: '0',
        useUsage: ''
      })
    },
    // tableRowClassName
    tableRowClassName ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'warning-row'
      }
      return ''
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    }
  },
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
