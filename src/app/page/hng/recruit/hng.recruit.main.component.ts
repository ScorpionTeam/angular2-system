import {Component} from '@angular/core';
@Component({
  selector: 'hng-recruit-main-component',
  templateUrl: './hng.recruit.main.component.html'
})

export class HngRecruitMainComponent {
  public selected: string = 'list';
  /**
   * 当前招聘对象
   * @type {{}}
   */
  currentRecruit:any={};
}