import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from'@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
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
    private router: Router   
  ) { }
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));

  addProductCategoryForm: FormGroup
  private category_name: FormControl
  private category_description: FormControl

  ngOnInit() {
    this.category_name = new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ])
    this.category_description = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])

    this.addProductCategoryForm = new FormGroup({
      category_name: this.category_name,
      category_description: this.category_description
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

}
