import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class AppVersionService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询app 列表
   * @param page
   * @returns {Observable<Response>}
   */
  getAppList(page: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/sysConfig/app-version-list",{page:page.page,size:page.perPage});
  }

  /**
   * 保存app对象
   * @param app
   * @returns {Observable<Response>}
   */
  saveAppVersion(app){
    return this.http.post("/sysConfig/update-app",app);
  }
}