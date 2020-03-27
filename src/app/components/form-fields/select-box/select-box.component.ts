import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.hmtl',
  styleUrls: ['./select-box.component.css']
})

export class SelectBoxComponent {

  @Input() public value = '';

  constructor() {}
}

