import { Component, AfterContentInit } from '@angular/core';
import { PostService } from '../../../../core/services/posts.service';
import { UserService } from 'src/app/core/services/user.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticleComponent implements AfterContentInit {

  public params = {
    search: ''
  };

  public articles: any[] = [];
  constructor(private postService: PostService, private userService: UserService) {}

  public ngAfterContentInit() {
    this.postService.get().pipe(
      mergeMap(dataPost => this.userService.getUser().pipe(
        map(users => {
          dataPost.forEach(post => {
            const res = users.find((u: any) => u.id === post.userId);
            return post.author = res;
          });
          return dataPost;
        })
      ))
    ).subscribe(data => {
      this.articles = data;
    });
  }


  public onGetParams(el: any) {
    console.log('e -', el);
  }
}
