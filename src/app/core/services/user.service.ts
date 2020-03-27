import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private apiService: ApiService) {}

  public getUser(): Observable<any> {
    return this.apiService.get({ path: `/users`});
  }
}
