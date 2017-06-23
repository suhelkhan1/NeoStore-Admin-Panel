import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  bodyClasses:string = "add-user-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  constructor() { }


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
