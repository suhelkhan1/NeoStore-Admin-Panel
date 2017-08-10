import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Http, Response } from '@angular/http'

import { IColor } from '../../interfaces/color.model'

@Injectable()
export class ColorService {

  constructor(
    private http: Http
  ) { }

  url: string = 'http://10.0.100.213:3000/api/colors'

  getColors(): Observable<IColor>{
    return this.http.get(this.url ).map( (response: Response) => {
      return <IColor>response.json()
    } ).catch(this.handleError)
  }

   handleError(error: Response) { 
    return Observable.throw(error.json());
  }

}
