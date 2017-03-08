import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {HngService} from '../../../service/hng.service';
@Component({
  selector: 'hng-recruit-statics-component',
  templateUrl: './hng.recruit.statics.component.html'
})

export class HngRecruitStaticsComponent implements OnInit,OnChanges {


  /**
   * 公司数据
   * @type {Array}
   */
  companyDataList: Array<any> = [];

  /**
   * 岗位数据
   * @type {Array}
   */
  jobDataList: Array<any> = [];

  /**
   * 搜索条件
   * @type {{}}
   */
  conditions: any = {};

  /**
   * 统计数据
   * @type {{}}
   */
  staticsData: any = {};

  placeholder: string = '店铺id..店铺名称';

  /**
   * 分页
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};

  /**
   * 当前招聘对象
   * @type {{}}
   */
  @Input() recruitObj = {};

  constructor(private hngService: HngService) {
  }

  ngOnInit(): void {
    this.hngService.getAllCompany().subscribe(res=> {
      this.companyDataList = res.json().body;
    });

    this.hngService.getAllJob().subscribe(res=> {
      this.jobDataList = res.json().body;
    });
  }


  ngOnChanges(changes: any): void {
    let _value = changes['recruitObj'];
    if (!_value) {
      return;
    }
    if (_value.currentValue != _value.previousValue) {
      this.conditions.id = _value.id;
      this.getStatics();
    }
  }

  /**
   * 条件搜索
   * @param data
   */
  querySellerDataByBtn() {

  }

  /**
   * excel导出
   */
  exportExcel() {
    this.hngService.downLoadStatic(this.conditions);
  }

  /**
   * 查询统计数据
   */
  getStatics() {
    this.hngService.getStatics(this.conditions, this.pageOpts).subscribe(res=> {
      this.staticsData = res.json();
    });
  }

  /**
   * 分页
   * @param data
   */
  pageChange(data: number) {
    this.pageOpts.page = data;
    this.getStatics();
  }

  /**
   * 条件搜索
   * @param data
   */
  searchByCondition(data:string){

  }

}