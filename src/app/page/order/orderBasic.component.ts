import { Component, Input } from "@angular/core";

@Component({
  moduleId: "orderBasic",
  selector: "order-basic",
  templateUrl: "orderBasic.component.html"
})

export class OrderBasicComponent {
  @Input() public orderBasic:any;
  @Input() public orderGoods:any;
}