import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager } from 'ng2-toastr'

import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ImageService } from '../../../providers/image/image.service'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bodyClasses:string = "update-user-page";
  body = document.getElementsByTagName('body')[0];

  constructor(
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    @Inject(JQ_TOKEN) private $: any
  ) {}

  user: IUser
  file: File
  hasImage: boolean = false

  updateUserForm: FormGroup
  private userRoles: FormControl
  private isActive: FormControl
  private firstName: FormControl
  private lastName: FormControl
  private email: FormControl
  private gender: FormControl
  private phoneNumber: FormControl
  private dateOfBirth: FormControl
  private username: FormControl
  private fileLabel: FormControl

  ngOnInit() {
    this.body.classList.add(this.bodyClasses);   //add the class   
    this.$(document).ready( ()=>{
      this.$('input').iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" // optional
      })
    })

    this.userRoles = new FormControl('', [Validators.required])
    this.isActive = new FormControl('', [Validators.required])
    this.firstName = new FormControl('', [Validators.required])
    this.lastName = new FormControl('', [Validators.required])
    this.email = new FormControl({
      value:'', 
      disabled: true
    }, [
      Validators.required
    ])
    this.gender = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [Validators.required])
    this.dateOfBirth = new FormControl('', [Validators.required])
    this.username = new FormControl('', [Validators.required])
    this.fileLabel = new FormControl('No file choosen')

    this.updateUserForm = new FormGroup ({
      userRoles: this.userRoles,
      isActive: this.isActive,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      username: this.username,
      fileLabel: this.fileLabel
    })

    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getUser(id)  
    })
  }

  getUser(id){
    this.userService.getUser(id).subscribe(
      (response: IUser) => {
        this.populateUserForm(response)
        return response
      },
      (error: Error) => {
        this.toastr.error(error.message, 'Error!')
        return error
      }
    )
  }
  populateUserForm(user: IUser){
    if (this.updateUserForm) {
        this.updateUserForm.reset();
    }

    this.user = user

    this.updateUserForm.patchValue({
      userRoles: this.user.role,
      isActive: this.user.is_active,
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
      gender: this.user.gender,
      phoneNumber: this.user.phone_no,
      dateOfBirth: new Date(this.user.birth_date).toISOString().split('T')[0],
      username: this.user.username
    })
  }

  updateUser(formValues){
    let userInfo = {
      id: this.user.id,
      first_name: formValues.firstName ,
      last_name: formValues.lastName ,
      email: formValues.email,
      role: formValues.userRoles,
      gender: formValues.gender,
      phone_no: formValues.phoneNumber,
      birth_date: formValues.dateOfBirth,
      is_active: formValues.isActive,
      username: formValues.username
    }
    console.log(userInfo)
    this.userService.updateUser(userInfo).subscribe(
      (response: IUser) => {
        this.fileUploadEvent()
        this.toastr.success('User Updated', 'Success!')
        this.router.navigate(['/admin/getusers'])
        return response
      },
      (error: Error) => {
        this.toastr.error(error.message, 'Error!')
        return error
      }
    )
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
      userId: this.user.id,
    }
    if(imageInfo.file){
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
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
