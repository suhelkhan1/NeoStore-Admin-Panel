import { Component, OnInit, Inject, ViewContainerRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ProductService } from '../../../providers/product/product.service'
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
    private toastr: ToastsManager
  ) {
  }
  
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));
  productCategory: any

  updateProductCategoryForm: FormGroup
  private category_name: FormControl
  private category_description: FormControl

  ngOnInit() {

    this.category_name = new FormControl('', Validators.required)
    this.category_description =  new FormControl('', Validators.required)
    
    this.updateProductCategoryForm = new FormGroup({
      category_name: this.category_name,
      category_description: this.category_description
    })

    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProductCategory(id)  
    })
  }

  getProductCategory(id){
    this.productService.getProductCategory(id).subscribe( 
      (productCategory: IProductCategory) => this.polpulateUpdateProductCategoryForm(productCategory),
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
      category_description: this.productCategory.category_description
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
      this.toastr.success('Product category is updated!', 'Success!', {dismiss: 'auto'})
        .then((toast: Toast) => {
            setTimeout(() => {
                this.router.navigate(['/admin/getproductcategories']);
            }, 500);
        });
    },
    (error : Error) => {
      this.toastr.error(error['error'].statusCode, 'Error!')
      throw error
    })
  }

}
