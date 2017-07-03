import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ProductService } from '../../../providers/product/product.service'
import { IProductCategory } from '../../../interfaces/product.model'
import { TOASTR_TOKEN, Toastr } from '../../../providers/toastr/toastr.service'

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
    private fb : FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) { }
  
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
    this.productService.updateProductCategory(productCategoryDetails).subscribe(()=>{
      this.toastr.success('Product category is updated succesfully')
      this.router.navigate(['/admin/getproductcategories'])
    })
  }

}
