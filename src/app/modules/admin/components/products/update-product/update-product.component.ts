import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from'@angular/router'
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { ImageService } from '../../../providers/image/image.service'
import { ColorService } from './../../../providers/color/color.service';
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'

//Models for Product and Product Category 
import { IProduct, IProductImage, IProductCategory } from '../../../interfaces/product.model'


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    @Inject(JQ_TOKEN) private $: any
  ) { }

  product: IProduct
  productCategories: IProductCategory
  productImages: any
  showImage: boolean = true
  colors
  currentColor

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
  private fileLabel: FormControl

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
    this.colour = new FormControl({value:'', disabled: true}, [Validators.required])
    this.dimension = new FormControl('', [Validators.required])
    this.material = new FormControl('', [Validators.required])
    this.fileLabel = new FormControl('')

    this.updateProductForm = new FormGroup ({
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

    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProduct(id)  
    })

    this.productService.getProductCategories().subscribe(
      response => this.productCategories = response,
      error => error
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

  getProduct(id){
    this.productService.getProduct(id).subscribe(
      (response: IProduct)=>{
        this.polpulateupdateProductForm(response)
        this.productImages = response.images
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
      colour: this.product.product_color.color_code,
      dimension: this.product.product_dimension,
      material: this.product.product_material,
      cost: this.product.product_cost,
      stockin: this.product.product_stock,
      fileLabel: 'No file choosen'
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
      product_isactive: true,
    }

    this.productService.updateProduct(productDetails).subscribe(
      (response)=>{
        this.fileUploadEvent()
        this.toastr.success('Product is updated!', 'Success!')
        this.router.navigate(['/admin/getproducts']);
      },
      (error : Error) => {
        this.toastr.error(error['error'].statusCode, 'Error!')
        throw error
      })
    }

  hasImage: boolean = false
  numFiles: number
  file: File

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
      file: this.file,
      productId: this.product.id
    }
    if(imageInfo.file){
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
  }

}
