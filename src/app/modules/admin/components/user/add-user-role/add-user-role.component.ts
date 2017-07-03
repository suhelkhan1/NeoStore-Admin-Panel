import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UserService } from '../../../providers/user/user.service'

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));

  addUserRolesForm: FormGroup
  private user_role_name: FormControl
  isActive: boolean = true

  ngOnInit() {
    this.user_role_name = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ])


    this.addUserRolesForm = new FormGroup({
      user_role_name: this.user_role_name,
    })
  }

  addProductCategory(formValues, isActive){
    let productCategoryDetails = {
      user_role_name: formValues.user_role_name,
      category_isactive: this.isActive
    }
    
  }

}
