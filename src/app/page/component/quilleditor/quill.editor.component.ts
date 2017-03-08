import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'quill-editor-component',
  templateUrl: './quill.editor.component.html'
})

export class QuillEditorComponent {
  /**
   * 内容
   * @type {string}
   */
  @Input() editorContent: string = ``;
  /**
   * placeholder
   * @type {{placeholder: string}}
   */
  editorConfig: any = {placeholder: "输入公告内容,支持html"};

  /**
   * 向上溢出  文章内容
   * @type {EventEmitter<string>}
   */
  @Output() emitContent = new EventEmitter<string>();

  constructor() {
  }

  /**
   * 初始化
   * @param quill
   */
  onEditorCreated(quill) {
  }

  /**
   * 内容改变
   * @param quill
   * @param html
   * @param text
   */
  onContentChanged({quill, html, text}) {
    this.emitContent.emit(html);
  }
}