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
  public isLoading: boolean = true;

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
    this.onSearchArticle();
  }

  public onSearchArticle(filterBy?: any) {
    this.isLoading = true;
    const searchArticles: any[] = [];
    let compare: any;
    const txt = filterBy ? filterBy : (this.params.search ? this.params.search : '');
    this.postService.get().pipe(
      mergeMap(dataPost => this.userService.getUser().pipe(
        map(users => {
          dataPost.forEach(post => {
            const res = users.find((u: any) => u.id === post.userId);
            post.author = res;
            if (txt) {
              if (this.filterBy === 'Author') {
                compare = new RegExp('^' + txt.replace(/\*/g, '.*') + '$').test(post.author.name);
              }
              if (this.filterBy === 'Title') {
                compare = new RegExp('^' + txt.replace(/\*/g, '.*') + '$').test(post.title);
              }
              if (this.filterBy === 'Body') {
                compare = new RegExp('^' + txt.replace(/\*/g, '.*') + '$').test(post.body);
              }
              if (compare) {
                return searchArticles.push(post);
              }
            }
          });

          if (txt) {
            return searchArticles;
          } else {
            return dataPost;
          }
        })
      ))
    ).subscribe(data => {
      this.articles = data;
      this.isLoading = false;
    });
  }
}
