import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class SpikeService {
  constructor(private http: MyHttp) {
  }

  getSpikeList() {
    return this.http.get('/spike/activity-list');

  }

  /**
   * 保存 秒杀信息
   * @param data
   * @returns {Observable<Response>}
   */
  saveSpike(data: any) {
    return this.http.post('/spike/modify-spike-goods', data);
  }

  /**
   * 根据店铺id 查询商品列表
   * @param id
   * @param page
   * @returns {Observable<Response>}
   */
  getSellerGoods(id: number, page: any) {
    if (!page) {
      page = {page: 1, perpage: 10};
    }
    return this.http.get('/spike/seller-goods-list?sellerId=' +id+"&pageNum="+page.page+"&pageSize="+page.perPage);
  }

  /**
   * 删除秒杀活动
   * @param data
   * @returns {Observable<Response>}
   */
  delSpike(data:any){
    return this.http.post('/spike/delete-spike-goods',data.id);
  }

  /**
   * 保存秒杀活动
   * @param data
   * @returns {Observable<Response>}
   */
  settingSpike(data:any){
    return this.http.post('/spike/setting-spike',data);
  }

}