import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { ImageService } from '../../../providers/image/image.service'
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {


  constructor(
    private imageService: ImageService
  ) {}

  fileUpload: any
  uploadFiles: string = "No file choosen"
  files: any
  input: any
  label: any
  numFiles: any


  ngOnInit() {

  }
  
  fileEvent(event){
    this.input = event
    this.numFiles = this.input.currentTarget.files.length
    this.files = this.input.currentTarget.files[0]
    this.label = this.input.currentTarget.value.replace(/^.*[\\\/]/, '');
    if(this.numFiles === 0){
      this.uploadFiles = 'No file choosen'
    } else if(this.numFiles > 1 && this.numFiles !== 0){
        this.uploadFiles = this.numFiles + ' files'
    } else {
        this.uploadFiles = this.label
    }
  }

  uploadImage(){
    let imageInfo = {
      files: this.files,
      productId: '59770dbcee32740640a49f59'
    }
    this.imageService.imageUploadProduct(imageInfo).subscribe(
      response => response,
      error => error
    )
  }
}
