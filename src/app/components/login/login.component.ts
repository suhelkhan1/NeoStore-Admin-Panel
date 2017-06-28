import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }   from '@angular/router';

import { AuthService } from '../../providers/auth/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  bodyClasses:string = "login-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  loginInvalid: boolean = false

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));
  userId: any;

  user: any;
  

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
      Validators.maxLength(20),
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

    this.getUserDetails(this.userToken, this.userId)

  }

  getUserDetails(userToken, userId){
    let userCrendentials = {
      userToken: this.userToken,
      userId: this.userId
    }
    this.authService.getUserDetails(userCrendentials).subscribe( response =>{
      console.log('Auth Gaurd', response);
    })
  }

  loginAdmin(formValues){
    this.authService.loginAdmin(formValues).subscribe( 
      response => {
          this.user = response;
          this.router.navigate(['admin']);   
      },
      error => {
          this.loginInvalid = true
      })
  }

  ngOnDestroy() {
    //remove the login-page class to the body
    this.body.classList.remove(this.bodyClasses);
  }



}
