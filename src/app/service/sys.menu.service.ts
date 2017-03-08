import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class SysMenuService {
  constructor(private http:MyHttp){}

  getMenuList(){
    return this.http.get("/menu/menu-list");
  }

  deleteMenu(data:any){
    return this.http.post("/menu/deleteMenu",data);
  }

  editMenu(data:any){
    return this.http.post("/menu/saveMenu",data);
  }
}