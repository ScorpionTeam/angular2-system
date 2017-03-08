import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
const ApiUrl = process.env.ApiUrl;
@Injectable()
export class SellerDataService {
  constructor(private http: MyHttp) {
  }

  /**
   * 商户统计数据列表
   * @param page
   * @param date
   * @param testSeller
   * @param outLineSeller
   * @returns {Observable<Response>}
   */
  getSellerData(page: any, date: string, testSeller: boolean, outLineSeller: boolean) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/report/other/seller-data", {
      date: date,
      page: page.page,
      size: page.perPage,
      hasTest: testSeller,
      hasOutLine: outLineSeller
    });
  }

  /**
   * 下载商户信息报表
   * @param city
   * @param date
   * @param testSeller
   * @param outLineSeller
   */
  exportExcel(city: string, date: string, testSeller: boolean, outLineSeller: boolean) {
    location.href = ApiUrl + "/report/other/downLoad-file?date=" + date + "&city=" + city + "&hasTest=" + testSeller + "&hasOutLine=" + outLineSeller;
  }
}