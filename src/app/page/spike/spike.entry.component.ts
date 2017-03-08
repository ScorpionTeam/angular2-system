import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'spike-entry-component',
  templateUrl: './spike.entry.component.html'
})

export class SpikeEntryComponent implements OnInit {

  currentSeller: any = {};

  ngOnInit(): void {
  }

  copySeller(data: any) {
    this.currentSeller = data;
  }

}