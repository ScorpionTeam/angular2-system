import {Component, OnInit} from '@angular/core';
import {SqlConfigService} from '../../../service/sql.config.service';
@Component({
  selector: 'sql-config-component',
  templateUrl: './sql.config.component.html'
})
export class SqlConfigComponent implements OnInit {

  /**
   * sql集合
   * @type {{}}
   */
  sqlDataList: any = {};
  /**
   * 搜索关键字
   * @type {string}
   */
  key: string = '';
  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  placeholder: string = '搜索..';

  ngOnInit(): void {
    this.getSqlList(this.pageOpts, this.key);
  }

  constructor(private sqlConfigService: SqlConfigService) {
  }

  /**
   * 分页事件
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getSqlList(this.pageOpts, this.key);
  }

  /**
   * 条件搜索
   * @param data
   */
  searchByCondition(data: string) {
    this.key = data;
  }

  /**
   * 查询sql列表
   * @param page
   * @param key
   */
  getSqlList(page: any, key: string) {
    this.sqlConfigService.getSqlConfig(page, key).subscribe(res=> {
      this.sqlDataList = res.json();
    });
  }

}