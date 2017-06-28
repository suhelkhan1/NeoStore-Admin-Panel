import { Injectable } from '@angular/core';
import { IUSer } from '../../interfaces/user.model'
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http'

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

  getUser(): Observable<IUSer>{
    return this.http.get('https://jsonplaceholder.typicode.com/users').map((response: Response) => {
      return <IUSer>response.json()
    }).catch(this.handleError)
  }

  updateUser(userId): Observable<IUSer>{
    return this.http.get('https://jsonplaceholder.typicode.com/users/', userId).map((response: Response) => {
      return <IUSer>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
