import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
/**
 *
 * 搜索栏
 * V1.0
 *
 */
@Component({
  selector: 'search-component',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {
  ngOnInit(): void {
  }

  /**
   * 搜索关键字
   * @type {EventEmitter<string>}
   */
  @Output() searchKey = new EventEmitter<string>();

  /**
   * 搜索范围
   * @type {EventEmitter<any>}
   */
  @Output() selectScope = new EventEmitter<any>();

  /**
   * 是否显示搜索icon
   * @type {boolean}
   */
  @Input() showIcon: boolean = true;

  /**
   * 延迟时间 2000毫秒
   */
  @Input() debounce: number;

  /**
   * placeholder
   * @type {string}
   */
  @Input() placeHolder: string = '';

  value: string = '';
  /**
   * 条件过滤数组
   * @type {{value: string; icon: string; type: string}[]}
   */
  scopes = [{value: '全部', icon: 'groups', type: '0'}, {value: '所属人', icon: 'user', type: '1'}];

  /**
   * 默认选项
   * @type {{value: string; icon: string; type: string}}
   */
  scope = this.scopes[0];

  /**
   * 搜索方法
   * @param query
   * @returns {null}
   */
  lookupAsync = (query?: string): Observable<any[]> => {
    //向上溢出
    this.searchKey.emit(query);
    return null;
  }

  /**
   * 选项改变事件
   * @param event
   */
  scopeChange(event) {
    this.scope = event;
    this.selectScope.emit(event);
  }
}