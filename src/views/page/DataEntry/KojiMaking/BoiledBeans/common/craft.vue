<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="craftfrom" size="small" label-width="110px">
        <el-form-item label="预热开始时间：">
          <el-date-picker v-model="craftfrom.preheatDate" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="下料开始时间：">
          <el-date-picker v-model="craftfrom.unloadingStartDate" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="下料结束时间：">
          <el-date-picker v-model="craftfrom.unloadingEndDate" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="预热时间：">
          <el-date-picker v-model="craftfrom.preheatTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="htitle">煮豆沥水参数设置</div>
      <el-form :inline="true" size="small" label-width="136px" :model="craftfrom">
        <el-form-item label="润水比例:">
          <el-input class="liInputWidth" v-model="craftfrom.rateRunWater"></el-input>
        </el-form-item>
        <el-form-item label="润水温度(°C):">
          <el-input class="liInputWidth" v-model="craftfrom.tempRunWater"></el-input>
        </el-form-item>
        <el-form-item label="润水变频(HZ):">
          <el-input class="liInputWidth" v-model="craftfrom.frequenceRunWater"></el-input>
        </el-form-item>
        <el-form-item label="实际比例:">
          <el-input class="liInputWidth" v-model="craftfrom.realRate"></el-input>
        </el-form-item>
        <el-form-item label="润水总量(L):">
          <el-input class="liInputWidth" v-model="craftfrom.weightRunWater"></el-input>
        </el-form-item>
        <el-form-item label="润水流速(L/h):">
          <el-input class="liInputWidth" v-model="craftfrom.speedRunWater"></el-input>
        </el-form-item>
        <el-form-item label="一次预热变频:">
          <el-input class="liInputWidth" v-model="craftfrom.oncePreheatFrequency"></el-input>
        </el-form-item>
        <el-form-item label="二次预热变频:">
          <el-input class="liInputWidth" v-model="craftfrom.secondPreheatFrequency"></el-input>
        </el-form-item>
        <el-form-item label="二次预热温度:">
          <el-input class="liInputWidth" v-model="craftfrom.secondPreheatTemp"></el-input>
        </el-form-item>
        <el-form-item label="下料速度(KG/H):">
          <el-input class="liInputWidth" v-model="craftfrom.unloadingSpeed"></el-input>
        </el-form-item>
      </el-form>
      <div class="htitle">
        <span class="lh32px">过程监控数据记录</span>
        <el-button type="primary" size="small" style="float: right" @click="addlishui"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead" :data="lishuiList">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="观察时间" width="185">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.guardDate" type="datetime" placeholder="选择时间" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="润水/°C">
          <template slot-scope="scope">
            <el-input v-model="scope.row.runWaterTemp" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="预热/°C">
          <template slot-scope="scope">
            <el-input v-model="scope.row.preheatTemp" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="下料量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unloadingWeight" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="润水速度L/h" width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.runWaterSpeed" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="changer" width="140"></el-table-column>
        <el-table-column label="操作时间" prop="changed" width="160"></el-table-column>
        <el-table-column width="50" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger"  @click="dellishui(scope.row)" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="audit"><span>异常情况记录</span></div>
        <div><el-input type="textarea" class="textarea" v-model="craftfrom.cookingException" style="width: 100%;height:90px"></el-input></div>
      </div>
    </el-card>
    <el-card>
      <div class="htitle">连续蒸煮记录</div>
      <el-form :inline="true" size="small" :model="craftfrom">
        <el-form-item label="蒸煮变频(HZ):">
          <el-input v-model="craftfrom.cookingFrequency"></el-input>
        </el-form-item>
        <el-form-item label="上转阀变频(HZ):">
          <el-input v-model="craftfrom.upFrequency"></el-input>
        </el-form-item>
        <el-form-item label="下转阀变频(HZ):">
          <el-input v-model="craftfrom.downFrequency"></el-input>
        </el-form-item>
      </el-form>
      <div class="htitle">
        <span class="lh32px">过程监控数据记录</span>
        <el-button type="primary" @click="addzhengzhu" size="small" style="float: right"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead" :data="zhengzhuList">
        <el-table-column label="观察时间" width="185">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.guardTime" type="datetime" placeholder="选择时间" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="压力/Mpa">
          <el-table-column label="蒸煮数显">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cookingPress" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="蒸煮机械">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cookingMachinePress" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="分汽包">
            <template slot-scope="scope">
              <el-input v-model="scope.row.separateDrum" size="small"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="温度/°C">
          <el-table-column label="蒸煮数显">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cookingTemp" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="蒸煮机械">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cookingMachineTemp" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="上转阀冷却" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.upCooling" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="下转阀冷却" width="100">
            <template slot-scope="scope">
              <el-input v-model="scope.row.downCooling" size="small"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作人" prop="changer" width="140"></el-table-column>
        <el-table-column label="操作时间" prop="changed" width="160"></el-table-column>
        <el-table-column width="50" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" @click="delzhengzhu(scope.row)" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="audit"><span>异常情况记录</span></div>
        <div><el-input type="textarea" v-model="craftfrom.continuousCookingException" class="textarea" style="width: 100%;height:90px"></el-input></div>
      </div>
    </el-card>
    <el-card>
      <div class="htitle">
        <span class="lh32px">混合入曲控制</span>
        <el-button type="primary" size="small" @click="addhunhe" style="float: right"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead" :data="hunheList">
        <el-table-column label="* 观察时间" width="185">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.guardDate" type="datetime" placeholder="选择时间" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="* 混合料/°C">
          <template slot-scope="scope">
            <el-input v-model="scope.row.mixtureTemp" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="* 接种/°C">
          <template slot-scope="scope">
            <el-input v-model="scope.row.inoculationTemp" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="* 煮豆感官">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cookingFeel" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-button type="danger" @click="delhunhe(scope.row)" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="audit"><span>异常情况记录</span></div>
        <div><el-input type="textarea" v-model="craftfrom.blendException" class="textarea" style="width: 100%;height:90px"></el-input></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { dateFormat } from '@/net/validate'
import { KJM_API } from '@/api/api'
export default {
  name: 'caraft',
  data () {
    return {
      ids: '',
      craftfrom: {
        orderHouseId: '', // 拿参
        preheatDate: '',
        unloadingStartDate: '',
        unloadingEndDate: '',
        preheatTime: '',
        rateRunWater: '',
        tempRunWater: '',
        frequenceRunWater: '',
        realRate: '',
        weightRunWater: '',
        speedRunWater: '',
        oncePreheatFrequency: '',
        secondPreheatFrequency: '',
        secondPreheatTemp: '',
        unloadingSpeed: '',
        cookingException: '',
        continuousCookingException: '',
        blendException: ''
      },
      lishuiList: [],
      zhengzhuList: [],
      hunheList: []
    }
  },
  mounted () {
    this.getuuid()
  },
  methods: {
    craftrul () {
      let ty = true
      if (this.craftfrom.preheatDate === '' || this.craftfrom.preheatDate === null) {
        ty = false
        this.$message.error('预热开始时间不能为空')
        return false
      }
      if (this.craftfrom.unloadingStartDate === '' || this.craftfrom.unloadingStartDate === null) {
        ty = false
        this.$message.error('下料开始时间不能为空')
        return false
      }
      if (this.craftfrom.unloadingEndDate === null || this.craftfrom.unloadingEndDate === '') {
        ty = false
        this.$message.error('下料结束时间不能为空')
        return false
      }
      if (this.craftfrom.rateRunWater.length === 0 || this.craftfrom.tempRunWater.length === 0 || this.craftfrom.frequenceRunWater.length === 0 || this.craftfrom.realRate.length === 0 || this.craftfrom.weightRunWater.length === 0 || this.craftfrom.speedRunWater.length === 0 || this.craftfrom.oncePreheatFrequency.length === 0 || this.craftfrom.secondPreheatFrequency.length === 0 || this.craftfrom.secondPreheatTemp.length === 0 || this.craftfrom.unloadingSpeed.length === 0) {
        ty = false
        this.$message.error('煮豆沥水参数不能为空')
        return false
      }
      if (this.craftfrom.cookingFrequency.length === 0 || this.craftfrom.upFrequency.length === 0 || this.craftfrom.downFrequency.length === 0) {
        ty = false
        this.$message.error('连续蒸煮参数不能为空')
        return false
      }
      this.hunheList.forEach((item) => {
        if (item.guardDate === undefined || item.guardDate === null || item.mixtureTemp === undefined || item.inoculationTemp === undefined || item.cookingFeel === undefined) {
          ty = false
          this.$message.error('混合入曲控制必填项未填')
          return false
        }
      })
      return ty
    },
    getuuid () {
      this.ids = this.uuid()
    },
    updatezhu (resolve, reject) {
      this.craftfrom.id = this.ids
      this.$http(`${KJM_API.DOUGONGYIZHUSAVE_API}`, 'POST', this.craftfrom).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    updatelishui (resolve, reject) {
      this.$http(`${KJM_API.DOUGONGYIRUISAVE_API}`, 'POST', this.lishuiList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    updatezhengzhu (resolve, reject) {
      this.zhengzhuList.beanTechId = this.ids
      this.$http(`${KJM_API.DOUGONGYIZHENGSAVE_API}`, 'POST', this.zhengzhuList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    updatehunhe (resolve, reject) {
      this.hunheList.beanTechId = this.ids
      this.$http(`${KJM_API.DOUGONGYIHUNSAVE_API}`, 'POST', this.hunheList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    addlishui () {
      this.lishuiList.push({
        beanTechId: this.ids,
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    },
    dellishui (row) {
      this.lishuiList.splice(this.lishuiList.indexOf(row), 1)
    },
    addzhengzhu () {
      this.zhengzhuList.push({
        beanTechId: this.ids,
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    },
    delzhengzhu (row) {
      this.zhengzhuList.splice(this.zhengzhuList.indexOf(row), 1)
    },
    addhunhe () {
      this.hunheList.push({
        beanTechId: this.ids
      })
    },
    delhunhe (row) {
      this.hunheList.splice(this.hunheList.indexOf(row), 1)
    }
  },
  components: {
    AbnRecord: resolve => {
      require(['@/views/components/abnRecord'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
.liInputWidth {
  width: 119px;
}
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
.audit{
  line-height: 32px;
  margin: 10px 0;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    font-size: 16px;
  }
}
</style>
