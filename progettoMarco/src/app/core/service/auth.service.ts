import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../feature/model/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3001/login';

  constructor(private http: HttpClient) {}

  loginUser(email, password): Observable<any> {
    return this.http
      .post<any>(this.url, { email, password }, { observe: 'response' })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  setLoggedUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }
}
