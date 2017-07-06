import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
//import { IUrlTree } from '../../../interfaces/url-tree.model'

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
    ) {}
    
    title: string = this.actRoute.snapshot.data["breadcrumb"]
    routeUrls: any;
    
    ngOnInit() {
        this.routeUrls = this.router.url.split("/").splice(1)
        //console.log(this.routeUrls)
    }    
}