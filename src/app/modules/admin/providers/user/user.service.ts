import { Injectable } from '@angular/core';
import { IUSer } from '../../interfaces/user.model'
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http'

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }
  url = 'http://10.0.100.213:3000/api'
  accesToken = JSON.parse(localStorage.getItem('currentUser'))
  getUsers(): Observable<IUSer>{
    return this.http.get(this.url + '/user_accounts?access_token=' + this.accesToken).map((response: Response) => {
      return <IUSer>response.json()
    }).catch(this.handleError)
  }

  getUser(userId): Observable<IUSer>{
    return this.http.get( this.url + '/user_accounts/' + userId + '?access_token=' + this.accesToken).map((response: Response) => {
      return <IUSer>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
