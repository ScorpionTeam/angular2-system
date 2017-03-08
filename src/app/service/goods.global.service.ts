import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class GoodsGlobalService {
  constructor(private http: MyHttp) {
  }

  /**
   * 根据店铺id查询商品列表
   * @param id
   * @param page
   * @param key
   * @returns {Observable<Response>}
   */
  getGoodsBySellerId(id: number, page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    let url = '/goods/goods-list?key=' + key
    return this.http.get(url, {
      page: page.page, size: page.perPage, sellerId: id
    });
  }

  /**
   * 更新商品状态
   * @param id
   * @param status
   * @param goodsList
   * @returns {Observable<Response>}
   */
  updateGoodsStatus(id: number, status: string, goodsList: Array<number>) {
    let list:Array<any>=[];
    goodsList.forEach(function(value:number){
      list.push({id:value});
    });
    let seller ={id:id,sellerStatus:status,goodsList:list};
    return this.http.post('/goods/goods-update-type',seller);
  }
}