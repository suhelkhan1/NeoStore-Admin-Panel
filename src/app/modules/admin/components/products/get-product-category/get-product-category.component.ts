import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ProductService } from '../../../providers/product/product.service'

@Component({
  selector: 'app-get-product-category',
  templateUrl: './get-product-category.component.html',
  styleUrls: ['./get-product-category.component.css']
})
export class GetProductCategoryComponent implements OnInit {

  constructor(
    @Inject(JQ_TOKEN) private $ : any,
    public elementRef: ElementRef,
    private productService : ProductService,
    private route : Router 
  ) { 
    this.elementRef = elementRef;
  }
  productCategories: any

  getProducts(){
    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#productCategoryTable")[0];
      this.$(el).DataTable();
    })
  }
  editClickListner(product){
    this.route.navigate(['admin/updateProductCategory/', product.id])
  }
  ngOnInit() {
    this.productService.getProductCategories().subscribe( (response) => {
      this.productCategories = response
      this.getProducts()
    });  
  }

}
