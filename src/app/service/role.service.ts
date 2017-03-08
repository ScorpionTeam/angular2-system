import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class RoleService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询权限列表
   * @param key
   * @param page
   * @returns {Observable<Response>}
   */
  getRoleList(key: string, page: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get("/role/sys-role-list", {page: page.page, size: page.perPage});
  }

  /**
   * 创建角色
   * @param data
   * @returns {Observable<Response>}
   */
  createRole(data:any){
    return this.http.post("/role/create-role",data);
  }

  /**
   * 角色详情
   * @param id
   * @returns {Observable<Response>}
   */
  getAuthorization(id:number){
    return this.http.get("/role/get-authorization",{roleId:id});
  }

  /**
   * 保存授权
   * @param list
   * @param id
   * @returns {Observable<Response>}
   */
  saveAuthorization(list:Array<any>,id:string){
    return this.http.post("/role/author_role",{menus:list,roleId:id});
  }

  /**
   * 删除角色
   * @param data
   * @returns {Observable<Response>}
   */
  deleteRole(data:any){
    return this.http.post('/role/delete-role',data);
  }
}