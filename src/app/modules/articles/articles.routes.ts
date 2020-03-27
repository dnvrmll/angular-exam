import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent, ArticleViewComponent } from './components';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: ArticleComponent },
  { path: '/:id', component: ArticleViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ArticleRoutes {}
