import {Component} from '@angular/core';
import {EveryDateReportService} from '../../service/every.date.report.service';
@Component({
  selector: 'every-date-report-component',
  templateUrl: './every.date.report.component.html',
  styleUrls: ['./every.date.report.component.css']
})

export class EveryDateReportComponent {

  constructor(private everyDateReportService: EveryDateReportService) {
  }

  /**
   * 每日报表数据对象
   * @type {{}}
   */
  everyDateReport: any = {};

  /**
   * Tips打开|关闭
   * @type {boolean}
   */
  open: boolean = false;

  /**
   * 日期对象
   * @type {string}
   */
  queryDate: string = '';

  /**
   * Toast提示
   * @type {string}
   */
  toastMessage: string = '请选择日期';

  /**
   * 类型
   * @type {string}
   */
  toastType: string = 'warning';

  /**
   * 显示|关闭toast
   * @type {boolean}
   */
  showAlert: boolean = false;

  /**
   * 格式化时间
   * @type {string}
   * @private
   */
  _date_formate:string ='yyyymmdd';

  /**
   * 触发查询操作
   * @param event
   */
  receiveDate(event: any) {
    this.queryDate = event;
    this.everyDateReportService.getEveryDateReport(event).subscribe(res=> {
      this.everyDateReport = res.json().body;
    });
  }

  exportDataReport() {
    if (!this.queryDate) {
      this.showAlert = !this.showAlert;
      return;
    }
    let city = localStorage.getItem("hualaCity");
    this.everyDateReportService.exportDataReport(city,this.queryDate);

  }

  /**
   * toast通知
   * @param event
   */
  notifyParamFunction(event) {
    this.showAlert = !this.showAlert;
  }

}