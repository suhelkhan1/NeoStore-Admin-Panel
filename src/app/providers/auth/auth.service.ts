import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import { IUserResponse } from '../../interfaces/user.model'
import { IUser } from '../../modules/admin/interfaces/user.model'
import { userUrl } from '../../modules/admin/providers/apiUrls';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  loggedIn: boolean = false
  accessToken: string

  loginAdmin(loginCrendentials): Observable<IUserResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(userUrl + 'loginAdmin', JSON.stringify(loginCrendentials), options).map((response: Response) => {
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
    return this.http.post(userUrl + 'logout?access_token=' + this.accessToken, options).map( (response: Response)=>{
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserId');
      return response.json()
    })
  }

   resetPassword(email): Observable<string>{   
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(userUrl +'reset', JSON.stringify(email), options).map( (response: Response) => {
      return <string>response.json()
    })
  }

  setPassword(setInfo): Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let password = {
      newPassword: setInfo.password
    }
    return this.http.post(userUrl +'reset-password'+'?access_token='+ setInfo.token , JSON.stringify(password), options).map( (response: Response) => {
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