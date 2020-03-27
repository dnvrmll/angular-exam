import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `http://jsonplaceholder.typicode.com`;

  constructor(private httpClient: HttpClient) {}

  public post(args: { path: string, params: any}): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${args.path}`, args.params).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  public get(args: { path: string }): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${args.path}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
