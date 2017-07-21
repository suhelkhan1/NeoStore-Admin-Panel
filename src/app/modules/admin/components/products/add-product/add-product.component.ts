import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from'@angular/router'
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { IProduct, IProductCategory } from '../../../interfaces/product.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ImageUploadService } from '../../../providers/image-upload/image-upload.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  bodyClasses:string ="add-product-page";
  body = document.getElementsByTagName('body')[0];
  icheck: JQuery;

  constructor(
    private productService: ProductService,
    private toastr: ToastsManager,
    private router: Router,
    private imageUploadService: ImageUploadService,
    @Inject(JQ_TOKEN) private $: any
  ) { }

  productCategories: IProductCategory

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

    this.$(document).ready( ()=>{
      this.$('input').iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" // optional
      })
    })

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

    this.productService.getProductCategories().subscribe(
      (response: IProductCategory)=>{
        this.productCategories = response
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

  
  
  addProduct(formValues){
    let productDetails = {
     product_name: formValues.productName,
     categoryId: formValues.productCategory,
     product_producer: formValues.producer,
     product_description: formValues.description,
     product_cost: formValues.cost,
     product_stock: formValues.stockin,
     product_color: formValues.colour,
     product_dimension: formValues.dimension,
     product_material: formValues.material,
     product_isactive: true,
     product_img : []
    }
    this.productService.addProduct(productDetails).subscribe(
      (response: IProduct)=>{
        this.toastr.success('Product Added', 'Success!')
        this.imageUploadService.insertData(response.id)
        this.imageUploadService.uploadImage()
        this.router.navigate(['/admin/getproducts'])
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

  ngOnDestroy() {
    //remove the login-page class to the body
    this.body.classList.remove(this.bodyClasses);
  }

}
