<template>
  <div>
    <div class="inStorage_card">
      <div style="width: 158px" class="inStorage_card_left">
        <p>半成品罐</p>
        <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
        <el-button type="text" class="button" size="small" :disabled="!(isRedact && (orderStatus !== 'submit' && orderStatus !== 'checked'))" @click="ShowDialog()">入罐</el-button>
      </div>
      <div style="flex: 1">
        <el-table header-row-class-name="tableHead" :data="InStorageDate" border tooltip-effect="dark" @row-dblclick="updateRow" >
          <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="物料" prop="date"  :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="半成品罐号" width="95" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="物料批次" width="95" prop="batch" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="领用数" width="90" prop="inAmount" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作时间" width="100" prop="changed" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作人" width="80" prop="changer" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="orderStatus" width="50">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row)" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-card style="margin-top: 25px">
      <audit-log :tableData="readAudit"></audit-log>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="450px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">{{this.dialog.holderNo}} 类别判定</div>
      <el-form :model="dialog" size="small" label-width="160px" :rules="dialogrules" ref="dialog">
        <el-form-item label="过滤前温度(℃)：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="过滤前压力(Mpa)：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="感官指标有无异常：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="回压数量(方)：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="助滤剂预涂量(kg)：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="助滤剂添加量(kg)：">
          <el-input v-model="dialog.frozenStatus" style="width:220px"></el-input>
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
  name: 'material',
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
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.inStorage_card{
  display: flex;
  .button {
    border:none; background:none;
    padding: 0px;
    width: 100%;
    line-height: 32px;
    margin-top: 10px;
    background: #f7f9fa;
  }
  &_left{
    padding: 0;
    margin-right: 5px;
    width:158px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 4px 0px rgba(0,0,0,0.09);
    border-radius:6px;
    border:1px solid rgba(0,0,0,0.09);
    p{
      padding: 10px;
      font-size: 14px;
    }
    &_btn{
      width: 100%;
      margin-top: 10px;
      background: #F7F9FA;
    }
  }
}
</style>
