import {Component, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {FileUploader} from '../../../utils/file-upload/file-uploader.class';
import {MyHttp} from '../../../core/http';

/**
 * 图片上传工具
 * V1.0
 */
@Component({
  selector: 'img-upload-component',
  templateUrl: 'img.upload.component.html'
})
export class ImgUploadComponent implements OnChanges {

  serverUrl: string = process.env.ApiUrl;

  public imgUrl: string = process.env.ImgUrl;

  @Input() public picUrl: string;
  /**
   * 文件上传地址成功返回地址
   * @type {EventEmitter<string>}
   */
  @Output() uploadAddr = new EventEmitter<string>();

  /**
   * 文件上传目录
   */
  @Input() uploadFolder: string;

  /**
   * 预览文件Base64地址
   * @type {string}
   */
  prevFile: string = '';

  /**
   * 打开 关闭 toast
   * @type {boolean}
   */
  showAlert: boolean = false;

  /**
   * toast类型
   * @type {string}
   */
  toastType: string = 'success';

  /**
   * toast提示消息
   * @type {string}
   */
  toastMessage: string = '';

  /**
   * 初始化文件上传
   * @type {FileUploader}
   */
  uploader: FileUploader = new FileUploader({
    url: this.serverUrl + "/uploadImg.json?imgType=" + this.uploadFolder
  });

  constructor(private http: MyHttp) {
  }

  ngOnChanges(changes): void {
    let chg = changes["picUrl"];

    if (chg && chg.currentValue && chg.currentValue != chg.previousValue) {
      this.prevFile = this.imgUrl + chg.currentValue;
    }

    let address = changes['uploadFolder'];
    if (address.currentValue != address.previousValue) {
      this.uploader.setOptions({url: this.serverUrl + "/uploadImg.json?imgType=" + this.uploadFolder});

    }
  }

  //监听文件变化
  listenFileChange(dom: any) {
    this.uploader.setOptions({url: this.serverUrl + "/uploadImg.json?imgType=" + this.uploadFolder});
    //清空文件队列
    this.uploader.clearQueue();
    //将文件添加到上传队列
    this.uploader.addToQueue(dom.files);
    let that = this;
    let file = dom.files[0];
    //Base64转换
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      that.prevFile = this.result;
    }

  }

  /**
   * 选择图片触发  input  type=file
   * @param dom
   */
  openFileSelect(dom: any) {
    dom.click();
  }

  /**
   * 上传
   */
  uploadAll() {
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any)=> {
      let result = JSON.parse(response).body;
      if (status == 200) {
        this.toastFunction('上传成功', 'success');
        this.uploadAddr.emit(result);
      } else {
        this.toastFunction('上传失败', 'error');
      }
    }
  }

  /**
   * 重新选择
   * @param $dom
   */
  reSelect($dom) {
    $dom.click();
  }

  /**
   * toast传播事件
   * @param data
   */
  notifyParamFunction(data: boolean) {
    this.showAlert = data;
  }

  /**
   * toast函数
   * @param message
   * @param toastType
   */
  toastFunction(message: string, toastType: string) {
    this.showAlert = !this.showAlert;
    this.toastMessage = message;
    this.toastType = toastType;
  }


}