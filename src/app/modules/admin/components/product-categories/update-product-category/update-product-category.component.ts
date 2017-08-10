import { Component, OnInit, Inject, ViewContainerRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ProductService } from '../../../providers/product/product.service'
import { ImageService } from '../../../providers/image/image.service'
import { IProductCategory } from '../../../interfaces/product.model'

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css']
})
export class UpdateProductCategoryComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private toastr: ToastsManager
  ) {
  }
  
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));
  productCategory: any
  productCatImages: any

  updateProductCategoryForm: FormGroup
  private category_name: FormControl
  private category_description: FormControl
  private fileLabel: FormControl

  ngOnInit() {

    this.category_name = new FormControl('', Validators.required)
    this.category_description =  new FormControl('', Validators.required)
    this.fileLabel =  new FormControl('No file choosen')

    this.updateProductCategoryForm = new FormGroup({
      category_name: this.category_name,
      category_description: this.category_description,
      fileLabel: this.fileLabel
    })

    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProductCategory(id)  
    })
  }

  getProductCategory(id){
    this.productService.getProductCategory(id).subscribe( 
      (productCategory: IProductCategory) => {
        this.productCatImages = productCategory.images
        this.polpulateUpdateProductCategoryForm(productCategory)
        return productCategory
      },
      (error: any) => error
    )
  }

  polpulateUpdateProductCategoryForm(productCategory: IProductCategory){
    if (this.updateProductCategoryForm) {
        this.updateProductCategoryForm.reset();
    }

    this.productCategory = productCategory

    this.updateProductCategoryForm.patchValue({
      category_name: this.productCategory.category_name,
      category_description: this.productCategory.category_description,
      fileLabel: 'No file choosen'
    })
  }

  updateProductCategory(formValues){
    let productCategoryDetails = {
      id: this.productCategory.id,
      category_name: formValues.category_name,
      category_description: formValues.category_description,
      category_isactive: true
    }
    this.productService.updateProductCategory(productCategoryDetails).subscribe(
      (response)=>{
        this.toastr.success('Product category is updated!', 'Success!')
        this.fileUploadEvent()
        this.router.navigate(['/admin/getproductcategories']);
        return response
      },
      (error : Error) => {
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
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
      productCatId: this.productCategory.id
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
