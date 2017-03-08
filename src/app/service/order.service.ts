import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class OrderService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询订单列表
   * @param orderReq
   * @param page
   * @returns {Observable<Response>}
   */
  getOrderList(orderReq, page: any) {
    let gUrl = "/order/order-list?page=" + page.page + "&size=" + page.itemsPerPage;
    return this.http.get(gUrl, orderReq);
  }

  /*
   * @Description: Get order goods by order id;
   * @Date: 2017-02-08;
   */
  getOrderGoods(orderId) {
    let gUrl = "/order/order-goods-list?orderId=" + orderId;

    return this.http.get(gUrl);
  }

  /*
   * @Description: Get order log by order id;
   * @Date: 2017-02-09;
   */
  getOrderLog(orderId) {
    let gUrl = "/order/order-log-list?orderId=" + orderId;

    return this.http.get(gUrl);
  }

  /**
   * 查询退款单
   * @param id
   * @returns {Observable<Response>}
   */
  refundOrder(id: number) {
    return this.http.get('/order/return-order?orderId=' + id);
  }

  /**
   * 生成退款单
   * @param order
   * @param returnOrderAmount
   * @param freightAmount
   * @param applyAmount
   * @returns {Observable<Response>}
   */
  createReturnOrder(order: any, returnOrderAmount: number, freightAmount: number, applyAmount: number) {
    return this.http.post("/order/create-return-order", {
      "order": order,
      "returnOrderAmount": returnOrderAmount,
      "freightAmount": freightAmount,
      "applyAmount": applyAmount,
    });
  }

  /**
   * 修改退款单
   * @param refundOrder
   * @param returnOrderAmount
   * @param freightAmount
   * @returns {Observable<Response>}
   */
  updateRefundOrder(refundOrder: any, returnOrderAmount: number, freightAmount: number) {
    return this.http.post("/order/update-return-order", {
      "refundOrder": refundOrder,
      "returnOrderAmount": returnOrderAmount,
      "freightAmount": freightAmount
    });
  }

  /**
   * 财务打款
   * @param order
   * @param returnGoods
   * @returns {Observable<Response>}
   */
  pullFinance(order:any,returnGoods:Array<any>){
    return this.http.post('/order/pull-finance',{"hReturnOrder": order, "returnGoods": returnGoods});
  }
}