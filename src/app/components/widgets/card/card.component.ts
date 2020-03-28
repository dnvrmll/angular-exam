import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-widget',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardWidgetComponent {

  @Input() public data: any;
}
