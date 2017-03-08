import {Component, OnInit} from '@angular/core';
import {SellerDataService} from '../../service/seller.data.service';
@Component({
  selector: 'seller-data-component',
  templateUrl: './seller.data.component.html'
})

export class SellerDataComponent implements OnInit {
  /**
   * 商户报表对象
   * @type {{}}
   */
  sellerDataList: any = {};
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}
  /**
   * 日期对象
   * @type {string}
   */
  queryDate: string = '';
  /**
   * 测试店铺
   * @type {boolean}
   */
  testSeller: boolean = true;
  /**
   * 下线店铺
   * @type {boolean}
   */
  outLineSeller: boolean = true;
  open: boolean = false;
  /**
   * 格式化时间
   * @type {string}
   * @private
   */
  _date_formate: string = 'yyyymmdd';

  constructor(private sellerDataService: SellerDataService) {
  }

  ngOnInit(): void {
    this.getSellerData(this.pageOpts, this.queryDate, this.testSeller, this.outLineSeller);
  }

  /**
   * 接收时间
   * @param event
   */
  receiveDate(event) {
    this.queryDate = event;
  }

  /**
   * 查询列表方法
   * @param page
   * @param date
   * @param testSeller
   * @param outLineSeller
   */
  getSellerData(page: any, date: string, testSeller: boolean, outLineSeller: boolean) {
    this.sellerDataService.getSellerData(page, date, testSeller, outLineSeller).subscribe(res=> {
      this.sellerDataList = res.json();
    });
  }

  /**
   * 分页查询
   * @param event
   */
  pageChange(event) {
    this.pageOpts.page = event;
    this.getSellerData(this.pageOpts, this.queryDate, this.testSeller, this.outLineSeller);
  }

  /**
   * 按钮查询
   */
  querySellerDataByBtn() {
    this.getSellerData(this.pageOpts, this.queryDate, this.testSeller, this.outLineSeller);
  }

  /**
   * 报表导出
   */
  exportExcel() {
    let city = localStorage.getItem("hualaCity");
    this.sellerDataService.exportExcel(city, this.queryDate, this.testSeller, this.outLineSeller);
  }


}