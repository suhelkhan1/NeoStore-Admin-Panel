import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ImageUploadService } from '../../../providers/image-upload/image-upload.service'
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {


  constructor(
    @Inject(JQ_TOKEN) private $:any,
    private imageUploadService: ImageUploadService
  ) {}

  fileUpload: any
  uploadFiles: string = "No file choosen"
  file: any
  input: any
  label: any
  numFiles: any


  ngOnInit() {

  }
  
  fileEvent(event){
    this.input = event
    this.numFiles = this.input.currentTarget.files.length
    this.file = this.input.currentTarget.files[0]
    this.label = this.input.currentTarget.value.replace(/^.*[\\\/]/, '');
    if(this.numFiles === 0){
      this.uploadFiles = 'No file choosen'
    } else if(this.numFiles > 1 && this.numFiles !== 0){
        this.uploadFiles = this.numFiles + ' files'
    } else {
        this.uploadFiles = this.label
    }
    this.imageUploadService.insertData(this.file)
  }

  

}
