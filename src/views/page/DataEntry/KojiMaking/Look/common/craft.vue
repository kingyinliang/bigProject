<template>
  <div>
    <el-card>
      <el-form :inline="true" size="small" label-width="120px">
        <el-form-item label="入曲检查：">
          <el-input style="width:171px"></el-input>
        </el-form-item>
        <el-form-item label="检查人：">
          <el-input style="width:171px"></el-input>
        </el-form-item>
        <el-form-item label="入曲开始时间：">
          <el-date-picker v-model="GendTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="入曲结束时间：">
          <el-date-picker v-model="GychaTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="htitle">看曲记录</div>
      <el-row style="line-height: 32px; margin-bottom:10px">
        <el-col :span="4">第（）套程序</el-col>
        <el-col :span="16">
          <el-radio v-model="radio" label="1">自动</el-radio>
          <el-radio v-model="radio" label="2">半自动</el-radio>
          <el-radio v-model="radio" label="3">手动</el-radio>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" style="float: right">读取数据</el-button>
          <el-button type="primary" size="small" style="float: right; margin-right:10px"> + 新增</el-button>
        </el-col>
      </el-row>
      <el-table border header-row-class-name="tableHead" :data="lookList">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="看曲时间"></el-table-column>
        <el-table-column label="风温实际"></el-table-column>
        <el-table-column label="品温实际"></el-table-column>
        <el-table-column label="风机风速"></el-table-column>
        <el-table-column label="风门/进风" width="85"></el-table-column>
        <el-table-column label="强排/反风" width="85"></el-table-column>
        <el-table-column label="加湿情况"></el-table-column>
        <el-table-column label="加热/冷却" width="85"></el-table-column>
        <el-table-column label="品温探头温度">
          <el-table-column label="上"></el-table-column>
          <el-table-column label="中"></el-table-column>
          <el-table-column label="下"></el-table-column>
        </el-table-column>
        <el-table-column label="温度计温度">
          <el-table-column label="外"></el-table-column>
          <el-table-column label="里"></el-table-column>
        </el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作人"></el-table-column>
        <el-table-column width=50>
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="del"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="htitle">加水量记录</div>
      <div>
        <div style="line-height:32px;">翻曲加水</div>
        <el-form :inline="true" size="small">
          <el-form-item label="起始数：">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="结束数：">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="加水量（L）：">
            <el-input size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div style="line-height:32px;">出曲加水</div>
        <el-form :inline="true" size="small">
          <el-form-item label="起始数：">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="结束数：">
            <el-input size="small"></el-input>
          </el-form-item>
          <el-form-item label="加水量（L）：">
            <el-input size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div class="htitle">感官评价记录</div>
      <el-table border header-row-class-name="tableHead" :data="assessList">
        <el-table-column prop="title"></el-table-column>
        <el-table-column label="U">
          <template slot-scope="scope">
            <el-select v-model="scope.row.U" placeholder="请选择" size="small" >
              <el-option v-for="item in Ulist" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="S">
          <template slot-scope="scope">
            <el-select v-model="scope.row.S" placeholder="请选择" size="small">
              <el-option v-for="item in Slist" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="A">
          <template slot-scope="scope">
            <el-select v-model="scope.row.A" placeholder="请选择" size="small">
              <el-option v-for="item in Alist" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <Abn-record></Abn-record>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'craft',
  data () {
    return {
      lookList: [{id: 1}],
      assessList: [{title: '一翻', U: 'U1'}, {title: '二翻', U: 'U3'}, {title: '出曲', U: 'U2'}],
      Ulist: [
        {value: 'U1', label: 'U1'},
        {value: 'U2', label: 'U2'},
        {value: 'U3', label: 'U3'},
        {value: 'U4', label: 'U4'},
        {value: 'U5', label: 'U5'}
      ],
      Slist: [
        {value: 'S1', label: 'S1'},
        {value: 'S2', label: 'S2'},
        {value: 'S3', label: 'S3'},
        {value: 'S4', label: 'S4'},
        {value: 'S5', label: 'S5'}
      ],
      Alist: [
        {value: 'A1', label: 'A1'},
        {value: 'A2', label: 'A2'},
        {value: 'A3', label: 'A3'},
        {value: 'A4', label: 'A4'},
        {value: 'A5', label: 'A5'}
      ]
    }
  },
  methods: {
    del () {}
  },
  components: {
    AbnRecord: resolve => {
      require(['@/views/components/abnRecord'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
</style>
