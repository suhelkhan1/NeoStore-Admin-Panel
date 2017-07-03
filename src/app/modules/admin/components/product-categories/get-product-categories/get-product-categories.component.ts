import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { TOASTR_TOKEN, Toastr } from '../../../providers/toastr/toastr.service'
import { ProductService } from '../../../providers/product/product.service'
import { IProductCategory } from '../../../interfaces/product.model'

@Component({
  selector: 'app-get-product-category',
  templateUrl: './get-product-categories.component.html',
  styleUrls: ['./get-product-categories.component.css']
})
export class GetProductCategoriesComponent implements OnInit {

  constructor(
    @Inject(JQ_TOKEN) private $ : any,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    public elementRef: ElementRef,
    private productService : ProductService,
    private route : Router 
  ) { 
    this.elementRef = elementRef;
  }
  productCategories: any

  getProducts(){
    this.productService.getProductCategories().subscribe( (response) => {
      this.productCategories = response
    }); 

    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#productCategoryTable")[0];
      this.$(el).DataTable();
    })
  }

  deleteProductCategory(productCategory){
    this.productService.deleteProductCategory(productCategory.id).subscribe(
      (response: IProductCategory) => {
        this.toastr.success('Successfully Deleted')
        this.getProducts()
        return response
      },
      (error: Error) => {
        this.toastr.error('Product Category is not deleted')
        return error
      }
    )
  }
  veiwClickListner(productCategory){
    this.route.navigate(['admin/viewproductcategory/', productCategory.id])
  }
  editClickListner(productCategory){
    this.route.navigate(['admin/updateproductcategory/', productCategory.id])
  }

  ngOnInit() {
    this.productService.getProductCategories().subscribe( (response) => {
      this.productCategories = response
      this.getProducts()
    });  
  }

}
