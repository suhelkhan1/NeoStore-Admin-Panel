import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ToastsManager } from 'ng2-toastr'
import { CartService } from '../../../providers/cart/cart.service'
import { ICart } from '../../../interfaces/cart.model'

@Component({
  selector: 'app-get-cart',
  templateUrl: './get-cart.component.html',
  styleUrls: ['./get-cart.component.css']
})
export class GetCartComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastsManager,
    private cartService: CartService
  ) { }

  cart: ICart
  
  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => {
      let id = params['id'];
      this.getCart(id)
    })
  }

  getCart(id){
    this.cartService.getcart(id).subscribe( 
      (response: ICart)=>{
        this.cart = response
        return response
      },
      (error: Error)=>{
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )
  }

}
