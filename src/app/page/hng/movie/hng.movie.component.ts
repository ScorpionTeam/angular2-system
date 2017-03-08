import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'hng-movie-component',
  templateUrl: './hng.movie.component.html'
})

export class HngMovieComponent implements OnInit {
  //当前活动对象
  public currentActiveObj: any = {};
  //tab列
  public selected: string = 'list';

  ngOnInit(): void {
  }

  getActive(data: any) {
    this.currentActiveObj = data;
    this.selected = 'entry';
    console.log(data);
  }
}