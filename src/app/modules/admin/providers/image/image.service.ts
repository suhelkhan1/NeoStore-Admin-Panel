import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { IImage } from '../../interfaces/image.model'

@Injectable()
export class ImageService {

  constructor(
    private http: Http
  ) { }


  imageUpload(imageInfo): Observable<IImage>{

    console.log('file:', imageInfo.file, 'image:', imageInfo.productId)
    let formdata = new FormData();
    formdata.append("file", imageInfo.file);
    formdata.append("productId", imageInfo.id)
    console.log(formdata);

    return this.http.post('http://10.0.100.213:3000/api/images/upload', formdata).map( (response: Response) => {
      return <IImage>response.json()
    }).catch(this.handleError)
  }

  handleError(error: Response) { 
    return Observable.throw(error.json());
  }
}
