import {Component, OnInit} from '@angular/core';
import {PictureService} from '../../../service/picture.service';
@Component({
  selector: 'picture-component',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit {

  /**
   * 选中目录
   * @type {string}
   */
  folder: string = '';
  /**
   * 图片对象
   * @type {{}}
   */
  pictureList: any = {};
  /**
   * 图片地址前缀
   */
  commonImgUrl = process.env.ImgUrl;
  /**
   * 分页对象
   * @type {{total: number; limit: number; perPage: number}}
   */
  pageOpts: any = {total: 0, limit: 3, perPage: 12};

  /**
   * 图片模态 打开|关闭
   * @type {boolean}
   */
  opened: boolean = false;

  /**
   * 当前图片
   * @type {string}
   */
  currentImg: string = '';

  /**
   * 图片上传 打开|关闭
   * @type {boolean}
   */
  uploadOpened: boolean = false;

  /**
   * 上传目标目录
   * @type {string}
   */
  targetFolder:string ='goods';

  /**
   * 图片上传 返回字符串
   * @type {string}
   */
  uploadResult:string ='';

  ngOnInit(): void {
    this.pictureService.getPictureList(null, this.folder).subscribe(res=> {
      this.pictureList = res.json();
    });
  }

  constructor(private pictureService: PictureService) {
  }

  /**
   * 分页事件
   * @param event
   */
  pageChange(event: number) {
    this.pageOpts.page = event;
    this.pictureService.getPictureList(this.pageOpts, this.folder).subscribe(res=> {
      this.pictureList = res.json();
    });
  }

  /**
   * 打开 图片详情模态
   * @param data
   */
  openModal(data: any) {
    this.opened = !this.opened;
    this.currentImg = data.srcElement.currentSrc;
  }

  /**
   * 关闭模态
   */
  cancel() {
    this.opened = !this.opened;
  }

  /**
   * 目录点击事件
   * @param data
   */
  folderClick(data: any) {
    this.folder = data.id + '/'
    this.pictureService.getPictureList(null, this.folder).subscribe(res=> {
      this.pictureList = res.json();
    });
  }

  /**
   * 返回上级目录
   */
  returnPreviousFolder() {
    let currentFolder: string = '';
    let folderList: Array<string> = this.folder.split('/');
    for (var i = 0; i < folderList.length - 2; i++) {
      currentFolder += folderList[i] + '/';
    }
    this.folder = currentFolder;
    this.pictureService.getPictureList(null, this.folder).subscribe(res=> {
      this.pictureList = res.json();
    });
  }

  /**
   * 关闭图片上传
   */
  closeUpload() {
    this.uploadOpened = !this.uploadOpened;
    console.log(this.targetFolder);
  }
}