import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from'@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { ImageService } from '../../../providers/image/image.service'
import { IProductCategory } from '../../../interfaces/product.model'

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastr: ToastsManager ,
    private router: Router   ,
    private imageService: ImageService
  ) { }
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));

  addProductCategoryForm: FormGroup
  private category_name: FormControl
  private category_description: FormControl
  private fileLabel: FormControl

  ngOnInit() {
    this.category_name = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ])
    this.category_description = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
    this.fileLabel = new FormControl('No file choosen')

    this.addProductCategoryForm = new FormGroup({
      category_name: this.category_name,
      category_description: this.category_description,
      fileLabel: this.fileLabel
    })
  }

  addProductCategory(formValues){
    let productCategoryDetails = {
      category_name: formValues.category_name,
      category_description: formValues.category_description,
      category_isactive: true
    }
    this.productService.addProductCategory(productCategoryDetails).subscribe(
      (response: IProductCategory)=>{
        this.productCatId = response.id
        this.fileUploadEvent()
        this.toastr.success('Product Added', 'Success!')
        this.router.navigate(['/admin/getproductcategories'])
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

  hasImage: boolean = false
  numFiles: number
  file: File
  productCatId: string

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
      productCatId: this.productCatId
    }
    this.imageService.imageUploadProductCategory(imageInfo).subscribe(
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
