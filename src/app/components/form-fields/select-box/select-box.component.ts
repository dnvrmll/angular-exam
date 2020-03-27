import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true
    }
  ]
})

export class SelectBoxComponent implements ControlValueAccessor {

  @Input() public value = '';


  @Input() public label = '';
  @Input() public options: any[] = [];
  @Input() public showHint = '';
  // tslint:disable-next-line: no-output-native
  @Output() public change = new EventEmitter<any>();


  public validateValue = new FormControl();

  constructor() { }

  public propageteChange = (_: any) => { };

  public writeValue(value: any) {
    if (value !== undefined && value !== this.value) {
      this.value = value;
      this.propageteChange(this.value);
    }
  }

  public onInputChanged() {
    if (this.value === null) {
      this.change.emit([]);
      this.propageteChange([]);
    } else {
      this.change.emit(this.value);
      this.propageteChange(this.value);
    }
  }

  public registerOnChange(fn: any) {
    this.propageteChange = fn;
  }

  public registerOnTouched() { }
}

