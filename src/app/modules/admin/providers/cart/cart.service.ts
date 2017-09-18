import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

import { ICart } from '../../interfaces/cart.model'
import { cartUrl } from '../apiUrls';

@Injectable()
export class CartService {

  constructor(
    private http: Http
  ) { }

  accessToken = JSON.parse(localStorage.getItem('currentUser'))

  getcarts(): Observable<ICart> {
    return this.http.get(cartUrl).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  getcart(cartId): Observable<ICart> {
    return this.http.get(cartUrl + '/' + cartId + '?access_token=' + this.accessToken).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  updatecart(cartId): Observable<ICart> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(cartUrl + '/' + cartId + '?access_token=' + this.accessToken, JSON.stringify(cartId), options).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  deletecart(cartId): Observable<ICart> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(cartUrl + '/carts/' + cartId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <ICart>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
