import {Component, OnInit} from '@angular/core';
import {SpikeService} from '../../service/spike.service';
import {ToastEntity} from '../../domain/toast';
import {PromptEntity} from '../../domain/prompt';
@Component({
  selector: 'spike-list-component',
  templateUrl: './spike.list.component.html'
})

export class SpikeListComponent implements OnInit {

  /**
   * toast封装实体
   * @type {ToastEntity}
   */
  toast:ToastEntity = new ToastEntity;

  /**
   * prompt封装实体
   * @type {PromptEntity}
   */
  prompt:PromptEntity = new PromptEntity('您确定要删除吗?');
  /**
   * 秒杀商品对象
   * @type {Array}
   */
  spikeArray: Array<any> = [];
  /**
   * 秒杀编辑模态 打开|关闭
   * @type {boolean}
   */
  opened: boolean = false;
  /**
   * 操作对象
   * @type {{}}
   */
  operaObj: any = {};
  /**
   * 显示 *
   * @type {boolean}
   */
  required: boolean = true;
  /**
   * 图片前缀
   */
  commonImgUrl = process.env.ImgUrl;

  ngOnInit(): void {
    this.getSpikeList();
  }

  constructor(private spikeService: SpikeService) {
  }

  /**
   * 获取秒杀商品列表
   */
  getSpikeList() {
    this.spikeService.getSpikeList().subscribe(res=> {
      this.spikeArray = res.json();
    });
  }

  edit(data: any) {
    this.operaObj = data;
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
    this.spikeService.delSpike(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('删除成功', 'success');
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.toast.showAlert = data;
  }

  /**
   * 关闭编辑模态
   */
  cancel() {
    this.opened = !this.opened;
  }

  /**
   * 编辑
   */
  confirmEdit() {
    this.operaObj.startTime = new Date(this.operaObj.startTime);
    this.operaObj.endTime = new Date(this.operaObj.endTime);
    this.operaObj.priceRole = this.operaObj.priceRole * 100;
    this.operaObj.salePrice = this.operaObj.salePrice * 100;
    this.operaObj.defaultCount = this.operaObj.totalCount;
    this.spikeService.saveSpike(this.operaObj).subscribe(res=> {
      let result = res.json();
      if (result.success) {
        this.toastFunction('保存成功', 'success');
        this.opened = !this.opened;
        this.getSpikeList();
      } else {
        this.toastFunction(result.message, 'error');
      }
    });
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

  /**
   * 删除秒杀活动
   */
  delSpike(data: any) {
    this.prompt.notificationOpen = !this.prompt.notificationOpen;
    this.operaObj = data;

  }
}