<template>
<el-col>
  <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="70px" v-if="!lablewidth">
    <el-form-item label="工厂：">
      <el-select v-model="plantList.factory" placeholder="请选择">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="车间：">
      <el-select v-model="plantList.workshop" placeholder="请选择">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产线：">
      <el-select v-model="plantList.productline" placeholder="产线">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="100px" v-if="lablewidth">
    <el-form-item label="工厂：">
      <el-select v-model="plantList.factory" placeholder="请选择">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="车间：">
      <el-select v-model="plantList.workshop" placeholder="请选择">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产线：">
      <el-select v-model="plantList.productline" placeholder="产线">
        <el-option label="请选择"  value=""></el-option>
        <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</el-col>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'linkage',
  data () {
    return {
      factory: [],
      workshop: [],
      productline: []
    }
  },
  watch: {
    'plantList.factory' (n, o) {
      this.Getdeptbyid(n)
    },
    'plantList.workshop' (n, o) {
      if (n) {
        this.GetParentline(n)
      }
    }
  },
  props: {
    plantList: {},
    lablewidth: {}
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.plantList.workshop = ''
      this.plantList.productline = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '包装 组装'}).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 获取产线
    GetParentline (id) {
      this.plantList.productline = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: id}).then(({data}) => {
          if (data.code === 0) {
            this.productline = data.childList
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
