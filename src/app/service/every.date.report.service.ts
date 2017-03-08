import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
const ApiUrl = process.env.ApiUrl;
@Injectable()
export class EveryDateReportService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询每日报表数据
   * @param date
   * @returns {Observable<Response>}
   */
  getEveryDateReport(date: string) {
    return this.http.get("/report/other/platform-data", {date: date});
  }

  /**
   * 导出报表
   * @param city
   * @param date
   */
  exportDataReport(city: string, date: string) {
    location.href = ApiUrl + "/report/other/download-every-day-excel?date=" + date + "&city=" + city;
  }

}
