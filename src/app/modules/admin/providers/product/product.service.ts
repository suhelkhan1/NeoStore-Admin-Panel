import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'

import { IProduct, IProductCategory } from '../../interfaces/product.model'
import { productUrl, categoryUrl } from '../apiUrls';

@Injectable()
export class ProductService {

  constructor(
    private http: Http
  ) { }
  accessToken = JSON.parse(localStorage.getItem('currentUser'))

  //Products CRUD API calls
  //get list of the product 
  getProductDetails(): Observable<IProduct> {
    return this.http.get(productUrl + '?access_token=' + this.accessToken).map( (response: Response) => {
      return <IProduct>response.json()
    }).catch(this.handleError)
  }

  //Get the single product
  getProduct(productId): Observable<IProduct>{
    return this.http.get(productUrl + '/'+ productId +'?filter[include]=images&access_token=' + this.accessToken).map( (response: Response) => {
      return <IProduct>response.json()
    }).catch(this.handleError)
  }

  //Add single product into database
  addProduct(productDetails): Observable<IProduct>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(productUrl + '?access_token=' + this.accessToken ,JSON.stringify(productDetails), options).map( (response: Response)=>{
      return <IProduct>response.json()
    }).catch(this.handleError)
  }

  //Update the single product
  updateProduct(productDetails): Observable<IProduct>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(productUrl + '/' + productDetails.id + '?access_token=' + this.accessToken, JSON.stringify(productDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  //Delete the single product
  deleteProduct(productId): Observable<IProduct> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(productUrl + '/' + productId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <IProduct>respnse.json()
    })
  }
  //Product Category CRUD API calls
  addProductCategory(productCategoryDetails): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(categoryUrl + '?access_tokeen=' + this.accessToken, JSON.stringify(productCategoryDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }
  getProductCategories(): Observable<IProductCategory>{
    return this.http.get(categoryUrl + '?access_token=' + this.accessToken).map( (response:Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  getProductCategory(productCategoryId): Observable<IProductCategory>{
    return this.http.get(categoryUrl + '/' +productCategoryId+ '?filter[include]=images&access_token=' + this.accessToken).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  updateProductCategory(productCategoryDetails): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.put(categoryUrl + '/' + productCategoryDetails.id + '?access_token=' + this.accessToken, JSON.stringify(productCategoryDetails), options).map( (response: Response) => {
      return <IProductCategory>response.json()
    }).catch(this.handleError)
  }

  deleteProductCategory(productCategoryId): Observable<IProductCategory>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(categoryUrl + '/' + productCategoryId + '?access_token=' + this.accessToken, options).map( (respnse: Response)=>{
      return <IProductCategory>respnse.json()
    })
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
