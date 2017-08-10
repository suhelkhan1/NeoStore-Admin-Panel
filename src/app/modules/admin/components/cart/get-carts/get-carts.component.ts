import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { CartService } from '../../../providers/cart/cart.service'
import { ICart } from '../../../interfaces/cart.model'

@Component({
  selector: 'app-get-carts',
  templateUrl: './get-carts.component.html',
  styleUrls: ['./get-carts.component.css']
})
export class GetCartsComponent implements OnInit {

  constructor(
    @Inject(JQ_TOKEN) private $ : any,
    private toastr : ToastsManager,
    public elementRef: ElementRef,
    private route : Router,
    private cartService: CartService 
  ) { 
    this.elementRef = elementRef;
  }

  carts: ICart

  ngOnInit() {
    this.getCarts()
  }

  getCarts(){
    this.cartService.getcarts().subscribe(
      (response: ICart) => {
        this.carts = response
        return response
      },
      (error: Error) => {
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )

    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#cartsTable")[0];
      this.$(el).DataTable();
    })
  }

  deleteCart(id){
    this.cartService.deletecart(id).subscribe(
      (response: ICart) => {
        this.toastr.success('Successfully Deleted')
        this.getCarts()
        return response
      },
      (error: Error) => {
        this.toastr.error('Cart is not deleted')
        return error
      }
    )
  }

  veiwClickListner(id){
    this.route.navigate(['admin/getcart/', id])
  }

  editClickListner(id){
    this.route.navigate(['admin/updatecart/', id])
  }

}
