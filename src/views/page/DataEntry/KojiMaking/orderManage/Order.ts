export class Order {
  orderId: string
  factory: string
  workShop: string
  productDate: string
  productLine: string
  orderNo: string
  materialCode: string
  materialName: string
  planOutput: number
  realOutput: number
  outputUnit: string
  operator: string
  operDate: string
  orderStatus: string
  countMan: number
  countOutput: number
  countOutputUnit: string
  germs: string
  expAllDate: string
  img: string
  remark: string
  created: string
  creator: string
  changed: string
  changer: string
  properties: string
  productLineName: string
  workShopName: string
  orderDate: string
  delFlag: string = '0'
  // state: string = '已提交'
  // orderDate: string = '2018-02-05'
  // orderNo: string
  // orderId: string
  // item: string = 'SS01010001 小麦粉'
  // number: number = 200
  // unit: string = 'KG'
  // remark: string = 'good'
  // delFlag: string = '0'
  // constructor () {
  // }
  // constructor (classType: string deptId: string dinner: number endDate: string startDate: string
  //              orderId: string productDate: string remark: string userId: string[] userType: string) {
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

export class OrderDetail extends Order {
  detailId: string = ''
  status: string = ''
  inPotNo: string = ''
  kojiMakingRoomNo: string = ''
  continuityNo: string = ''
  kojiMakingDate: string = ''
  productDate: string = ''
  isFirst: boolean = false
  constructor () {
    super()
  }
}
