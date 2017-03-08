import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../service/message.service';
@Component({
  selector: 'message-component',
  templateUrl: './message.component.html'
})

export class MessageComponent implements OnInit {
  constructor(private messageService: MessageService) {
  }

  /**
   * 分页对象
   * @type {{page: number; total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {page: 1, total: 0, limit: 3, perPage: 10};
  /**
   * 短信列表对象
   * @type {{}}
   */
  messageList: any = {};
  /**
   * 搜索key
   * @type {string}
   */
  key: string = '';
  placeholder: string = '手机号';
  /**
   * 短信状态
   * @type {string}
   */
  smsStatus: string = 'all';
  /**
   * 短信类型
   * @type {string}
   */
  type: string = 'all';
  /**
   * section打开or关闭
   * @type {boolean}
   */
  open: boolean = false;

  ngOnInit(): void {
    this.getMessageList(null, this.key, this.type, this.smsStatus);
  }

  /**
   * 条件搜索
   * @param event
   */
  searchByCondition(event:string) {
    this.getMessageList(this.pageOpts, event, this.type, this.smsStatus);
  }

  /**
   * 查询短信列表
   * @param page
   * @param key
   * @param type
   * @param status
   */
  getMessageList(page: any, key: string, type: string, status: string) {
    this.messageService.getMessageList(page, key, type, status).subscribe(res=> {
      this.messageList = res.json();
    });
  }

  /**
   * 分页
   * @param event
   */
  pageChange(event) {
    this.pageOpts.page = event;
    this.getMessageList(this.pageOpts, this.key, this.type, this.smsStatus);
  }

}