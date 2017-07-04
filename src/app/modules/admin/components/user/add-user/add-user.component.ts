import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ToastsManager } from 'ng2-toastr'

import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  bodyClasses:string = "add-user-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  constructor(
    private userService: UserService,
    private toastr: ToastsManager
  ) { }

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


  ngOnInit() {
    this.body.classList.add(this.bodyClasses);
    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });
    jQuery('input[name="gender"]').on('ifChecked', (event)=>{
      this.gender = jQuery(this).val();
      console.log(jQuery(this).val())
    })

    this.userRoles = new FormControl('', [Validators.required])
    this.firstName = new FormControl('', [Validators.required])
    this.lastName = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.confirmPassword = new FormControl('', [Validators.required])
    this.gender = new FormControl('', [Validators.required])
    this.phoneNumber = new FormControl('', [Validators.required])
    this.dateOfBirth = new FormControl('', [Validators.required])

    this.addUserForm = new FormGroup ({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userRoles: this.userRoles,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  addUser(formValues){
    console.log(formValues)
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
