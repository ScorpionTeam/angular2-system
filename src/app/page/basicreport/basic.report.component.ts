import {Component, OnInit} from '@angular/core';
import {BasicReportService} from '../../service/basic.report.service';
@Component({
  selector: 'basic-report-component',
  templateUrl: './basic.report.component.html'
})

export class BasicReportComponent implements OnInit {

  /**
   * sql集合
   * @type {{}}
   */
  sqlDataList: Array<any> = [];

  /**
   * 基础统计模态  打开|关闭
   * @type {boolean}
   */
  opened: boolean = false;

  /**
   * 当前SQL对象
   * @type {{}}
   */
  currentSqlObj: any = {};

  placeholder: string = '参数..';

  /**
   * 表头
   * @type {Array}
   */
  titles: Array<string> = [];
  /**
   * 值
   * @type {Array}
   */
  values: Array<any> = [];

  sqlData: any = {};

  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10}

  constructor(private basicReportService: BasicReportService) {
  }

  ngOnInit(): void {
    this.getSqlList();
  }

  getSqlList() {
    this.basicReportService.getSqlDataList().subscribe(res=> {
      this.sqlDataList = res.json();
    });
  }

  /**
   * 执行sql详情查询
   * @param data
   */
  execute(data: any) {
    this.opened = !this.opened;
    this.currentSqlObj = data;
    this.sqlInfo(this.pageOpts, this.currentSqlObj);
  }

  /**
   * 异步查询
   * @param data
   */
  searchByCondition(data: string) {

  }

  /**
   * 基础统计详情
   * @param page
   * @param data
   */
  sqlInfo(page: any, data: any) {
    let condition: any = {};
    condition.sqlName = data.sql_name;
    condition.key = data.group_key + '.' + data.sql_key;
    condition.param = data.param;
    this.basicReportService.executeSql(page, condition).subscribe(res=> {
      this.sqlData = res.json();
      this.convertToRealData(this.sqlData);
    });
  }

  /**
   * 将查询结果集转换为实际格式的数据
   * @param data
   */
  convertToRealData(data: any) {
    this.titles = [];
    this.values = [];
    let that = this;
    let title: any = data.rows[0];
    for (let value in title) {
      this.titles.push(value);
    }
    data.rows.forEach(function (obj: any) {
      let value: Array<any> = [];
      for (let key in obj) {
        value.push(obj[key]);
      }
      that.values.push(value);
    });
  }

  /**
   * 分页查询
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.sqlInfo(this.pageOpts, this.currentSqlObj);
  }

  cancel() {
    this.opened = !this.opened;
  }

}