import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  bodyClasses:string = "add-product-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  constructor() { }
  ngOnInit() {
    //Add the login-page class to the body
    this.body.classList.add(this.bodyClasses);//add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });
  }

  addUser(formValues){
    console.log(formValues)    
  }

  ngOnDestroy() {
    //remove the login-page class to the body
    this.body.classList.remove(this.bodyClasses);
  }

}
