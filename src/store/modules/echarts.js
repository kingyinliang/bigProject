export default {
  namespaced: true,
  state: {
    // 看板
    dataEchartDeptId: '',
    dataEchartDeptName: '',
    dataEchartUid: ''
  },
  mutations: {
    updateDataEchartDeptId (state, name) {
      state.dataEchartDeptId = name
    },
    updateDataEchartDeptName (state, name) {
      state.dataEchartDeptName = name
    },
    updateDataEchartUid (state, name) {
      state.dataEchartUid = name
    }
  }
}
