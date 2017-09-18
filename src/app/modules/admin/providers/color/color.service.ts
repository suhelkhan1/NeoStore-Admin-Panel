import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http'

import { IColor } from '../../interfaces/color.model'
import { colorUrl } from '../apiUrls';

@Injectable()
export class ColorService {

  constructor(
    private http: Http
  ) { }


  getColors(): Observable<IColor>{
    return this.http.get(colorUrl ).map( (response: Response) => {
      return <IColor>response.json()
    } ).catch(this.handleError)
  }

   handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
