import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector   : 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentHeaderComponent {
    constructor(
        private router: Router,
        private actRoute: ActivatedRoute    
    ) { }
    
    routeUrl: any;
    
    ngOnInit() {
        this.routeUrl = this.actRoute.snapshot.url
        console.log(this.router)
    }
        
}