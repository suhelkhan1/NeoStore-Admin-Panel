import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { OrderService } from '../../../providers/order/order.service'
import { IOrder } from '../../../interfaces/oder.model'


@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.css']
})
export class GetOrdersComponent implements OnInit {

  constructor(
    @Inject(JQ_TOKEN) private $ : any,
    private toastr : ToastsManager,
    public elementRef: ElementRef,
    private route : Router,
    private orderService: OrderService 
  ) { 
    this.elementRef = elementRef;
  }

  orders: IOrder

  ngOnInit() {
    this.getOrders()
  }

  getOrders(){
    this.orderService.getOrders().subscribe(
      (response: IOrder) => {
        this.orders = response
        return response
      },
      (error: Error) => {
        this.toastr.error(error['error'].statusCode, 'Error!')
        return error
      }
    )

    this.$(document).ready( ()=> {
      let el = this.$(this.elementRef.nativeElement).find("#ordersTable")[0];
      this.$(el).DataTable();
    })
  }

  deleteOrder(id){
    this.orderService.deleteOrder(id).subscribe(
      (response: IOrder) => {
        this.toastr.success('Successfully Deleted')
        this.getOrders()
        return response
      },
      (error: Error) => {
        this.toastr.error('Order is not deleted')
        return error
      }
    )
  }

  veiwClickListner(id){
    this.route.navigate(['admin/getorder/', id])
  }

  editClickListner(id){
    this.route.navigate(['admin/updateorder/', id])
  }

}
