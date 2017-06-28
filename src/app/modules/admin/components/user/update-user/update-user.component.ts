import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../../../providers/user/user.service'


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  bodyClasses:string = "add-user-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;
  constructor(
    private userService : UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.body.classList.add(this.bodyClasses);   //add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });

    this.route.params.subscribe( (params: Params) => {
      this.userService.updateUser(+params['id']).subscribe( data => data)
    } )
  }

  ngOnDestroy() {
    this.body.classList.remove(this.bodyClasses);
  }

}
