export default {
  namespaced: true,
  state: {
    // 看板
    dataEchartDeptId: '',
    dataEchartDeptName: '',
    dataEchartUid: '',
    dataEchartDetailDeptId: '',
    dataEchartDetailHolderName: ''
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
    },
    updateDataEchartDetailDeptId (state, name) {
      state.dataEchartDetailDeptId = name
    },
    updateDataEchartDetailHolderName (state, name) {
      state.dataEchartDetailHolderName = name
    }
  }
}
