import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


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

  addProductForm: FormGroup
  private productCategory: FormControl
  private productName: FormControl
  private producer: FormControl
  private description: FormControl
  private cost: FormControl
  private stockin: FormControl
  private colour: FormControl
  private dimension: FormControl
  private material: FormControl

  ngOnInit() {
    //Add the login-page class to the body
    this.body.classList.add(this.bodyClasses);//add the class   

    this.icheck = jQuery("input").iCheck({
      checkboxClass: "icheckbox_square-blue",
      radioClass: "iradio_square-blue",
      increaseArea: "20%" // optional
    });

    this.productCategory = new FormControl('', [Validators.required])
    this.productName = new FormControl('', [Validators.required])
    this.producer = new FormControl('', [Validators.required])
    this.description = new FormControl('', [Validators.required])
    this.cost = new FormControl('', [Validators.required])
    this.stockin = new FormControl('', [Validators.required])
    this.colour = new FormControl('', [Validators.required])
    this.dimension = new FormControl('', [Validators.required])
    this.material = new FormControl('', [Validators.required])

    this.addProductForm = new FormGroup ({
      productName: this.productName,
      producer: this.producer,
      description: this.description,
      productCategory: this.productCategory,
      colour: this.colour,
      dimension: this.dimension,
      material: this.material,
      cost: this.cost,
      stockin: this.stockin
    })
  }

  addProduct(formValues){
    console.log(formValues)    
  }

  ngOnDestroy() {
    //remove the login-page class to the body
    this.body.classList.remove(this.bodyClasses);
  }

}
