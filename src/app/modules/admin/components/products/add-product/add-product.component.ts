import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from'@angular/router'
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { IProduct, IProductCategory } from '../../../interfaces/product.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ImageService } from '../../../providers/image/image.service'
import { ColorService } from '../../../providers/color/color.service'

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
    private imageService: ImageService,
    private colorService: ColorService,
    @Inject(JQ_TOKEN) private $: any
  ) { }

  productCategories: IProductCategory
  colors

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
  private fileLabel: FormControl

  hasImage: boolean = false
  file: File
  productId: string
  numFiles: number
  currentColor

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
    this.colour = new FormControl({value:'', disabled: true}, [Validators.required])
    this.dimension = new FormControl('', [Validators.required])
    this.material = new FormControl('', [Validators.required])
    this.fileLabel = new FormControl('No file choosen')

    this.addProductForm = new FormGroup ({
      productName: this.productName,
      producer: this.producer,
      description: this.description,
      productCategory: this.productCategory,
      colour: this.colour,
      dimension: this.dimension,
      material: this.material,
      cost: this.cost,
      stockin: this.stockin,
      fileLabel: this.fileLabel
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

    this.colorService.getColors().subscribe(
      (response)=>{
        this.colors = response
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )

  }

  setColor(color){
    this.colour.setValue(color.color_code)
    this.currentColor = color
  }

  
  
  addProduct(formValues){
    let productDetails = {
     product_name: formValues.productName,
     categoryId: formValues.productCategory,
     product_producer: formValues.producer,
     product_description: formValues.description,
     product_cost: formValues.cost,
     product_stock: formValues.stockin,
     product_color: this.currentColor,
     product_dimension: formValues.dimension,
     product_material: formValues.material,
     product_isactive: true
    }
    this.productService.addProduct(productDetails).subscribe(
      (response: IProduct)=>{
        this.productId = response.id
        this.fileUploadEvent()
        this.toastr.success('Product Added', 'Success!')
        this.router.navigate(['/admin/getproducts'])
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
    console.log(productDetails)
  }

  fileEvent(event){
    this.hasImage = true
    let inputFile = event
    this.numFiles = inputFile.currentTarget.files.length
    this.file = inputFile.target.files[0]
    let label = inputFile.currentTarget.value.replace(/^.*[\\\/]/, '');
    if(this.numFiles === 0){
      this.hasImage = false
      this.fileLabel.setValue('No file choosen')
    } else if(this.numFiles > 1 && this.numFiles !== 0){
        this.fileLabel.setValue(this.numFiles + ' files')
    } else {
        this.fileLabel.setValue(label)
    }
  }

  fileUploadEvent(){
    let imageInfo = {
      file : this.file,
      productId: this.productId
    }
    //console.log('Before',imageInfo)
    this.imageService.imageUploadProduct(imageInfo).subscribe(
      (response) =>{
        this.toastr.success('Image Uploaded', 'Success!')
        return response
      },
      (error: Error) =>{
        this.toastr.error('Image Upload Failed', 'Error!')
        return error
      }
    )
  }

  ngOnDestroy() {
    //remove the login-page class to the body
    this.body.classList.remove(this.bodyClasses);
  }

}
