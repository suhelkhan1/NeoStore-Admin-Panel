import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { AuthService } from '../../providers/auth/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bodyClasses:string = "login-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
  }

  loginInvalid: boolean = false

  loginAdmin(formValues){
    this.authService.loginAdmin(formValues).subscribe( 
    response => {
        if(response){
          //switch(response.status)
          this.router.navigate(['dashboard']);
        } else {
          this.loginInvalid = true
        }
      })
  }

  ngOnInit() {
    //Add the login-page class to the body
    //$('body').addClass(this.bodyClasses);
    this.body.classList.add(this.bodyClasses);   //add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });

  }

  ngOnDestroy() {
    //remove the login-page class to the body
    //$('body').removeClass(this.bodyClasses);
    this.body.classList.remove(this.bodyClasses);
  }



}
