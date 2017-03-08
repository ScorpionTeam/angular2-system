import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../service/chart.service';
@Component({
  selector: 'chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  //chart数据对象
  chartData: any = {};

  ngOnInit(): void {
    this.chartService.getChartData().subscribe(res=> {
      this.chartData = res.json();
    });
  }

  constructor(private chartService: ChartService) {
  }

}