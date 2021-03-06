import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr'

import { AuthService } from '../../providers/auth/auth.service'
import { UserService } from '../../modules/admin/providers/user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService:UserService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  bodyClasses:string = "login-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  loginInvalid: boolean = false

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
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
    this.password = new FormControl('', [
      Validators.required,
      //Validators.minLength(5),
      Validators.maxLength(15)
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    })

    //Checking for persistent login
    this.userService.getUserDetails().subscribe(
      (response) => {
        this.router.navigate(['/admin'])
        return response
      },
      (error: Error) => {
        /*this.toastr.error('Not authenticated user', 'Access Denied')*/
        this.router.navigate(['/login'])
        return error
      }
    )
    
  }

  loginAdmin(formValues){
    this.authService.loginAdmin(formValues).subscribe( 
      (response) => {
          this.user = response;
          this.toastr.success('logged in', 'Success!')
          this.router.navigate(['/admin']);   
      },
      (error: Error) => {
          this.loginInvalid = true
          this.errorMessage = error["error"]
      })
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }



}
