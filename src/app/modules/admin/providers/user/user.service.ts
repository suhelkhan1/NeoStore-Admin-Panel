import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { IUser } from '../../interfaces/user.model'

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }
  url = 'http://10.0.100.213:3000/api/user_accounts'
  current_user_accesToken: string
  curent_user_userId: string

  getUsers(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get(this.url + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  getUser(userId): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get( this.url + '/' + userId + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  getUserDetails(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    this.curent_user_userId = JSON.parse(localStorage.getItem('currentUserId'))
    return this.http.get( this.url + '/' + this.curent_user_userId + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  addUser(userInfo): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url +'?access_token='+ this.current_user_accesToken, JSON.stringify(userInfo), options).map( (response: Response) => {
      return <IUser>response.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
