<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content">
            <el-row style="flex-grow:1">
              <el-col :span="10" style="padding-left:16px;">
                <div class="title">1# 过滤机</div>
                <div class="content">
                  请点击下方操作按钮，<br>进行相应操作
                </div>
              </el-col>
              <el-col :span="14"></el-col>
            </el-row>
            <el-row class="footer">
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog('清洗')">清洗</el-button>
              </el-col>
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog('预涂')">预涂</el-button>
              </el-col>
              <el-col :span="8">
                <el-button class="button" @click="ShowDialog('过滤')">过滤</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content">2</div></el-col>
      </el-row>
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="过滤机号" prop="orderStatus"></el-table-column>
        <el-table-column label="工作内容" prop="orderStatus"></el-table-column>
        <el-table-column label="开始时间" prop="orderStatus"></el-table-column>
        <el-table-column label="结束时间" prop="orderStatus"></el-table-column>
        <el-table-column label="时长" prop="orderStatus"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作时间" prop="orderStatus"></el-table-column>
        <el-table-column label="操作人" prop="orderStatus"></el-table-column>
        <el-table-column prop="orderStatus" width="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <audit-log :tableData="readAudit"></audit-log>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="400px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">{{this.dialog.holderNo}} 类别判定</div>
      <el-form :model="dialog" size="small" label-width="110px" :rules="dialogrules" ref="dialog">
        <el-form-item label="工作内容：">{{this.dialog.ferOrderNo}}</el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker v-model="dialog.value1" type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker v-model="dialog.value1" type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SaveDialog('dialog')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'equworkinghours',
  data () {
    return {
      dialogVisible: false,
      dialog: {},
      dataList: ['1'],
      readAudit: ['2']
    }
  },
  methods: {
    ShowDialog () {
      this.dialogVisible = true
    },
    SaveDialog () {
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
