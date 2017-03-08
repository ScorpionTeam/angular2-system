import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class CardService {
  constructor(private http: MyHttp) {
  }

  /**
   * 查询卡券列表
   * @param conditions
   */
  getCardList(page: any, card: any) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.post('/card/card-list?page=' + page.page + '&size=' + page.perPage, card);
  }

  /**
   * 保存卡券信息
   * @param data
   * @returns {Observable<Response>}
   */
  saveCard(data: any) {
    return this.http.post('/card/add-card',data);
  }

  /**
   * 删除卡券信息
   * @param id
   * @returns {Observable<Response>}
   */
  deleteCard(id:string){
    return this.http.get('/card/delete-card?id='+id);

  }
}