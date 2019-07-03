<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <form-head :formHeader="formHeader"></form-head>
    </el-card>
    <el-card class="searchCard  newCard">
      <el-tabs ref='tabs' v-model="activeName" class="NewDaatTtabs" type="border-card">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            工艺控制
          </span>
          <el-form :inline="true" size="small" :model="formHeader" class="topform marbottom">
            <el-form-item label="原汁换热介质："></el-form-item>
            <el-form-item label="热水温度："></el-form-item>
            <el-form-item label="酱油温度："></el-form-item>
            <el-form-item label="原汁入锅温度："></el-form-item>
            <el-form-item label="升温开始时间："></el-form-item>
            <el-card class="searchCard  newCard">
              <el-form-item label="冷却开始时间："></el-form-item>
              <el-form-item label="机械温度："></el-form-item>
              <el-form-item label="出料温度："></el-form-item>
              <el-form-item label="数显温度："></el-form-item>
              <el-form-item label="冷却结束时间："></el-form-item>
            </el-card>
          </el-form>
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
      activeName: '1'
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
