<template>
  <div>
    <el-row class="clearfix">
      <el-button type="primary" @click="SavedCraftControl(CraftControlDate)" size="small" :disabled="!isRedact" style="float: right">保存</el-button>
      <el-button type="primary" @click="SubmitCraftControl(CraftControlDate)" size="small" :disabled="!isRedact" style="float: right">提交</el-button>
    </el-row>
    <el-form :inline="true" :model="CraftControlDate" size="small" label-width="82px" class="topform">
      <el-form-item label="出曲开始时间：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="出曲结束时间：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="制曲时间：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="出曲品温：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="混合料温度：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="风速（R/min）：" label-width="125px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水用量：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水温度：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水浓度：" label-width="120px">
        <el-input v-model="CraftControlDate.start" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="操作人：" label-width="120px"></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'craftControl',
  data () {
    return {
      CraftControlDate: {}
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
