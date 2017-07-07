import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { ProductService } from '../../../providers/product/product.service'
import { IProduct } from '../../../interfaces/product.model'

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastsManager,
    private productService: ProductService
  ) { }

  product: IProduct
  
  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProduct(id)
    })
  }

  getProduct(id){
    this.productService.getProduct(id).subscribe( 
      (response: IProduct)=>{
        this.product = response
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

}
