import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ProductService } from '../../../providers/product/product.service'

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

   constructor(
    @Inject(JQ_TOKEN) private $ : any,
    public elementRef: ElementRef,
    private productService : ProductService,
    private route : Router 
  ) { 
    this.elementRef = elementRef;
  }
  products: any

  getProducts(){
    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#productsTable")[0];
      this.$(el).DataTable();
    })
  }
  editClickListner(product){
    this.route.navigate(['admin/updateuser/', product.id])
  }
  ngOnInit() {
    this.productService.getProductDetails().subscribe( 
      (response) => {
        this.products = response
        this.getProducts()
      },
      (error) => {
        console.log(error)
        return error
      }
    );  
  }

}
