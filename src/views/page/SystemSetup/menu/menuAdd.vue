<template>
<div></div>
</template>

<script>
export default {
  name: 'menuAdd',
  data () {
    return {
      visible: false,
      dataForm: {
        id: 0,
        type: 1,
        typeList: ['目录', '菜单', '按钮'],
        name: '',
        parentId: 0,
        parentName: '',
        url: '',
        perms: '',
        orderNum: 0,
        icon: '',
        iconList: []
      }
    }
  },
  mounted () {
  },
  methods: {
    init (id) {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
