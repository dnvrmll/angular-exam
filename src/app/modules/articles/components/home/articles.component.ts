import { Component, AfterContentInit } from '@angular/core';
import { PostService } from '../../../../core/services/posts.service';
import { UserService } from 'src/app/core/services/user.service';
import { mergeMap, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticleComponent implements AfterContentInit {

  public params = {
    search: ''
  };

  public filterBy = 'Author';

  public keyUp = new Subject<string>();

  public articles: any[] = [];
  public searchArticles: any[] = [];
  constructor(private postService: PostService, private userService: UserService) {
    this.keyUp.pipe(
      map(event => event),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe({ next: (data) => this.onSearchArticle(`*${data}*`) });
  }

  public ngAfterContentInit() {
    this.onSearchArticle();
  }


  public onGetParams(el: any) {
    this.filterBy = el;
  }

  public onSearchArticle(filterBy?: any) {

    let compare: any;
    this.postService.get().pipe(
      mergeMap(dataPost => this.userService.getUser().pipe(
        map(users => {
          const searchArticles: any[] = [];
          dataPost.forEach(post => {
            const res = users.find((u: any) => u.id === post.userId);
            post.author = res;
            if (filterBy) {
              if (this.filterBy === 'Author') {
                compare = new RegExp('^' + filterBy.replace(/\*/g, '.*') + '$').test(post.author.name);
              }
              if (this.filterBy === 'Title') {
                compare = new RegExp('^' + filterBy.replace(/\*/g, '.*') + '$').test(post.title);
              }
              if (this.filterBy === 'Body') {
                compare = new RegExp('^' + filterBy.replace(/\*/g, '.*') + '$').test(post.body);
              }
              if (compare) {
                searchArticles.push(dataPost);
              }
            }
          });

          if (searchArticles.length > 0) {
            return searchArticles;
          } else {
            return dataPost;
          }
        })
      ))
    ).subscribe(data => {
      this.articles = data;
    });
  }
}
