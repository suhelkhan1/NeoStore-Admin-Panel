import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { UserService } from '../../../providers/user/user.service'
@Component({
  selector: 'app-get-user',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
  //private element: HTMLElement;

  constructor(
    @Inject(JQ_TOKEN) private $ : any,
    public elementRef: ElementRef,
    private userService : UserService,
    private route : Router 
  ) { 
    this.elementRef = elementRef;
  }
  users: any

  getUser(){
    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#userTable")[0];
      this.$(el).DataTable({
        "lengthMenu": [ [2, 4, 8, -1], [2, 4, 8, "All"] ],
        "pageLength": 4
      });
    })
  }
  viewClickListner(user){
     this.route.navigate(['admin/getuser/', user.id])
  }
  editClickListner(user){
    this.route.navigate(['admin/updateuser/', user.id])
  }
  ngOnInit() {
    this.userService.getUsers().subscribe( (response) => {
      this.users = response
      this.getUser()
    });

    
  }

}
