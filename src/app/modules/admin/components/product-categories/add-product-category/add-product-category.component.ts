import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { ProductService } from '../../../providers/product/product.service'

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }
  userToken: string = JSON.parse(localStorage.getItem('currentUser'));

  addProductCategoryForm: FormGroup
  private category_name: FormControl
  private category_description: FormControl
  isActive: boolean = true

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

  addProductCategory(formValues, isActive){
    let productCategoryDetails = {
      category_name: formValues.category_name,
      category_description: formValues.category_description,
      category_isactive: this.isActive
    }
    this.productService.addProductCategory(productCategoryDetails).subscribe( data => data )
  }

}
