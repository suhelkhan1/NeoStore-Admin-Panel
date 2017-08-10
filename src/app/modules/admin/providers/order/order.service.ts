import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

//Order Model
import { IOrder } from '../../interfaces/oder.model'

@Injectable()
export class OrderService {

  constructor(
    private http: Http
  ) { }

  accessToken = JSON.parse(localStorage.getItem('currentUser'))
  url = 'http://10.0.100.213:3000/api/orders'

  getOrders(): Observable<IOrder> {
    return this.http.get(this.url).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  getOrder(orderId): Observable<IOrder> {
    return this.http.get(this.url + '/' + orderId + '?access_token=' + this.accessToken).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  updateOrder(orderId): Observable<IOrder> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(this.url + '/' + orderId + '?access_token=' + this.accessToken, JSON.stringify(orderId), options).map( (response: Response) =>{
      return <IOrder> response.json()
    }).catch(this.handleError)
  }

  deleteOrder(orderId): Observable<IOrder> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(this.url + '/Orders/' + orderId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <IOrder>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
