import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager } from 'ng2-toastr'

import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'

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
    @Inject(JQ_TOKEN) private $: any
  ) {}

  user: IUser

  updateUserForm: FormGroup
  private userRoles: FormControl
  private firstName: FormControl
  private lastName: FormControl
  private email: FormControl
  private gender: FormControl
  private phoneNumber: FormControl
  private dateOfBirth: FormControl
  private username: FormControl

  ngOnInit() {
    this.body.classList.add(this.bodyClasses);   //add the class   
    this.$(document).ready( ()=>{
      this.$('input').iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" // optional
      })
    })
    this.$('input').on('change', (event)=>{
      this.gender.setValue(event.currentTarget.value) 
      //console.log(this.gender)
    })

    this.firstName = new FormControl('', [Validators.required])
    this.lastName = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.userRoles = new FormControl('', [Validators.required])
    this.gender = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [Validators.required])
    this.dateOfBirth = new FormControl('', [Validators.required])
    this.username = new FormControl('', [Validators.required])

    this.updateUserForm = new FormGroup ({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userRoles: this.userRoles,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      username: this.username
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
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
      userRoles: this.user.role,
      gender: this.user.gender,
      phoneNumber: this.user.phone_no,
      dateOfBirth: new Date(this.user.birth_date).toLocaleDateString(),
      username: this.user.username
    })
  }
  updateUser(formValues){
    let userInfo = {
      id: this.user.user_id,
      first_name: formValues.firstName ,
      last_name: formValues.lastName ,
      email: formValues.email,
      role: formValues.userRoles,
      gender: formValues.gender,
      phone_no: formValues.phoneNumber,
      birth_date: formValues.dateOfBirth,
      is_active: true,
      username: formValues.username
    }
    console.log(userInfo)
    this.userService.updateUser(userInfo).subscribe(
      (response: IUser) => {
        this.toastr.success('User Updated', 'Success!')
        this.router.navigate(['/admin/getuser'])
        return response
      },
      (error: Error) => {
        this.toastr.error(error.message, 'Error!')
        return error
      }
    )
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
