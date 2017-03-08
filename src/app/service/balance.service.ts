import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class BalanceService {
  constructor(private http: MyHttp) {
  }

  /**
   * 结算列表
   * @param page
   * @returns {Observable<Response>}
   */
  getBalanceList(page: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/balance/date', {page: page.page, size: page.perPage});
  }

  /**
   * 结算详情列表
   * @param page
   * @param date
   * @param type
   * @returns {Observable<Response>}
   */
  getBalanceDetailList(page: any, date: string, type: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/balance/balance-detail', {
      date: date,
      balanceType: type,
      page: page.page,
      size: page.perPage
    });
  }

  /**
   * 去结算
   * @param data
   * @returns {Observable<Response>}
   */
  goSettleMent(data: any) {
    return this.http.post("/balance/send-xyl", {date: data.date, status: data.status, amount: data.amount});
  }
}