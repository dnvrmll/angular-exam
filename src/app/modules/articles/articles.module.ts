import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleViewComponent, ArticleComponent } from './components';
import { ArticleRoutes } from './articles.routes';
import { FormFieldDirective } from '../../core/directives/form-fields';

@NgModule({
  imports: [
    CommonModule,
    FormFieldDirective,
    ArticleRoutes
  ],
  declarations: [
    ArticleViewComponent,
    ArticleComponent
  ],
  exports: [],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})

export class ArticleModule {}
