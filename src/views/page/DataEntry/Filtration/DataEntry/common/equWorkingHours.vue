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
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog(item, '清洗')" :disabled="!isRedact">清洗</el-button>
              </el-col>
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog(item, '预涂')" :disabled="!isRedact">预涂</el-button>
              </el-col>
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog(item, '过滤')" :disabled="!isRedact">过滤</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-table :data="dataList" @row-dblclick="EditInfo" :row-class-name="rowDelFlag" border header-row-class-name="tableHead" style="margin-top:10px">>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="过滤机号" prop="deviceName" width="120"></el-table-column>
        <el-table-column label="工作内容" prop="content"></el-table-column>
        <el-table-column label="开始时间" prop="startTime" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="结束时间" prop="endTime" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="时长(H)" prop="timeLength"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作时间" prop="changed" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作人" prop="changer" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column width="50" fixed="right">
          <template slot-scope="scope">
            <el-button class="delBtn" type="text" icon="el-icon-delete" @click="DelRow(scope.row)" size="mini" :disabled="!isRedact || scope.row.status === 'checked' || scope.row.status === 'submit'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <audit-log :tableData="recordList"></audit-log>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false" custom-class='dialog__class' @keyup.enter.native="SaveDialog('workInfo')">
      <div slot="title" style="line-hight:59px">{{this.workInfo.deviceName}}</div>
      <el-form :model="workInfo" size="small" label-width="110px" :rules="workInforules" ref="workInfo">
        <el-form-item label="工作内容：">{{this.workInfo.content}}</el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker v-model="workInfo.startTime" type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker v-model="workInfo.endTime" type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="workInfo.remark" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveDialog('workInfo')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat, GetStatus } from '@/net/validate'
import { FILTRATION_API } from '@/api/api'
export default {
  name: 'equworkinghours',
  data () {
    return {
      orderId: '',
      dialogVisible: false,
      filterList: [],
      dataList: [],
      recordList: [],
      workInfo: {},
      workInforules: {
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      },
      equStatus: ''
    }
  },
  props: ['isRedact'],
  methods: {
    GetList (params) {
      this.orderId = params.orderId
      this.$http(`${FILTRATION_API.FILTER_EQUWORKINGHOURS_LIST}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.filterList = data.listInfo.filterList
          this.dataList = data.listInfo.machineList
          this.equStatus = GetStatus(data.listInfo.machineList)
          this.recordList = data.listInfo.record
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      }).finally(() => {
        this.$emit('setEquState', this.equStatus)
      })
    },
    Readyrules () {
      let ty = true
      let i = 0
      this.dataList.map((item) => {
        if (item.delFlag === '0') {
          i = 1
        }
      })
      if (i === 0) {
        ty = false
        this.$warning_SHINHO('请录入设备工时数据')
        return false
      }
      return ty
    },
    ShowDialog (item, content) {
      this.workInfo = {
        id: '',
        uid: this.uuid(),
        orderId: this.orderId,
        deviceName: item.deviceName,
        content: content,
        status: 'saved',
        filterMachineId: item.deviceId,
        startTime: '',
        endTime: '',
        delFlag: '0'
      }
      this.dialogVisible = true
    },
    SaveDialog (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.workInfo.timeLength = ((new Date(this.workInfo.endTime) - new Date(this.workInfo.startTime)) / 3600000).toFixed(2)
          this.workInfo.changed = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
          this.workInfo.changer = this.$store.state.user.realName + `(${this.$store.state.user.name})`
          this.workInfo.remark = this.workInfo.remark
          let currentRecord = []
          if (this.workInfo.hasOwnProperty('uid')) {
            // 新增行
            currentRecord = this.dataList.filter(data => data.uid === this.workInfo.uid)
          } else {
            // 原有行
            currentRecord = this.dataList.filter(data => data.id === this.workInfo.id)
          }
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], this.workInfo)
          } else {
            this.dataList.push(this.workInfo)
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    EditInfo (row) {
      if (this.isRedact === true && (row.status !== 'checked' && row.status !== 'submit')) {
        this.dialogVisible = true
        this.workInfo = Object.assign({}, row)
      }
    },
    DelRow (row) {
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = 1
      })
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === 1) {
        return 'rowDel'
      } else {
        return ''
      }
    },
    SaveEquWorking (resolve, reject) {
      this.$http(`${FILTRATION_API.FILTER_EQUWORKINGHOURS_SAVE}`, 'POST', this.dataList).then(({data}) => {
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
    },
    SubmitEquWorking (resolve, reject) {
      this.$http(`${FILTRATION_API.FILTER_EQUWORKINGHOURS_SUBMITONE}`, 'POST', {'orderId': this.orderId}).then(({data}) => {
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
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
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
</style>
