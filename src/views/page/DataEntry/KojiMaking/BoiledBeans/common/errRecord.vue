<template>
  <div>
    <el-card>
      <div class="htitle">
        <span class="lh32px">异常停机时间（MIN）</span>
        <el-button type="primary" size="small" style="float: right" @onclick="addrecord"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead" :data="errList">
        <el-table-column label="异常情况">
          <template slot-scope="scope">
            <el-select size="small">
              <el-option label="设备故障" value="normal"></el-option>
              <el-option label="小停机"></el-option>
              <el-option label="制程不良"></el-option>
              <el-option label="正常排产"></el-option>
              <el-option label="能源"></el-option>
              <el-option label="其他"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="异常描述"></el-table-column>
        <el-table-column label="异常开始时间"></el-table-column>
        <el-table-column label="异常结束时间"></el-table-column>
        <el-table-column label="异常时间"></el-table-column>
        <el-table-column label="单位"></el-table-column>
        <el-table-column label="设备">
          <template slot-scope="scope">
            <el-select size="small">
              <el-option label="风机"></el-option>
              <el-option label="绞龙"></el-option>
              <el-option label="转子泵"></el-option>
              <el-option label="其他"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="物料"></el-table-column>
        <el-table-column label="能源"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="a"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="line-height:32px; margin:10px 0; overflow:hidden;">
        <span style="width:100px;  float:left;">总停线时间：</span>
        <p style="width:147px; line-height:32px; border-bottom:solid 1px #D8D8D8; height:32px; float:left">2</p>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
</style>

<script>
export default {
  name: 'errRecord',
  data () {
    return {
      'errList': []
    }
  },
  methods: {
    addrecord () {
      this.errList.push({
        id: 1
      })
    }
  },
  components: {
  }
}
</script>
