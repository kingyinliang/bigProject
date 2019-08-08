<template>
  <div>
    <el-card style="margin-bottom: 10px;position: relative" class="newCard">
      <el-form :inline="true" :model="readyTimeDate" ref="timesForm" size="small" label-width="125px">
        <el-row class="clearfix">
          <h3 style="font-size: 14px;line-height: 32px;font-weight: bold;float: left">准备时间（分钟：min）</h3>
          <el-form-item label="班次：" style="float: right;margin-right: 0px;margin-bottom: 10px">
            <el-select size="mini" style="width: 130px" v-model="readyTimeDate.classes" placeholder="请选择" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))">
              <el-option label="白班" value="白班"></el-option>
              <el-option label="中班" value="中班"></el-option>
              <el-option label="夜班" value="夜班"></el-option>
              <el-option label="多班" value="多班"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div class="manHourReadyBox">
          <el-row v-if="readyTimeDate.classes === '白班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
            <el-form-item label="交接班（白班）：">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.dayChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="班前会：" label-width="80px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.dayChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.dayChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.dayChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="readyTimeDate.classes === '中班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
            <el-form-item label="交接班（中班）：">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.midChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="班前会：" label-width="80px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.midChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.midChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.midChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="readyTimeDate.classes === '夜班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
            <el-form-item label="交接班（夜班）：">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.nightChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="班前会：" label-width="80px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.nightChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.nightChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：" label-width="100px">
              <el-input size="mini" style="width: 130px" v-model="readyTimeDate.nightChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="交接班事项：" label-width="100px">
              <el-input type="textarea" size="mini" style="width: 870px;" :rows="3"  v-model="readyTimeDate.nightChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
            </el-form-item>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <el-card style="margin-bottom: 10px;position: relative" class="newCard">
      <h3 style="font-size: 14px;line-height: 32px;font-weight: bold;float: none">设备时间（分钟：min）</h3>
      <el-row type="flex">
        <el-col style="width:160px">
          <div class="equ">
            <img src="@/assets/img/bottle.png" style="width:154px">
            <el-row class="equ_btn_row">
              <el-col :span="12" class="equ_btn">吹瓶</el-col>
              <el-col :span="12" class="equ_btn" style="border-left: 1px solid #eeeeee;">上瓶</el-col>
            </el-row>
          </div>
        </el-col>
        <el-col>
          <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="班次" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
            <el-table-column label="工作内容" :show-overflow-tooltip="true" prop="kjmWorkShopName"></el-table-column>
            <el-table-column label="开始时间" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="100"></el-table-column>
            <el-table-column label="结束时间" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="100"></el-table-column>
            <el-table-column label="时长" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
            <el-table-column label="备注" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
            <el-table-column label="操作时间" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
            <el-table-column label="操作人" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
            <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="80"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <auditLog :tableData="TimeAudit"></auditLog>
    <el-dialog width="400px" title="吹瓶" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="Confirmed()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="班次：">
          <el-select size="mini" v-model="dataForm.classes" placeholder="请选择" :disabled="!(isRedact)">
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作内容：">
          <el-input v-model="dataForm.batch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd  HH:mm:ss" format="yyyy-MM-dd  HH:mm" v-model="dataForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker size="mini" type="datetime" value-format="yyyy-MM-dd  HH:mm:ss" format="yyyy-MM-dd  HH:mm" v-model="dataForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dataForm.remark" placeholder="手工录入" size="mini"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'readyTimes',
  data () {
    return {
      visible: false,
      readyTimeDate: {
        id: '',
        status: '',
        classes: '多班',
        dayChange: '',
        dayChangeBefore: '',
        dayChangePre: '',
        dayChangeAfter: '',
        midChange: '',
        midChangeBefore: '',
        midChangePre: '',
        midChangeAfter: '',
        nightChange: '',
        nightChangeBefore: '',
        nightChangePre: '',
        nightChangeAfter: ''
      },
      dataList: [],
      TimeAudit: [],
      dataForm: {},
      dataRule: {}
    }
  },
  props: {
    isRedact: {
      type: Boolean,
      default () { return false }
    },
    productShift: {
      type: Array
    }
  },
  mounted () {
  },
  methods: {
    Confirmed () {}
  },
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.equ{
  width: 154px;
  height: 246px;
  position: relative;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin-right: 5px;
  box-shadow:0px 4px 4px 0px rgba(0,0,0,0.09);
  overflow: hidden;
  img{
    margin-top: 40px;
  }
  &_btn{
    cursor: pointer;
    font-size: 14px;
    border-top: 1px solid #eeeeee;
    text-align: center;
    line-height: 40px;
    color: black;
    &_row{
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    &:hover{
      background: #1890FF;
      color: white;
    }
  }
}
</style>
