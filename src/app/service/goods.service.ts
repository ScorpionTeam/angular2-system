import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';

@Injectable()
export class GoodsService {
  constructor (private http: MyHttp) {}

  /*
   * @Description: Get goods by category id;
   * @Params: data: Object;
   * @Date: 2017-01-10;
   */
  getGoodsByCat(data){
    let gUrl = "/goods/h-goods-list";

    return this.http.get(gUrl, data);
  }

  /*
   * @Description: Delete goods;
   * @Params: data: Object;
   * @Date: 2017-01-10;
   */
  deleteGoods(data) {
    let pUrl = "/goods/del-h-goods";

    return this.http.post(pUrl, data);
  }

  /*
   * @Description: Get goods by category id;
   * @Params: data: Object;
   * @Date: 2017-01-10;
   */
  addGoods(data){
    let pUrl = "/goods/save-goods";

    return this.http.post(pUrl, data);
  }

  /*
   * @Description: Update goods;
   * @Date: 2017-02-6;
   */
  updateGoods(data){
    let pUrl = "/goods/save-goods";

    return this.http.post(pUrl, data);
  }
}