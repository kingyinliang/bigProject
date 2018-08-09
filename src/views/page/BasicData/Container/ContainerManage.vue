<template>
    <div>
      <div class="topTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
          <el-breadcrumb-item>容器管理</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>容器管理</h3>
      </div>
      <div class="main">
        <el-card>
          <h3>容器管理列表</h3>
          <el-row type="flex">
            <el-col>
              <el-form :inline="true" :model="form" size="small" label-width="68px" class="topforms1">
                <el-form-item label="容器类型">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="容器号">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="容器量">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="归属车间">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style="width: 275px">
              <el-button size="small">查询</el-button>
              <el-button size="small">新增</el-button>
              <el-button size="small" @click="remove">批量删除</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="list"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="holderType"
                label="容器类型"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderNo"
                label="容器号"
                width="95">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="容器描述">
              </el-table-column>
              <el-table-column
                prop="holderHold"
                label="容器量"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderPatch"
                label="批数"
                width="95">
              </el-table-column>
              <el-table-column
                prop="holderArea"
                label="物理区域"
                width="95">
              </el-table-column>
              <el-table-column
                prop="deptId"
                label="归属车间"
                width="95">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="update(scope.$index,tableData3)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </div>
    </div>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'ContainerManage',
  data () {
    return {
      form: {},
      list: []
    }
  },
  mounted () {
    this.GetContainerList()
  },
  methods: {
    // 获取容器列表
    GetContainerList (obj) {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'GET', obj).then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          this.list = data
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 编辑
    update () {},
    // 删除
    remove () {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
<style lang="scss">
.main{
  h3{
    font-size: 16px;
    font-weight: bold;
    line-height: 38px;
    margin-bottom: 10px;
  }
}
.topforms1{
  input{
    width: 140px!important;
  }
}
</style>
