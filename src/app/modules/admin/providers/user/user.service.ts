import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { IUser } from '../../interfaces/user.model'
import { userUrl } from '../apiUrls';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }
  current_user_accesToken: string
  curent_user_userId: string

  getUsers(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get(userUrl + '?access_token=' + this.current_user_accesToken).map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  //Get single user details
  getUser(userId): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    return this.http.get( userUrl + '/' + userId + '?access_token=' + this.current_user_accesToken + '&filter={"include":"images"}').map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  //Call for recheck loged in user details in main header
  getUserDetails(): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))
    this.curent_user_userId = JSON.parse(localStorage.getItem('currentUserId'))
    return this.http.get( userUrl + '/' + this.curent_user_userId + '?access_token=' + this.current_user_accesToken + '&filter={"include":"images"}').map((response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  addUser(userInfo): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(userUrl +'?access_token='+ this.current_user_accesToken, JSON.stringify(userInfo), options).map( (response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  updateUser(userInfo): Observable<IUser>{
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.patch(userUrl +'/'+ userInfo.id +'?access_token='+ this.current_user_accesToken, JSON.stringify(userInfo), options).map( (response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  deleteUser(userInfo){
    this.current_user_accesToken = JSON.parse(localStorage.getItem('currentUser'))    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    console.log(userInfo)
    return this.http.patch(userUrl +'/'+ userInfo.id +'?access_token='+ this.current_user_accesToken, JSON.stringify(userInfo), options).map( (response: Response) => {
      return <IUser>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
