<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <form-head :formHeader="formHeader"></form-head>
    </el-card>
    <el-card class="searchCard  newCard">
      <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            辅料添加
          </span>
          <el-card class="newCard">
            <div class="clearfix" style="padding-top: 5px;padding-bottom: 5px">
              <h3 style="line-height: 32px">辅料添加记录</h3>
              <el-button type="primary" size="mini" style="float: right">添加完成</el-button>
            </div>
            <el-table header-row-class-name="tableHead" :data="AddDate" border tooltip-effect="dark">
              <el-table-column type="index" width="55" label="序号"></el-table-column>
              <el-table-column label="添加状态" width="150"></el-table-column>
              <el-table-column label="物料" width="150"></el-table-column>
              <el-table-column label="需求数量" width="150"></el-table-column>
              <el-table-column label="单位" width="150"></el-table-column>
              <el-table-column label="操作" width="150"></el-table-column>
              <el-table-column width="140">
                <template slot="header"><i class="reqI">*</i><span>批次</span></template>
                <template slot-scope="scope"></template>
              </el-table-column>
              <el-table-column label="领用数量" width="150"></el-table-column>
              <el-table-column label="备注" width="140">
                <template slot-scope="scope"></template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="newCard">
            <div class="clearfix" style="padding-top: 5px;padding-bottom: 5px">
              <h3 style="line-height: 32px">增补料记录</h3>
              <el-button type="primary" size="mini" style="float: right">添加完成</el-button>
            </div>
            <el-table header-row-class-name="tableHead" :data="AddDate" border tooltip-effect="dark">
              <el-table-column type="index" width="55" label="序号"></el-table-column>
              <el-table-column label="添加状态" width="150"></el-table-column>
              <el-table-column label="物料" width="150"></el-table-column>
              <el-table-column label="添加数量" width="150"></el-table-column>
              <el-table-column label="单位" width="150"></el-table-column>
              <el-table-column label="操作" width="150"></el-table-column>
              <el-table-column width="140">
                <template slot="header"><i class="reqI">*</i><span>批次</span></template>
                <template slot-scope="scope"></template>
              </el-table-column>
              <el-table-column label="领用数量" width="150"></el-table-column>
              <el-table-column label="备注" width="140">
                <template slot-scope="scope"></template>
              </el-table-column>
            </el-table>
          </el-card>
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
      AddDate: [{}]
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
