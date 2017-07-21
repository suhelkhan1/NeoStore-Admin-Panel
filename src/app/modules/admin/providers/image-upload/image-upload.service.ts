import { Injectable } from '@angular/core';
import { ImageService } from '../image/image.service'
import { ToastsManager } from 'ng2-toastr'

import { IImage } from '../../interfaces/image.model'

@Injectable()
export class ImageUploadService {

  constructor(
    private imageService: ImageService,
    private toastr: ToastsManager
  ) { }

  imageInfo: any[] = [];

  insertData(data){
    this.imageInfo.push(data)
    console.log(this.imageInfo)
  }


  uploadImage(){
    let image = {
      file: this.imageInfo[0],
      id: this.imageInfo[1]
    }
    this.imageService.imageUpload(image).subscribe(
      (response: IImage) => {
        this.toastr.success('Image Uploaded', 'Success!')
        return response
      },
      (error: Error) => {
        this.toastr.error('Image Uploaded Error')
        return error
      }
    )
  }
}
