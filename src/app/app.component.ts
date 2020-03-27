import { Component, AfterViewInit } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-exam';
  constructor(private userService: UserService) {}

  public ngAfterViewInit() {
    this.userService.getUser().subscribe((data) => {
      console.log('res- ', data);
    });
  }
}
