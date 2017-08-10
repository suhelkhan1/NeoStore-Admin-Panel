import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

import { ICart } from '../../interfaces/cart.model'

@Injectable()
export class CartService {

  constructor(
    private http: Http
  ) { }

  accessToken = JSON.parse(localStorage.getItem('currentUser'))
  url = 'http://10.0.100.213:3000/api/shoppingcart'

  getcarts(): Observable<ICart> {
    return this.http.get(this.url).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  getcart(cartId): Observable<ICart> {
    return this.http.get(this.url + '/' + cartId + '?access_token=' + this.accessToken).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  updatecart(cartId): Observable<ICart> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(this.url + '/' + cartId + '?access_token=' + this.accessToken, JSON.stringify(cartId), options).map( (response: Response) =>{
      return <ICart> response.json()
    }).catch(this.handleError)
  }

  deletecart(cartId): Observable<ICart> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(this.url + '/carts/' + cartId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <ICart>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
