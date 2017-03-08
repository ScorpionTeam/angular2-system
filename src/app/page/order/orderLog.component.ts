import { Component, Input } from "@angular/core";

@Component({
  moduleId: "orderLog",
  selector: "order-log",
  templateUrl: "orderLog.component.html"
})

export class OrderLogComponent {
  @Input() public orderLog:any;
}