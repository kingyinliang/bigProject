<!--生产入库-->
<template>
  <div style="background:#e9e9e9;">
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <el-card >
          <!--录入-->
          <el-row :gutter="36">
            <el-col :span="8">
                <div class="stock-box">
                  <div class="stock-img"></div>
                  <div class="stock-text">1#麦粉计量仓</div>
                  <div class="clearfix"></div>
                  <div class="stock-button" @click="dialogFormVisible = true">入罐</div>
                </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">1#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button" @click="dialogFormVisible = true">入罐</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="stock-box">
                <div class="stock-img"></div>
                <div class="stock-text">1#麦粉计量仓</div>
                <div class="clearfix"></div>
                <div class="stock-button" @click="dialogFormVisible = true">入罐</div>
              </div>
            </el-col>
          </el-row>
          <!--table-->
          <el-row style="margin-top:20px;">
            <el-col>
              <el-table header-row-class-name="tableHead" :data="ExcDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
                <el-table-column label="日期" width="130">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-select v-model="scope.row.expCode" placeholder="请选择" :disabled="!isRedact" size="small">
                        <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="麦粉计量仓"
                  :show-overflow-tooltip="true"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
                  </template>
                </el-table-column>
                <el-table-column width="80" label="粮仓">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expStartDate" :disabled="!isRedact" size="small"></el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="90" label="起始">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate" :disabled="!isRedact" size="small"></el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结束" width="90">
                  <template slot-scope="scope">
                    <span>{{ scope.row.expContinue = mistiming(scope.row.expEndDate, scope.row.expStartDate, scope.row) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库数" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.expContinueUnit = 'MIN'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="80">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.deviceId" filterable  placeholder="设备" size="small" :disabled="!(isRedact && (scope.row.expCode === '001' || scope.row.expCode === '002'))" >
                      <el-option :label="item.deviceName" v-for="(item, index) in equipmentType" :key="index" :value="item.deviceNo"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="入库批次" width="150">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.materialShort" filterable placeholder="选择简称" :disabled="!(isRedact && (scope.row.expCode === '003' || scope.row.expCode === '004'))" size="small" >
                      <el-option :label="item.value" v-for="(item, index) in materialShort" :key="index" :value="item.code"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="操作人员" width="100">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.energy" placeholder="选择能源" :disabled="!(isRedact && scope.row.expCode === '005')"  size="small">
                      <el-option :label="item.value" v-for="(item, index) in enery" :key="index" :value="item.code"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" width="100">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--审批-->
    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card>
          <div style="margin-bottom:10px;">审核日志</div>
          <el-table header-row-class-name="tableHead" :data="ExcDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
            <el-table-column label="序号" width="150">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-select v-model="scope.row.expCode" placeholder="请选择" :disabled="!isRedact" size="small">
                    <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="审核动作"
              :show-overflow-tooltip="true"
              width="220">
              <template slot-scope="scope">
                <el-input v-model="scope.row.expInfo" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
              </template>
            </el-table-column>
            <el-table-column width="241" label="审核意见">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expStartDate" :disabled="!isRedact" size="small"></el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="241" label="审核人">
              <template slot-scope="scope">
                <div class="required">
                  <i class="reqI">*</i>
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate" :disabled="!isRedact" size="small"></el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="审核时间" width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.expContinue = mistiming(scope.row.expEndDate, scope.row.expStartDate, scope.row) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="1#麦粉计量仓入库" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="粮仓" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择粮仓">
            <el-option label="粮仓一" value="shanghai"></el-option>
            <el-option label="粮仓二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始(KG)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束(KG)" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库批次" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="操作时间" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="操作人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {SYSTEMSETUP_API, PACKAGING_API, BASICDATA_API} from '@/api/api'
import { toDate } from '@/net/validate'
export default {
  name: 'excRecord',
  data () {
    return {
      stoppageType: [],
      equipmentType: [],
      materialShort: [],
      enery: [],
      ExcDate: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.GetstoppageType()
    this.GetmaterialShort()
    this.Getenery()
  },
  props: {
    isRedact: {}
  },
  methods: {
    // 保存or提交
    saveOrSubmitExc (str, resolve) {
      if (this.ExcDate.length > 0) {
        console.log(this.ExcDate)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 获取异常数据
    GetExcDate (id) {
      this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: id}).then(({data}) => {
        if (data.code === 0) {
          this.ExcDate = data.listForm
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 异常记录校验
    excrul () {
      let ty = true
      this.ExcDate.forEach((item) => {
        if (item.delFlag !== '1') {
          if (item.expCode && item.expStartDate && item.expEndDate) {
            if ((item.expContinue * 1) < 0) {
              ty = false
              this.$message.error('异常开始时间大于结束时间')
              return false
            }
            if (item.expCode === '001' || item.expCode === '002') {
              if (!item.deviceId) {
                ty = false
                this.$message.error('异常记录设备必填')
                return false
              }
            } else if (item.expCode === '003' || item.expCode === '004') {
              if (!item.materialShort) {
                ty = false
                this.$message.error('异常记录物料分类必填')
                return false
              }
            } else if (item.expCode === '005') {
              if (!item.energy) {
                ty = false
                this.$message.error('异常记录能源必填')
                return false
              }
            }
          } else {
            ty = false
            this.$message.error('异常记录必填项未填')
            return false
          }
        }
      })
      return ty
    },
    // 获取异常情况
    GetstoppageType () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=stoppage_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.stoppageType = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取设备类型
    GetequipmentType (productLine) {
      this.$http(`${BASICDATA_API.DEVICELIST_API}`, 'POST', {
        param: '',
        deptId: productLine,
        currPage: '1',
        pageSize: '50'
      }).then(({data}) => {
        if (data.code === 0) {
          this.equipmentType = data.list.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取物料分类简称
    GetmaterialShort () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=MATERIAL_SHORT`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.materialShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取能源下拉
    Getenery () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ENERGY`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.enery = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增异常记录
    AddExcDate (form) {
      form.push({
        id: '',
        orderId: '',
        expCode: '',
        expInfo: '',
        expStartDate: null,
        expEndDate: null,
        expContinue: '',
        expContinueUnit: '',
        deviceId: '',
        materialShort: '',
        energy: '',
        remark: '',
        delFlag: '0'
      })
    },
    // 删除
    dellistbomS (row) {
      row.delFlag = '1'
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
  computed: {
    mistiming: function () {
      return function (end, start, row) {
        if (end && start && row.delFlag !== '1') {
          if (((toDate(end) - toDate(start)) / 60000) < 0) {
            this.$message.error('异常结束时间早于异常开始时间，请重新录入')
            return 'NaN'
          } else {
            return (toDate(end) - toDate(start)) / 60000
          }
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  .stock-box{
    height: 184px;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
    .stock-img{
      width:48px;
      height:48px;
      border-radius:24px;
      background:#FFBF00;
      float:left;
      margin-left:24px;
      margin-top:24px;
    }
    .stock-text{
      float:left;
      margin-left:20px;
      margin-top:30px;
      font-size:16px;
      font-weight:500;
      font-family:PingFangSC-Medium;
    }
    .stock-button{
      height:48px;
      margin-top:62px;
      font-size:14px;
      line-height:48px;
      text-align:center;
      border-top:1px solid #e9e9e9;
      border-radius: 0 0 2px 2px;
      color:rgba(0, 0, 0, 0.45);
      background:#F7F9FA;
      &:hover{
        color:#fff;
        background:#1890FF;
        cursor:pointer
      }
    }
  }
</style>
