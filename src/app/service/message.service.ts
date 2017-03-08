import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class MessageService {

  constructor(private http: MyHttp) {
  }

  /**
   * 查询短信列表
   * @param page
   * @param key
   * @param type
   * @param status
   * @returns {Observable<Response>}
   */
  getMessageList(page: any, key: string, type: string, status: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/role/sms-list",
      {page: page.page, size: page.perPage, searchKey: key, type: type, smsStatus: status});
  }
  
}