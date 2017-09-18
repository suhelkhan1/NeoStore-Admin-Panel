import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise';

import { IImage } from '../../interfaces/image.model'
import { imageUrl } from '../apiUrls';

@Injectable()
export class ImageService {

  constructor(
    private http: Http
  ) { }


  imageUploadUser(imageInfo): Observable<IImage>{
    let formdata = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("userId", imageInfo.userId)
    console.log(formdata)

    return this.http.post(imageUrl, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }

  imageUploadProduct(imageInfo): Observable<IImage>{
    let formdata: FormData = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("productId", imageInfo.productId)

    return this.http.post(imageUrl, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }

  imageUploadProductCategory(imageInfo): Observable<IImage>{
    let formdata = new FormData()
    formdata.append("file", imageInfo.file)
    formdata.append("categoryId", imageInfo.productCatId)
    console.log(formdata)

    return this.http.post(imageUrl, formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }


  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
