import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

//Order Model
import { IOrder } from '../../interfaces/oder.model'
import { ordersUrl } from '../apiUrls';

@Injectable()
export class OrderService {

  constructor(
    private http: Http
  ) { }

  accessToken = JSON.parse(localStorage.getItem('currentUser'))

  getOrders(): Observable<IOrder> {
    return this.http.get(ordersUrl).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  getOrder(orderId): Observable<IOrder> {
    return this.http.get(ordersUrl + '/' + orderId + '?access_token=' + this.accessToken).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  updateOrder(orderId): Observable<IOrder> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(ordersUrl + '/' + orderId + '?access_token=' + this.accessToken, JSON.stringify(orderId), options).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  deleteOrder(orderId): Observable<IOrder> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(ordersUrl + '/Orders/' + orderId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <IOrder>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
