import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class SqlConfigService {

  constructor(private http: MyHttp) {
  }

  /**
   *查询sql列表
   * @param page
   * @param key
   * @returns {Observable<Response>}
   */
  getSqlConfig(page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/sysConfig/sql-list", {page: page.page, size: page.perPage, key: key});
  }
}