/**
 * Created by yhm on 16/12/28.
 */
import {Component, OnInit} from "@angular/core";
import {OrderService} from "../../service/order.service";
import {ToastEntity} from '../../domain/toast';
@Component({
  moduleId: "OrderManage",
  selector: "order",
  templateUrl: "./order.component.html"
})
export class OrderComponent implements OnInit {
  /**
   * 订单查询条件
   * @type {{keyType: string; orderType: string; orderStatus: string; searchKey: string; startTime: string; endTime: string}}
   */
  public orderReq: any = {
    keyType: "all",
    orderType: "0",
    orderStatus: "all",
    searchKey: "",
    startTime: "",
    endTime: ""
  };
  /**
   * 搜索提示
   * @type {string}
   */
  public placeholder: string = 'id..手机..联系人..店铺';

  /**
   * 分页对象
   * @type {{total: number; limit: number; perPage: number; page: number}}
   */
  public pageOpts: any = {total: 100, limit: 5, perPage: 10, page: 1};

  /**
   * 显示详情的标记位
   * @type {boolean}
   */
  public opened: boolean = false;

  public curOrder: any; //当前订单;

  public orderList: any = [];

  public selectedTab: string = "orderBasic"; //所选tab;

  public orderGoods: any;

  public orderLog: any;

  public sellerObj: any = {};

  public showBtn: boolean = false;

  /**
   * 格式化时间
   * @type {string}
   * @private
   */
  _date_formate: string = 'yyyy-mm-dd';

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;

  constructor(public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrderList(null);
  }

  /**
   * 查询订单列表
   * @param pageNum
   */
  getOrderList(pageNum: any): void {
    let pData: any = {
      page: 1,
      itemsPerPage: 10
    };

    if (pageNum) {
      pData.page = pageNum;
    }

    this.orderService.getOrderList(this.orderReq, pData).subscribe(res => {
      let data = res.json();
      this.orderList = data.rows;
      this.pageOpts = {
        total: data.total > 0 ? data.total : 1,
        limit: 5,
        perPage: 10,
        page: data.page
      };
      this.orderList.forEach((r, index) => {
        r.rank = index + 1;
        r.goodAmount = r.goodAmount / 100;
        r.shippingAmount = r.shippingAmount / 100;
        r.discountAmount = r.discountAmount / 100;
        r.orderAmount = r.orderAmount / 100;
        r.payAmount = r.payAmount / 100;
      });
    });
  }

  /*
   * @description: Show order detail.
   * @params: orderInfo.
   * @modified date: 2016/12/30.
   */
  showDetail(orderInfo): void {
    let orderId = orderInfo.id;
    this.opened = true;
    this.curOrder = orderInfo;
    this.selectedTab = "orderBasic";
    this.sellerObj.id = orderInfo.sellerId;
    this.orderService.getOrderGoods(orderId).subscribe(res => {
      let data = res.json();
      if (data.success) {
        this.orderGoods = data.body.orderGoods;
      }
    });

    this.orderService.getOrderLog(orderId).subscribe(res => {
      let data = res.json();
      this.orderLog = data;
    })
  }

  selectScope(event) {

  }

  searchByCondition(event) {

  }

  /**
   * 导出订单
   */
  exportOrder() {
    if (this.orderReq.keyType == 'all'
      && this.orderReq.searchKey == ''
      && this.orderReq.orderStatus == 'all'
      && this.orderReq.startTime == ''
      && this.orderReq.endTime == '') {
      this.toastFunction('请至少选择一个查询条件进行导出', 'info');
      return;
    }
    location.href = process.env.ApiUrl + '/order/export-order?citys=' + localStorage.getItem('hualaCity') +
      "&searchKey=" + this.orderReq.searchKey + "&keyType=" + this.orderReq.keyType +
      "&orderType=" + this.orderReq.orderType + "&orderStatus=" + this.orderReq.orderStatus +
      "&startTime=" + this.orderReq.startTime + "&endTime=" + this.orderReq.endTime;
  }

  /**
   * 搜索订单
   */
  search() {
    this.getOrderList(null);
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

  /**
   * 接收开始时间
   * @param data
   */
  receiveDate(data: any) {
    this.orderReq.startTime = data;
  }

  /**
   * 接收结束时间
   * @param data
   */
  receiveEndTime(data: any) {
    this.orderReq.endTime = data;
  }

  /**
   * toast函数
   * @param message
   * @param toastType
   */
  toastFunction(message: string, toastType: string) {
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = message;
    this.toast.toastType = toastType;
  }


}