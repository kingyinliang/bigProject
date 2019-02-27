export class Order {
  status: string = '已提交'
  orderDate: string = '2018-02-05'
  orderNo: string = '291792738211833'
  item: string = 'SS01010001 小麦粉'
  number: number = 200
  unit: string = 'KG'
  remark: string = 'good'
  delFlag: string = '0'
  // constructor () {

  // }
  // constructor (classType: string, deptId: string, dinner: number, endDate: string, startDate: string,
  //              orderId: string, productDate: string, remark: string, userId: string[], userType: string) {
  //     this.classType = classType
  //     this.deptId = deptId
  //     this.dinner = dinner
  //     this.endDate = endDate
  //     this.startDate = startDate
  //     this.orderId = orderId
  //     this.productDate = productDate
  //     this.remark = remark
  //     this.userId = userId
  //     this.userType = userType
  // }
}

export class OrderDetail {
  status: string = '空置'
  orderNo: string = '291792738211833'
  inPotNo: string = '39802390200'
  kojiMakingRoomNo: string = '一号曲房'
  continuityNo: string = '8392392382'
  kojiMakingDate: string = '2019-03-01'
  productDate: string = '2019-03-01'
}
