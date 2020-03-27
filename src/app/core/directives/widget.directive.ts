import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWidgetComponent } from '../../components/widgets';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardWidgetComponent
  ],
  exports: [
    CardWidgetComponent
  ]
})

export class WidgetDirective {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: WidgetDirective,
      providers: []
    };
  }
}
