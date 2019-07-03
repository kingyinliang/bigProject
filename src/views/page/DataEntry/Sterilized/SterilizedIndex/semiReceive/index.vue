<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <form-head :formHeader="formHeader"></form-head>
    </el-card>
    <el-card class="searchCard  newCard">
      <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            原汁领用
          </span>
          <el-table header-row-class-name="tableHead" :data="MaterialDate" border tooltip-effect="dark">
            <el-table-column type="index" width="55" label="序号"></el-table-column>
            <el-table-column label="领用物料" width="150"></el-table-column>
            <el-table-column label="单位" width="50"></el-table-column>
            <el-table-column label="计划领料" width="140"></el-table-column>
            <el-table-column label="操作" width="80">
              <el-button type="text" size="mini"><i class="icons iconfont factory-chaifen" :disabled="!isRedact"></i>拆分</el-button>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>罐号</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>批次</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header"><i class="reqI">*</i><span>实际领料</span></template>
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column label="备注" width="140">
              <template slot-scope="scope"></template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            异常记录
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            文本记录
          </span>
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
export default {
  name: 'index',
  data () {
    return {
      isRedact: false,
      formHeader: {},
      activeName: '1',
      MaterialDate: [{}]
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {
    ExcRecord,
    TextRecord,
    FormHead: resolve => {
      require(['../components/formHead'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
