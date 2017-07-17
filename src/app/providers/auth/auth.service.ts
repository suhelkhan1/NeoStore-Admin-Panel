import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import { IUserResponse } from '../../interfaces/user.model'

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  url = 'http://10.0.100.213:3000/api/user_accounts/';
  loggedIn: boolean = false
  accessToken: string

  loginAdmin(loginCrendentials): Observable<IUserResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'loginAdmin', JSON.stringify(loginCrendentials), options).map((response: Response) => {
      let user = <IUserResponse>response.json();
      if (user && user.response.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.response.id));
          localStorage.setItem('currentUserId', JSON.stringify(user.response.userId));
          this.loggedIn = true
          return response.json();
      }
    }).catch(this.handleError)
  }

  logout() {
    this.accessToken = JSON.parse(localStorage.getItem('currentUser'))
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'logout?access_token=' + this.accessToken, options).map( (response: Response)=>{
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      return response.json()
    })
  }

   resetPassword(email): Observable<string>{   
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url +'reset', JSON.stringify(email), options).map( (response: Response) => {
      return <string>response.json()
    })
  }

  setPassword(setInfo): Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let password = {
      newPassword: setInfo.password
    }
    return this.http.post(this.url +'reset-password'+'?access_token='+ setInfo.token , JSON.stringify(password), options).map( (response: Response) => {
      return <string>response.json()
    })
  }

  ifLoggedIn(){
    return this.loggedIn
  }

  handleError(error: Response) {
    
    return Observable.throw(error.json());
  }
}