import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from'@angular/router'
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { IProduct } from '../../../interfaces/product.model'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(JQ_TOKEN) private $: any
  ) { }

  product: IProduct

  updateProductForm: FormGroup
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

    this.updateProductForm = new FormGroup ({
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

    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProduct(id)  
    })
  }

  getProduct(id){
    this.productService.getProduct(id).subscribe(
      (response: IProduct)=>{
        this.polpulateupdateProductForm(response)
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

  polpulateupdateProductForm(product: IProduct){
    if (this.updateProductForm) {
        this.updateProductForm.reset();
    }

    this.product = product

    this.updateProductForm.patchValue({
      productName: this.product.product_name,
      producer: this.product.product_producer,
      description: this.product.product_description,
      productCategory: this.product.categoryId,
      colour: this.product.product_color,
      dimension: this.product.product_dimension,
      material: this.product.product_material,
      cost: this.product.product_cost,
      stockin: this.product.product_stock
    })
  }

  updateProduct(formValues){
    let productDetails = {
      id: this.product.id,
      product_name: formValues.productName,
      categoryId: formValues.productCategory,
      product_producer: formValues.producer,
      product_description: formValues.description,
      product_cost: formValues.cost,
      product_stock: formValues.stockin,
      product_color: formValues.colour,
      product_dimension: formValues.dimension,
      product_material: formValues.material,
    }

    this.productService.updateProduct(productDetails).subscribe(
      (response)=>{
      this.toastr.success('Product is updated!', 'Success!')
      this.router.navigate(['/admin/getproducts']);
    },
    (error : Error) => {
      this.toastr.error(error['error'].statusCode, 'Error!')
      throw error
    })
  }

}
