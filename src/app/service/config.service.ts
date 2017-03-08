import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class ConfigService {
  constructor(private http: MyHttp) {
  }

  /**
   * 获取配置列表
   * @param page
   * @param key
   * @returns {Observable<Response>}
   */
  getConfigList(page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10}
    }
    return this.http.get("/sysConfig/list", {key: key, page: page.page, size: page.perPage});
  }

  /**
   * 编辑配置信息
   * @param data
   * @returns {Observable<Response>}
   */
  editConfig(data: any) {
    return this.http.post("/sysConfig/edit", data);

  }
}