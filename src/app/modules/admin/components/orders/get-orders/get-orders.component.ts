import { Component, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { JQ_TOKEN } from '../../../providers/jquery/jquery.service'
import { ProductService } from '../../../providers/product/product.service'
import {  } from '../../../interfaces/'


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
    private route : Router 
  ) { 
    this.elementRef = elementRef;
  }

  ngOnInit() {
  }

}
