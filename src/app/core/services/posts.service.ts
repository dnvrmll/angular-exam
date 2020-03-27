import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private apiService: ApiService) {}

  public get(): Observable<any> {
    return this.apiService.get({ path: `/posts` });
  }
}
