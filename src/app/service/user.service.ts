import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class UserService {

  constructor(private http: MyHttp) {
  }

  /**
   * 查询用户列表
   * @param page
   * @param key
   * @returns {Observable<Response>}
   */
  getUserList(page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/role/user-list", {page: page.page, size: page.perPage, searchKey: key});
  }

  /**
   * 重置密码
   * @param data
   * @returns {Observable<Response>}
   */
  resetPassword(data: any) {
    return this.http.post("/role/reset-password", data);
  }

  /**
   * 删除用户
   * @param data
   * @returns {Observable<Response>}
   */
  deleteUser(data: any) {
    return this.http.post("/role/delete-user", data);
  }

  /**
   * 保存用户信息
   * @param data
   * @returns {Observable<Response>}
   */
  saveUser(data:any){
    return this.http.post("/role/edit-user",data);
  }

  /**
   * 查询角色列表
   * @returns {Observable<Response>}
   */
  getRoleList(){
    return this.http.get("/role/get-role-list");
  }

}