import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import { IUser, IUserResponse } from '../../interfaces/user.model'

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  loginAdmin(adminDetails): Observable<IUserResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    const url = 'http://10.0.100.212:3000/api/v1/login';
    return this.http.post(url, JSON.stringify(adminDetails), options).map((response: Response) => {
      let admin = <IUserResponse>response.json();
      if (admin && admin.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(admin.accessToken));
          return response.json();
      }
    }).catch(this.handleError)
  }
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  handleError(error: Response) {
    
    return Observable.throw(error.json());
  }
}