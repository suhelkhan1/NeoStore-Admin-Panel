import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import { IUserResponse, IUser } from '../../interfaces/user.model'

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  url = 'http://10.0.100.213:3000/api/user_accounts/';

  loginAdmin(loginCrendentials): Observable<IUserResponse>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'login', JSON.stringify(loginCrendentials), options).map((response: Response) => {
      let user = <IUserResponse>response.json();
      if (user && user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.id));
          return response.json();
      }
    }).catch(this.handleError)
  }

  getUserDetails(userCrendentials): Observable<IUser>{
    return this.http.get(this.url + userCrendentials).map( (response:Response)=>{
      let userProfile = <IUser>response.json()
      if(userProfile && userProfile.user_id){
        localStorage.setItem('profile', JSON.stringify(userProfile));
        return response.json()
      }
    })
  }
  
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  handleError(error: Response) {
    
    return Observable.throw(error.json());
  }
}