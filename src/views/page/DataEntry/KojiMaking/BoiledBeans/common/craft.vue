<template>
  <div>
    <el-card>
      <el-form :inline="true" size="small" label-width="110px">
        <el-form-item label="预热开始时间：">
          <el-date-picker v-model="GystartTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="下料开始时间：">
          <el-date-picker v-model="GstartTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="下料结束时间：">
          <el-date-picker v-model="GendTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="预热时间：">
          <el-date-picker v-model="GychaTime" type="datetime" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="htitle">煮豆沥水参数设置</div>
      <el-form :inline="true" size="small" label-width="136px">
        <el-form-item label="润水比例:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="润水温度(°C):">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="润水变频(HZ):">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="实际比例:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="润水总量(L):">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="润水流速(L/h):">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="一次预热变频:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="二次预热变频:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="二次预热温度:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
        <el-form-item label="下料速度（KG/H）:">
          <el-input class="liInputWidth"></el-input>
        </el-form-item>
      </el-form>
      <div class="htitle">
        <span class="lh32px">过程监控数据记录</span>
        <el-button type="primary" size="small" style="float: right"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead">
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="观察时间"></el-table-column>
        <el-table-column label="润水/°C"></el-table-column>
        <el-table-column label="预热/°C"></el-table-column>
        <el-table-column label="下料量"></el-table-column>
        <el-table-column label="润水速度L/h"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作人"></el-table-column>
        <el-table-column label="操作时间"></el-table-column>
        <el-table-column width-label="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Abn-record></Abn-record>
    </el-card>
    <el-card>
      <div class="htitle">连续蒸煮记录</div>
      <el-form :inline="true" size="small">
        <el-form-item label="蒸煮变频(HZ):">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上转阀变频(HZ):">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="下转阀变频(HZ):">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div class="htitle">
        <span class="lh32px">过程监控数据记录</span>
        <el-button type="primary" size="small" style="float: right"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead">
        <el-table-column label="观察时间"></el-table-column>
        <el-table-column label="压力/Mpa">
          <el-table-column label="蒸煮数显"></el-table-column>
          <el-table-column label="蒸煮机械"></el-table-column>
          <el-table-column label="分汽包"></el-table-column>
        </el-table-column>
        <el-table-column label="温度/°C">
          <el-table-column label="蒸煮数显"></el-table-column>
          <el-table-column label="蒸煮机械"></el-table-column>
          <el-table-column label="上转阀冷却"></el-table-column>
          <el-table-column label="下转阀冷却"></el-table-column>
        </el-table-column>
        <el-table-column label="操作人"></el-table-column>
        <el-table-column label="操作时间"></el-table-column>
        <el-table-column width-label="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Abn-record></Abn-record>
    </el-card>
    <el-card>
      <div class="htitle">
        <span class="lh32px">混合入曲控制</span>
        <el-button type="primary" size="small" style="float: right"> + 新增</el-button>
      </div>
      <el-table border header-row-class-name="tableHead">
        <el-table-column label="观察时间"></el-table-column>
        <el-table-column label="混合料/°C"></el-table-column>
        <el-table-column label="接种/°C"></el-table-column>
        <el-table-column label="煮豆感官"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Abn-record></Abn-record>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.liInputWidth {
  width: 119px;
}
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
</style>

<script>
export default {
  name: 'caraft',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    AbnRecord: resolve => {
      require(['@/views/components/abnRecord'], resolve)
    }
  }
}
</script>
