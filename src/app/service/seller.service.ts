import {Injectable} from '@angular/core';
import {MyHttp} from '../core/http';
@Injectable()
export class SellerService {

  constructor(private http: MyHttp) {
  }

  /**
   * 查询店铺列表
   * @param page
   * @param searchKey
   * @param status
   * @param keyType
   * @returns {Observable<Response>}
   */
  getSellerList(page: any, searchKey: any, status?: string, keyType?: string) {
    if (!page) {
      page = {page: 1, perPage: 10}
    }
    return this.http.get("/seller/seller-list", {
      key: searchKey,
      page: page.page,
      size: page.perPage,
      status: status,
      keyType: keyType
    });
  }

  /**
   * 根据 店铺id 分页查询商品列表
   * @param id
   * @param page
   * @param key
   * @returns {Observable<Response>}
   */
  getSellerGoodsDataList(id: number, page: any, key: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/seller/query-sellergoods-list',
      {page: page.page, size: page.perPage, sellerId: id, searchKey: key});
  }

  /**
   * 批量删除商品信息
   * @param array
   * @returns {Observable<Response>}
   */
  updateSellerGoods(array: Array<any>) {
    return this.http.post('/seller/updae-goods-list', array);
  }

  /**
   * 获取店铺扩展信息
   * @param id
   * @returns {Observable<Response>}
   */
  getSellerExt(id: number) {
    return this.http.get('/seller/seller-basic-info?sellerId=' + id);
  }

  /**
   * 查询店铺基本信息
   * @param id
   * @returns {Observable<Response>}
   */
  getSellerInfo(id: number) {
    return this.http.get('/seller/seller-info', {sellerId: id});
  }

  /**
   * 获取店铺重复信息
   * @param id
   * @returns {Observable<Response>}
   */
  getRepeat(id: number) {
    return this.http.get('/seller/check-info?sellerId=' + id);
  }

  /**
   * 修改店铺扩展信息
   * @param data
   * @returns {Observable<Response>}
   */
  updateSellerExtInfo(data: any) {
    return this.http.post('/seller/update-seller', data);
  }

  /**
   * 根据店铺id 查询店铺结算信息
   * @param id
   * @returns {Observable<Response>}
   */
  getSellerBalance(id: number) {
    return this.http.get('/seller/seller-amount-count?sellerId=' + id);
  }

  /**
   * 查询店铺结算详情
   * @param page
   * @param id
   * @param type
   * @returns {Observable<Response>}
   */
  getBalanceDataList(page: any, id: number, type: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/seller/seller-balance-list',
      {page: page.page, size: page.perPage, sellerId: id, keyType: type});
  }

  /**
   * 发送结算信息
   * @param data
   * @returns {Observable<Response>}
   */
  sendBalance(data: any) {
    return this.http.post('/seller/seller-xyl-balance-send', data);
  }

  /**
   * 账户调整
   * @param data
   * @returns {Observable<Response>}
   */
  adjustmentAccount(data: any) {
    return this.http.post('/balance/account-adjustment', data);
  }

  /**
   * 查询转账提现列表
   * @param page
   * @param key
   * @param id
   * @param type
   * @returns {Observable<Response>}
   */
  getTransferDataList(page: any, key: string, id: number, type: string) {
    if (!page) {
      page = {page: 1, perPage: 10};
    }
    return this.http.get('/seller/seller-xyl-account',
      {key: key, page: page.page, size: page.perPage, sellerId: id, type: type});
  }

  /**
   * 账户同步
   * @param id
   * @returns {Observable<Response>}
   */
  syncAccountData(id: number) {
    return this.http.get('/seller/seller-xyl-account-sync?sellerId=' + id);
  }

  /**
   * 店铺审核
   * @param data
   * @returns {Observable<Response>}
   */
  authSeller(data: any) {
    return this.http.post('/seller/seller-auth', data);
  }

  /**
   * 修改店铺状态
   * @param sellerList
   * @param status
   * @returns {Observable<Response>}
   */
  updateSellerStatus(sellerList: Array<any>, status: string) {
    let array: Array<any> = [];
    sellerList.forEach(function(value:any){
      array.push({id:value,sellerStatus:status});
    });
    return this.http.post('/seller/seller-status', array);
  }

  /**
   * 查询银行卡列表信息
   * @returns {Observable<Response>}
   */
  getBankDataList() {
    return this.http.get('/seller/get_bank_list');
  }

  /**
   * 查询用户列表
   * @param id
   * @returns {Observable<Response>}
   */
  getBankUserDataList(id: number) {
    return this.http.get('/seller/xyl-user-list', {id: id});
  }

  /**
   * 修改用户信息
   * @param userInfo
   * @param type
   * @returns {Observable<Response>}
   */
  updateUser(userInfo: any, type: string) {
    return this.http.post('/seller/update-user?type=' + type, userInfo);
  }

  /**
   * 修改银行卡信息
   * @param data
   * @returns {Observable<Response>}
   */
  updateBankInfo(data: any) {
    return this.http.post('/seller/reg-update-xyl-user', data);
  }

  /**
   * 修改店铺基本信息
   * @param data
   * @returns {Observable<Response>}
   */
  updateSellerInfo(data:any){
    return this.http.post('/seller/update-seller-basic',data);
  }

}