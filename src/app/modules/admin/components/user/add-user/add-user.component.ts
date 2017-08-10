import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr'
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
//import { EqualValidatorDirective } from '../../../directives/equal-validator/equal-validator.directive'
import { ImageService } from '../../../providers/image/image.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  bodyClasses:string = "add-user-page";
  body = document.getElementsByTagName('body')[0];

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private imageService: ImageService,
    @Inject(JQ_TOKEN) private $: any
  ) {}

  addUserForm: FormGroup
  private userRoles: FormControl
  private firstName: FormControl
  private lastName: FormControl
  private email: FormControl
  private password: FormControl
  private confirmPassword: FormControl
  private gender: FormControl
  private phoneNumber: FormControl
  private dateOfBirth: FormControl
  private username: FormControl
  private fileLabel: FormControl

  userId: string 
  hasImage: boolean = false
  file: File

  ngOnInit() {
    this.body.classList.add(this.bodyClasses);
    this.$(document).ready( ()=>{
      this.$('input').iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" // optional
      })
    })

    this.$('input').on('ifChanged', (event)=>{
      this.gender.setValue(event.currentTarget.value) 
      //console.log(this.gender)
    })


    this.userRoles = new FormControl('', [Validators.required])
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(24),
      Validators.pattern('[a-zA-Z][a-zA-Z ]+')
    ])
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(24),
      Validators.pattern('[a-zA-Z][a-zA-Z ]+')
    ])
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ])
    this.password = new FormControl('', [
      Validators.required
    ])
    this.confirmPassword = new FormControl('', [
      Validators.required
    ])
    this.gender = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
    this.dateOfBirth = new FormControl('', [Validators.required])
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(24)
    ])
    this.fileLabel = new FormControl('No file choosen')

    this.addUserForm = new FormGroup ({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userRoles: this.userRoles,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      password: this.password,
      confirmPassword: this.confirmPassword,
      username: this.username,
      fileLabel: this.fileLabel
    })
  }

  addUser(formValues){
    console.log(formValues)
    let userInfo = {
      first_name: formValues.firstName ,
      last_name: formValues.lastName ,
      email: formValues.email,
      role: formValues.userRoles,
      gender: formValues.gender,
      phone_no: formValues.phoneNumber,
      birth_date: formValues.dateOfBirth,
      is_active: true,
      username: formValues.username,
      password: formValues.password,
    }
    if(this.hasImage){
      this.userService.addUser(userInfo).subscribe(
        (response: IUser) => {
          this.userId = response.id
          this.fileUploadEvent()
          this.toastr.success('User added', 'Success!')
          this.router.navigate(['/admin/getusers'])
          return response
        },
        (error) => {
          let er = JSON.parse(error._body)
          this.toastr.error(er.error.message, 'Error!', {dismiss: 'click'})
        }
      )
    }
  }

  fileEvent(event){
    this.hasImage = true
    let inputFile = event
    let numFiles = inputFile.currentTarget.files.length
    this.file = inputFile.target.files[0]
    let label = inputFile.currentTarget.value.replace(/^.*[\\\/]/, '');
    if(numFiles === 0){
      this.hasImage = false
      this.fileLabel.setValue('No file choosen')
    } else if(numFiles > 1 && numFiles !== 0){
        this.fileLabel.setValue(numFiles + ' files')
    } else {
        this.fileLabel.setValue(label)
    }
  }

  fileUploadEvent(){
    let imageInfo = {
      file: this.file, 
      userId: this.userId,
    }
    this.imageService.imageUploadUser(imageInfo).subscribe(
      (response) =>{
        this.toastr.success('Image Uploaded', 'Success!')
        return response
      },
      (error: Error) =>{
        this.toastr.error('Image Upload Failed', 'Error!')
        return error
      }
    )
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
