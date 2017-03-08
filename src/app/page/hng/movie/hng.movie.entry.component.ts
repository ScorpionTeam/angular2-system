import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HngService} from '../../../service/hng.service';
import {ToastEntity} from '../../../domain/toast';
import {PromptEntity} from '../../../domain/prompt';
import {isNullOrUndefined} from "util";
@Component({
  selector: 'hng-movie-entry-component',
  templateUrl: './hng.movie.entry.component.html'
})
export class HngMovieEntryComponent implements OnChanges {
  /**
   * 当前活动对象
   * @type {{}}
   */
  @Input() currentActiveObj: any = {};
  /**
   * 影片信息模态  打开|关闭
   * @type {boolean}
   */
  public opened: boolean = false;
  /**
   * 影片操作对象
   * @type {{}}
   */
  public operaMovieObj: any = {};

  /**
   * 显示|隐藏  *
   * @type {boolean}
   */
  public required: boolean = true;
  /**
   * 活动影片Set 集合
   * @type {Set<any>}
   */
  public movieList = new Set<any>();

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast: ToastEntity = new ToastEntity;
  /**
   * prompt封装实体
   * @type {PromptEntity}
   */
  prompt: PromptEntity = new PromptEntity('您确定要删除吗?');

  commonImgUrl = process.env.ImgUrl;

  ngOnChanges(changes: SimpleChanges): void {
    let _obj: any = changes['currentActiveObj'];
    if (!isNullOrUndefined(_obj.currentValue.id) && _obj.currentValue != _obj.previousValue) {
      let that = this;
      this.currentActiveObj.movies.forEach(function (data: any) {
        that.movieList.add(data);
      });
    }
  }

  constructor(private hngService: HngService) {
  }

  /**
   * 关联商家事件
   * @param data
   */
  targetFunction(data: any) {
    this.currentActiveObj.sellerName = data.name;
    this.operaMovieObj.sellerId = data.id;
  }

  /**
   * 编辑影片信息
   * @param data
   */
  edit(data: any) {
    this.operaMovieObj = data;
    this.opened = !this.opened;
  }

  /**
   * prompt取消事件
   */
  cancelPrompt() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * prompt确认事件
   */
  confirm() {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.hngService.checkStatistic(this.operaMovieObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('删除成功', 'success');
        this.movieList.delete(this.operaMovieObj);
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * toast传播事件
   * @param event
   */
  notifyParamFunction(event: boolean) {
    this.toast.showAlert = !this.toast.showAlert;
  }

  /**
   * 影片删除按钮点击事件
   * @param data
   */
  delClick(data: any) {
    this.operaMovieObj = data;
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
  }

  /**
   * 影片录入模态取消事件
   */
  cancles() {
    this.opened = !this.opened;
  }

  /**
   * 影片保存
   */
  saveMovie() {
    this.movieList.add(this.operaMovieObj);
    this.opened = !this.opened;
  }

  /**
   * toast函数
   * @param message
   * @param toastType
   */
  toastFunction(message: string, toastType: string) {
    this.toast.showAlert = !this.toast.showAlert;
    this.toast.toastMessage = message;
    this.toast.toastType = toastType;
  }

  openEntryModal() {
    this.opened = !this.opened;
    this.operaMovieObj = {};
    this.operaMovieObj.sellerId = this.currentActiveObj.sellerId;
    this.operaMovieObj.sellerName = this.currentActiveObj.sellerName;
  }

  /**
   * 保存影片活动
   */
  saveActivity() {
    //this.operaMovieObj.movies = this.convertSetToList(this.movieList);
    console.log(this.operaMovieObj);
  }

  /**
   * 将Set集合转换为List
   * @param source
   */
  convertSetToList(source: Set<any>) {
    let array: Array<any> = [];
    source.forEach(function (value: any) {
      array.push(value);
    });
    return array;
  }

}