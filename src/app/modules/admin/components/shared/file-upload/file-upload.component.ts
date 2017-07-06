import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
const URL = '/api/';

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
    @Inject(JQ_TOKEN) private $:any
  ) {}
  
  /*fileUploadForm: FormGroup
  private fileUpload: FormControl*/
  fileUpload:any

  ngOnInit() {

    this.$('#fileUpload').on('change', (event) => {
      this.input = event
      this.numFiles = event.currentTarget.files.length
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
      fileUpload: this.fileUpload,
    })*/
  }

  uploadFiles(formValues){
    console.log(formValues)
  }

  onChange(event) {
    var files = event.srcElement.files;
    console.log(files);
  }

}
