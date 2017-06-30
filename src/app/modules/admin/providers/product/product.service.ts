import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

import { IProduct, IProductCategory } from '../../interfaces/product.model'

@Injectable()
export class ProductService {

  constructor(
    private http: Http
  ) { }
  accessToken = JSON.parse(localStorage.getItem('currentUser'))
  url = 'http://10.0.100.213:3000/api'
  getProductDetails(): Observable<IProduct> {
    return this.http.get(this.url + '/products?access_token=' + this.accessToken).map( (response: Response) => {
      return <IProduct>response.json()
    }).catch(this.handleError)
  }

  addProductCategory(productCategoryDetails): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/categories?access_token=' + this.accessToken, JSON.stringify(productCategoryDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  getProductCategories(): Observable<IProductCategory>{
    return this.http.get(this.url + '/categories?access_token=' + this.accessToken).map( (response:Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
