import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr'

import { AuthService } from '../../providers/auth/auth.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  bodyClasses:string = "login-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  loginInvalid: boolean = false

  forgotPasswordForm: FormGroup;
  email: FormControl; 
  user: any
  
  errorMessage: string = "";
  

  ngOnInit() {
    //Add the login-page class to the body
    this.body.classList.add(this.bodyClasses);   //add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });

    //Login Form validation
    this.email = new FormControl('', [
      Validators.required, 
      Validators.maxLength(30),
      Validators.email
    ]);
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    })
  }

  forgotPassword(formValues){
    console.log(formValues)
    this.authService.resetPassword(formValues).subscribe(
      (response) => {
        this.toastr.success('Email sent to your mail','Success!' , { dismiss: 'click'})
        return response
      },
      (error: Error) =>{
        return error
      }
    )
  }


  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
