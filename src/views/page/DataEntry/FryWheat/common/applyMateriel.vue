<!--生产入库-->
<template>
  <div style="background:#e9e9e9;">
    <!--数据录入-->
    <el-row>
      <el-col :span="24">
        <div class="clearfix topBox">
          <div class="btn">
            <el-button type="primary" @click="AddMaterielData()" size="small" v-if="isRedact">新增</el-button>
            <el-button type="primary" @click="AddMaterielData()" size="small" v-else disabled>新增</el-button>
          </div>
        </div>
        <el-table
          ref="table1"
          header-row-class-name="tableHead"
          :data="materielDataList"
          :row-class-name="RowDelFlag"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            type="index"
            width="55"
            label="序号">
          </el-table-column>
          <el-table-column
            label="物料"
            width="150">
            <template slot-scope="scope">
              <!-- <div class="required">
                <i class="reqI">*</i>
                <el-select v-model="scope.row.expCode" placeholder="请选择"  v-if="!isRedact" size="small" disabled>
                  <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                </el-select>
                <el-select v-model="scope.row.expCode" placeholder="请选择" v-else size="small" @change="setnull(scope.row)">
                  <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                </el-select>
              </div> -->
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.materialNumber" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.materialNumber" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="粮仓"
            :show-overflow-tooltip="true"
            width="220">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-select v-model="scope.row.granaryNumber" placeholder="请选择"  v-if="!isRedact" size="small" disabled>
                  <el-option label="粮仓一" value="粮仓1#"></el-option>
                  <el-option label="粮仓二" value="粮仓2#"></el-option>
                </el-select>
                <el-select v-model="scope.row.granaryNumber" placeholder="请选择" v-else size="small" >
                  <el-option label="粮仓一" value="粮仓1#"></el-option>
                  <el-option label="粮仓二" value="粮仓2#"></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="物料批次">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.batchNumber" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.batchNumber" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="241"
            label="小麦领用数">
            <template slot-scope="scope">
              <div class="required">
                <i class="reqI">*</i>
                <el-input v-model="scope.row.wheatWeight" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                <el-input v-model="scope.row.wheatWeight" v-else size="small" placeholder="手工录入"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            width="80">
            <template slot-scope="scope">
              <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
              <span>{{ scope.row.unit = 'KG'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact" @click="dellistbomS(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toDate } from '@/net/validate'
export default {
  data () {
    return {
      materielDataList: []
    }
  },
  mounted () {
    this.GetMaterielData(this.orderNo)
  },
  props: {
    isRedact: {},
    orderNo: String
  },
  methods: {
    // 保存or提交
    saveOrSubmitMateriel (str, resolve) {
      if (this.materielDataList.length > 0) {
        console.log(this.materielDataList)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 获取异常数据
    GetMaterielData (id) {
      // this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: id}).then(({data}) => {
      //   if (data.code === 0) {
      //     this.ExcDate = data.listForm
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
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
    // 新增异常记录
    AddMaterielData () {
      this.materielDataList.push({
        orderNo: this.orderNo,
        recordId: this.uuid(),
        // 物料编码
        materielNumber: '',
        // 粮仓号
        granaryNumber: '',
        // 批次号
        batchNumber: '',
        wheatWeight: '',
        unit: '',
        delFlag: '0'
      })
      console.log('+++++++++++++++++++++= ' + this.materielDataList.length)
    },
    uuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'
      var uuid = s.join('')
      return uuid
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
