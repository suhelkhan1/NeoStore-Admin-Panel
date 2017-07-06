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

  //Products CRUD API calls
  getProductDetails(): Observable<IProduct> {
    return this.http.get(this.url + '/products?access_token=' + this.accessToken).map( (response: Response) => {
      return <IProduct>response.json()
    }).catch(this.handleError)
  }
  getProduct(productId): Observable<IProduct>{
    return this.http.get(this.url + '/products/'+ productId +'?access_token=' + this.accessToken).map( (response: Response) => {
      return <IProduct>response.json()
    }).catch(this.handleError)
  }
  addProduct(productDetails): Observable<IProduct>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/products?access_token=' + this.accessToken ,JSON.stringify(productDetails), options).map( (response: Response)=>{
      return <IProduct>response.json()
    }).catch(this.handleError)
  }

  updateProduct(productDetails): Observable<IProduct>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.url + '/products/' + productDetails.id + '?access_token=' + this.accessToken, JSON.stringify(productDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  //Product Category CRUD API calls
  addProductCategory(productCategoryDetails): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.url + '/categories?access_tokeen=' + this.accessToken, JSON.stringify(productCategoryDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }
  getProductCategories(): Observable<IProductCategory>{
    return this.http.get(this.url + '/categories?access_token=' + this.accessToken).map( (response:Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  getProductCategory(productCategoryId): Observable<IProductCategory>{
    return this.http.get(this.url + '/categories/' +productCategoryId+ '?access_token=' + this.accessToken).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  updateProductCategory(productCategoryDetails): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(this.url + '/categories/' + productCategoryDetails.id + '?access_token=' + this.accessToken, JSON.stringify(productCategoryDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  deleteProductCategory(productCategoryId): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(this.url + '/categories/' + productCategoryId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <IProductCategory>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
