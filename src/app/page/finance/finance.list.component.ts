import {Component} from '@angular/core';
import {FinanceService} from '../../service/finance.service';
import {ToastEntity} from '../../domain/toast';
@Component({
  selector: 'finance-list-component',
  templateUrl: './finance.list.component.html',
  styleUrls: ['/finance.list.component.css']
})

export class FinanceListComponent {
  toast:ToastEntity = new ToastEntity;
  /**
   * 日期对象
   * @type {string}
   */
  queryDate: string = '';
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 财务列表对象
   * @type {{}}
   */
  financeList: any = {};
  /**
   * 卡片列表对象
   * @type {{}}
   */
  financeCard: any = {};
  /**
   * 收入详情 打开|关闭
   * @type {boolean}
   */
  incomeOpen: boolean = false;
  /**
   * 支出详情 打开|关闭
   * @type {boolean}
   */
  expenditureOpen: boolean = false;
  /**
   * 收入详情列表
   * @type {{}}
   */
  incomeList: any = {};
  /**
   * 支出详情列表
   * @type {{}}
   */
  expenditureList: any = {};
  /**
   * 收入详情分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  incomePageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 支出详情分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  expenditurePageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 格式化时间
   * @type {string}
   * @private
   */
  _date_formate: string = 'yyyymmdd';
  /**
   * 当前详情页 日期
   * @type {string}
   */
  currentDate: string = '';

  constructor(private financeService: FinanceService) {
  }
  /**
   * 触发查询操作
   * @param event
   */
  receiveDate(event: any) {
    this.queryDate = event.slice(0, 6);
    this.getSql();

  }

  /**
   * toast通知
   * @param event
   */
  notifyParamFunction(event: any) {
    this.toast.showAlert = !this.toast.showAlert;
  }

  /**
   * 分页事件
   * @param event
   */
  pageChange(event: any) {
    this.pageOpts.page = event;
    this.getSql();
  }

  /**
   * 查询
   */
  getSql() {
    this.financeService.getSql("finance.getFinanceByMonth", this.queryDate, this.pageOpts).subscribe(res=> {
      let ret = res.json();
      if (ret.rows.length > 0) {
        this.financeCard = ret.rows[0];
      }
    });
    this.financeService.getSql("finance.getFinanceByDay", this.queryDate, this.pageOpts).subscribe(res=> {
      this.financeList = res.json();
    });

  }

  /**
   * 收入详情
   * @param date
   */
  incomeDetail(date: string) {
    this.currentDate = date;
    this.financeService.getSql("finance.getFinanceOrder", date, this.incomePageOpts).subscribe(res=> {
      this.incomeList = res.json();
    });
  }

  /**
   * 支出详情
   * @param date
   */
  expenditureDetail(date: string) {
    this.currentDate = date;
    this.financeService.getSql("finance.getFinancePay", date, this.expenditurePageOpts).subscribe(res=> {
      this.expenditureList = res.json();
    });
  }

  /**
   * 收入详情分页
   * @param data
   */
  incomePageChange(data: number) {
    this.incomePageOpts.page = data;
    this.incomeDetail(this.currentDate);
  }

  /**
   * 支出详情分页
   * @param data
   */
  expenditurePageChange(data: number) {
    this.expenditurePageOpts.page = data;
    this.expenditureDetail(this.currentDate);
  }


}