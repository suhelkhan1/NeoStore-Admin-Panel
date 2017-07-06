import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ProductService } from '../../../providers/product/product.service'
import { IProduct } from '../../../interfaces/product.model'

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
    private route : Router ,
    private toastr: ToastsManager
  ) { 
    this.elementRef = elementRef;
  }
  products: any

  ngOnInit() {
    this.productService.getProductDetails().subscribe( 
      (response: IProduct) => {
        this.products = response
        this.getProducts()
      },
      (error) => {
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    );  
  }
  getProducts(){
    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#productsTable")[0];
      this.$(el).DataTable();
    })
  }

  /*deleteProductCategory(productCategory){
    this.productService.deleteProductCategory(productCategory.id).subscribe(
      (response: IProduct) => {
        this.toastr.success('Successfully Deleted')
        this.getProducts()
        return response
      },
      (error: Error) => {
        this.toastr.error('Product Category is not deleted')
        return error
      }
    )
  }*/

  veiwClickListner(product){
    this.route.navigate(['admin/getproduct/', product.id])
  }

  editClickListner(product){
    this.route.navigate(['admin/updateproduct/', product.id])
  }

}
