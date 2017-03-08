import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class FinanceService {
  constructor(private http: MyHttp) {
  }

  /**
   * 获取统计报表
   * @param key
   * @param param
   * @param page
   * @returns {Observable<Response>}
   */
  getSql(key: string, param: any, page: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/tongji/sqlExe", {key: key, param: param, page: page.page, size: page.perPage});

  }
}