import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class MenuService {
  constructor(private http: MyHttp) {

  }

  /**
   * 菜单列表
   * @returns {Observable<Response>}
   */
  menuList() {
    return this.http.get("/menu/menu-list");
  }

}