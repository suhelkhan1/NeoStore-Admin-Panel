import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { UserService } from '../../../providers/user/user.service'


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bodyClasses:string = "update-user-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;
  constructor(
    private userService : UserService,
    private route: ActivatedRoute
  ) { }
  user: any
  updateUserForm: FormGroup
  private id: FormControl
  private first_name: FormControl
  private last_name: FormControl
  private email: FormControl
  private phone_no: FormControl
  private birth_date: FormControl

  ngOnInit() {
    this.body.classList.add(this.bodyClasses);   //add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });

    this.route.params.subscribe( (params: Params) => {
      this.userService.getUser(params['id']).subscribe( (response) =>{
        this.user = response
        this.updateUserValidation(this.user)
      })
    })
  }

  updateUserValidation(user){
    this.id = new FormControl(this.user.id, [Validators.required, Validators.minLength(20)])
    this.first_name = new FormControl(this.user.first_name, [Validators.required, Validators.maxLength(20)])
    this.last_name = new FormControl(this.user.last_name, [Validators.required, Validators.maxLength(20)])
    this.email = new FormControl(this.user.email, [Validators.required, Validators.email])
    this.phone_no = new FormControl(this.user.phone_no , [Validators.required, Validators.maxLength(12)])
    this.birth_date = new FormControl(this.user.birth_date,Validators.required)

    this.updateUserForm = new FormGroup ({
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_no: this.phone_no,
      birth_date: this.birth_date
    })
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
