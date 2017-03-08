import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'start-time-component',
  templateUrl: './start.time.component.html'
})
export class StartTimeComponent {

  //开始时间
  @Output() _startTime = new EventEmitter<string>();
  //显示|隐藏时间选项卡
  @Input() _show: boolean = false;
  //格式化字符串  目前仅支持   yyyymmdd  &  yyyy-mm-dd
  @Input() _date_format: string = 'yyyymmdd';
  //初始化当天日期
  date: Date = new Date();
  //格式化月份
  monthNames: Array<string> = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  //格式化日期
  dayNamesShort: Array<string> = ['日', '一', '二', '三', '四', '五', '六',];

  //时间change触发
  dateChange(event) {
    this._show = !this._show;
    let currentDate: string = this.dateFormat(event);
    this._startTime.emit(currentDate);
  }

  selectDate() {
    this._show = !this._show;
  }

  //格式化时间
  dateFormat(date: Date) {
    let result = '';
    let _year: string = date.getFullYear().toString();
    let _month: string = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    let _day: string = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
    if (this._date_format == 'yyyymmdd') {
      result = _year + _month + _day;
    }
    if (this._date_format == 'yyyy-mm-dd') {
      result = _year + '-' + _month + '-' + _day;
    }
    return result;
  }
}