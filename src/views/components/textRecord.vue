<template>
  <div><el-input type="textarea" v-model="Text" class="textarea" :disabled="!isRedact" style="width: 100%;height: 200px"></el-input></div>
</template>

<script>
import { PACKAGING_API } from '@/api/api'
export default {
  name: 'textRecord',
  data () {
    return {
      orderId: '',
      textlist: {},
      Text: '',
      textId: ''
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    // 获取文本记录
    GetText (id) {
      if (id) {
        this.orderId = id
      }
      this.$http(`${PACKAGING_API.PKGTEXTLIST_API}`, 'POST', {
        order_id: this.orderId ? this.orderId : id
      }).then(({data}) => {
        if (data.code === 0) {
          this.textlist = data.listForm[0]
          this.Text = data.listForm[0].pkgText
          this.textId = data.listForm[0].id
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    UpdateText (formHeader, str, resolve) {
      this.$http(`${PACKAGING_API.PKGTEXTUPDATE_API}`, 'POST', {
        id: this.textId,
        orderId: formHeader.orderId,
        pkgText: this.Text,
        changed: this.textlist.changed ? this.textlist.changed : null,
        changer: this.textlist.changer ? this.textlist.changer : null,
        created: this.textlist.created ? this.textlist.created : null,
        creator: this.textlist.creator ? this.textlist.creator : null,
        workShop: formHeader.workShop,
        blongProc: formHeader.productLine
      }).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error('修改文本' + data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style>
.textarea textarea{
  width: 100%;
  height: 100%!important;
}
</style>
