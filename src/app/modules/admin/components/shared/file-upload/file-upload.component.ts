import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ToastsManager } from 'ng2-toastr'

import { UserService } from '../../../providers/user/user.service'
import { IUser2 } from '../../../interfaces/user.model'
import { IImage } from '../../../interfaces/image.model'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {

  input: any
  label: any
  numFiles: any
  element: any

  constructor(
    @Inject(JQ_TOKEN) private $:any,
    private userService: UserService,
    private toastr: ToastsManager
  ) {}
  
  /*fileUploadForm: FormGroup
  private fileUpload: FormControl*/
  fileUpload: any
  file: any

  ngOnInit() {

    this.$('#fileUpload').on('change', (event) => {
      this.input = event
      this.numFiles = event.currentTarget.files.length
      this.file = event.currentTarget.files[0]
      this.label = this.input.currentTarget.value.replace(/^.*[\\\/]/, '');
      if(this.numFiles === 0){
        this.$('#uploadFiles').val(' No file choosen')
      } else if(this.numFiles > 1 && this.numFiles !== 0){
        this.$('#uploadFiles').val(this.numFiles + ' files')
      } else {
        this.$('#uploadFiles').val(this.label)
      }
    })

    /*this.fileUpload = new FormControl('', [
      Validators.required
    ])

    

    this.fileUploadForm = new FormGroup ({
      fileUpload: this.fileUpload
    })*/
  }

  /*onSelect(event: any): void {
      let args = event.args;
      let fileName = args.file;
      let fileSize = args.size;
      console.log('File selected fileName: ', fileName)
      console.log('File selected fileSize: ', fileSize)
  };

  onRemove(event: any): void {
      let fileName = event.args.file;
      console.log('File removed fileName: ', fileName)      
  };

  onUploadStart(event: any): void {
      let fileName = event.args.file;
      console.log('Uploading start fileName: ', fileName)
  };

  onUploadEnd(event: any): void {
      this.uploadImage()
      let args = event.args;
      let fileName = args.file;
      let serverResponce = args.response;
      console.log('Uploaded fileName: ', fileName)
      console.log('Uploaded server response: ', serverResponce)
  };*/

  /*uploadFiles(formValues){
    console.log(formValues)
    let userInfo = {
      username: this.fileUpload,
    }

    this.userService.addUser2(formValues).subscribe(
      (response: IUser2) => {
        this.toastr.success('User Added')
        this.uploadImage()
        return response
      },
      (error: Error) => {
        this.toastr.error('Error')
        return error
      }
    )
  }*/

  uploadImage(formValues){
    /*let imageinfo = {
      productId: '595376cdbf493511744064b0',
      userId: '',
      belognsTo: 'product',
      image_isactive: true
      file: this.fileUpload
    }*/
    this.userService.imageUpload(this.file).subscribe(
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
