import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { UserService } from '../../../providers/user/user.service'
import { IUser } from '../../../interfaces/user.model'

@Component({
  selector: 'app-get-users',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastsManager,
    private userService: UserService
  ) { }

  user: IUser
  dateOfBirth: any
  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getUser(id)
    })
  }

  getUser(id){
    this.userService.getUser(id).subscribe( 
      (response: IUser)=>{
        this.user = response
        this.dateOfBirth = new Date(this.user.birth_date).toDateString()
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

}
