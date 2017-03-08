import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class BasicReportService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询基础统计信息
   * @returns {Observable<Response>}
   */
  getSqlDataList() {
    return this.http.get('/tongji/sql');
  }

  executeSql(page: any, data: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/tongji/sqlExe?', {key: data.key, param: data.param, page: page.page, size: page.perPage});
  }


}