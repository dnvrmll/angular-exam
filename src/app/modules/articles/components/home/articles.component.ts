import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticleComponent implements OnInit {

  public params = {
    search: ''
  };
  constructor() {}


  public ngOnInit() {
    // TODO
  }
}
