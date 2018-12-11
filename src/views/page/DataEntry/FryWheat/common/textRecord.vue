<template>
  <div><el-input type="textarea" v-model="Text" class="textarea" style="width: 100%;height: 200px"></el-input></div>
</template>

<script>
export default {
  name: 'textRecord',
  data () {
    return {}
  },
  props: {
    Text: {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>
.textarea textarea{
  width: 100%;
  height: 100%!important;
}
</style>
