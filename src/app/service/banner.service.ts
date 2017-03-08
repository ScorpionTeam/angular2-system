import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class BannerService {
  constructor(private http: MyHttp) {

  }

  /**
   * 获取banner列表
   * @param page
   * @param searchKey
   * @returns {Observable<Response>}
   */
  getBannerList(page: any, searchKey: string) {
    if (!page) {
      page = {page: 1, perPage: 10}
    }
    let url = "/act/banner-list?pageNum=" + page.page + "&pageSize=" + page.perPage + "&searchKey=" + searchKey;
    return this.http.get(url);
  }

  /**
   * 保存banner
   * @param data
   * @returns {Observable<Response>}
   */
  saveBanner(data:any){
    return this.http.post('/act/save-banner',data);
  }

  /**
   * 删除banner对象
   * @param data
   * @returns {Observable<Response>}
   */
  deleteBanner(data:any){
    return this.http.post('/act/delete-banner',data);
  }
}