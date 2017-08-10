import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ProductService } from '../../../providers/product/product.service'
import { IProductCategory } from '../../../interfaces/product.model'

@Component({
  selector: 'app-view-product-category',
  templateUrl: './view-product-category.component.html',
  styleUrls: ['./view-product-category.component.css']
})
export class ViewProductCategoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  productCategory: IProductCategory

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getProductCategory(id)
    })
  }

  getProductCategory(id){
    this.productService.getProductCategory(id).subscribe( 
      (response: IProductCategory) => {
        this.productCategory = response
        return response
      },
      (error: any) => error
    )
  }

}
