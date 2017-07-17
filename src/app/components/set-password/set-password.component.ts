import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute }   from '@angular/router';
import { ToastsManager } from 'ng2-toastr'

import { AuthService } from '../../providers/auth/auth.service'
import { EqualValidatorDirective } from '../../modules/admin/directives/equal-validator/equal-validator.directive'

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastr: ToastsManager
  ) { }

  setPasswordForm: FormGroup
  password: FormControl
  confirmPassword: FormControl

  ngOnInit() {
    this.password = new FormControl('', [
      Validators.required
    ])
    this.confirmPassword = new FormControl('', [
      Validators.required
    ])

    this.setPasswordForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    })
  }

  setPassword(formValues){
    let setInfo ={
      password: formValues.password,
      token: this.actRoute.snapshot.queryParams.access_token
    }
    this.authService.setPassword(setInfo).subscribe(
      (response)=>{
        this.toastr.success('Please login to continue', 'Password is successfully changed', {dismiss: 'click'})
        this.router.navigate(['login'])
        return response
      },
      (error: Error)=>{
        this.toastr.error('Error')
        return error
      }
    )
  }

}
