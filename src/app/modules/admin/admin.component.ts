import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  //bodyClasses: string = 'skin-blue fixed sidebar-mini sidebar-mini-expand-feature';
  body = document.getElementsByTagName('body')[0];
  
  constructor() { }

  ngOnInit() {
    //add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('fixed');
    this.body.classList.add('sidebar-mini');
    this.body.classList.add('sidebar-mini-expand-feature');
  }

   ngOnDestroy() {
    //remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('fixed');
    this.body.classList.remove('sidebar-mini');
    this.body.classList.remove('sidebar-mini-expand-feature');
  }
}
