import {Component} from '@angular/core';
@Component({
  selector: 'article-component',
  templateUrl: './article.component.html'
})

export class ArticleComponent {

  /**
   * tab 当前选择id
   * @type {string}
   */
  selected: string = 'list';

  /**
   * 当前文章对象
   * @type {{}}
   */
  articleObj: any;

  /**
   *当前目录对象
   */
  cateObj: any;

  /**
   * 赋值
   * @param data
   */
  copyObj(data: any) {
    this.selected = 'entry';
    this.articleObj = data;
  }

  /**
   * 创建文章
   * @param data
   */
  copyCate(data: any) {
    this.selected = 'entry';
    this.cateObj = data;
  }

  /**
   * 手动触发 切换tab 选项
   * @param data
   */
  change(data: any) {
    this.articleObj = {};
  }


}