import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class ChartService {
  constructor(private http: MyHttp) {
  }

  /**
   * 图表数据展示
   * @returns {Observable<Response>}
   */
  getChartData() {
    return this.http.get('/report/other/getChartData');
  }
}