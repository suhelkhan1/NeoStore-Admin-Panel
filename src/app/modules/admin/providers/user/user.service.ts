import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http'

import { IUser } from '../../interfaces/user.model'

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }
  url = 'http://10.0.100.213:3000/api'
  current_user_accesToken: string
  curent_user_userId: string

  getUsers(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get(this.url + '/user_accounts?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  getUser(userId): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get( this.url + '/user_accounts/' + userId + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  getUserDetails(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    this.curent_user_userId = JSON.parse(localStorage.getItem('currentUserId'))
    return this.http.get( this.url + '/user_accounts/' + this.curent_user_userId + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
