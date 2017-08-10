import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastsManager } from 'ng2-toastr'
import 'rxjs/add/operator/first';

import { AuthService } from '../providers/auth/auth.service'
import { UserService } from '../modules/admin/providers/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router, 
        private authService: AuthService,
        private userService: UserService,
        private toastr: ToastsManager
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
        if (currentUser && currentUserId) {
           return true
        } 

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return this.toastr.error('Login first','Access Denied!'), false
   
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      return this.canActivate(route, state);
    }

}