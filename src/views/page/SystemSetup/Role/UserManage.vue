<template>
  <el-dialog
    title="人员管理"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-row>
        <el-transfer
          filterable
          :titles="['未分配人员', '已分配人员']"
          :filter-method="filterMethod"
          filter-placeholder="请输入用户名称"
          v-model="value2"
          :data="userlist">
        </el-transfer>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="updatauser">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {SYSTEMSETUP_API} from '@/api/api'
import { transfer } from '@/net/validate'
export default {
  name: 'UserManage',
  data () {
    const generateData2 = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      data2: generateData2(),
      value2: [],
      filterMethod (query, item) {
        return item.screncon.indexOf(query) > -1
      },
      userlist: [],
      form: {},
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    init (id) {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'GET').then(({data}) => {
        if (data.code === 0) {
          this.userlist = transfer(data.page.list)
          console.log(this.userlist)
        }
      }).then(() => {
        this.visible = true
        if (id) {
        }
      })
    },
    updatauser () {
      console.log(this.value2)
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
