import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})

export class InputComponent implements ControlValueAccessor {

  @Input() public value = '';
  @Input() public placeHolder = '';
  @Input() public inputType = 'text';
  @Input() public icon = '';
  @Input() public showHint = '';
  @Output() public inputChange = new EventEmitter<any>();

  constructor() {}

  public propagateChange = (_: any) => {};

  public writeValue(value: any) {
    if (value !== undefined && value !== this.value ){
      this.value = value;
    }
  }
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  public registerOnTouched() {}

  public onInputChanged(value) {

    this.value = value;
    this.inputChange.emit(value);
  }
}

