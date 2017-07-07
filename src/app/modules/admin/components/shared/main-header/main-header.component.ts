import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { AuthService } from '../../../../../providers/auth/auth.service'
import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'

@Component({
  selector: 'admin-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router
    ) { }

  
  userProfile: IUser

  ngOnInit() {
    this.userService.getUserDetails().subscribe(
      (response: IUser) => {
        this.userProfile = response
      },
      (error: Error) => {
        return error
      }
    )
  }

  profileClickListner(){
    this.router.navigate(['/admin/updateuser/', this.userProfile.id])
  }

  logout(){
    this.authService.logout().subscribe(
      (response) => {
        this.toastr.success('Logged Out', 'Success!')
        this.router.navigate(['login'])
        return response
      },
      (error)=>{
        return error
      }
    )
  }

}
