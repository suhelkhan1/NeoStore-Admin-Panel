import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IImage } from '../../interfaces/image.model'

@Injectable()
export class ImageService {

  constructor(
    private http: Http
  ) { }

  url = 'http://10.0.100.213:3000/api/images/upload'

  imageUploadUser(imageInfo): Observable<IImage>{
    let formdata = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("userAccountId", imageInfo.userId)
    console.log(formdata)

    return this.http.post(this.url, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }

  imageUploadProduct(imageInfo): Observable<IImage>{
    let formdata: FormData = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("productId", imageInfo.productId)

    return this.http.post(this.url, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }

  imageUploadProductCategory(imageInfo): Observable<IImage>{
    let formdata = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("categoryId", imageInfo.productCatId)
    console.log(formdata)

    return this.http.post(this.url, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }


  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
