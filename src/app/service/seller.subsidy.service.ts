import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class SellerSubsidyService {
  constructor(private http: MyHttp) {
  }

  /**
   * 初始化奖励数据
   * @param date
   * @returns {Observable<Response>}
   */
  initData(date: string) {
    return this.http.post("/balance/seller-reward", {date: date});
  }

  /**
   * 查询奖励列表
   * @param date
   * @param page
   * @returns {Observable<Response>}
   */
  getRewardList(date: string, page: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/balance/seller-reward-list", {date: date, page: page.page, size: page.perPage});
  }

  /**
   * 查询订单列表
   * @param page
   * @param key
   * @param param
   * @returns {Observable<Response>}
   */
  getOrderList(page: any, key: string, param: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/tongji/sqlExe", {key: key, param: param, page: page.page, size: page.perPage});
  }

  /**
   * 发送奖励数据
   * @param data
   * @returns {Observable<Response>}
   */
  sendData(data: any) {
    return this.http.post("/balance/send-reward", data);
  }
}