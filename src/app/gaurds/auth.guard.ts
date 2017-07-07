import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/first';
import { ToastsManager } from 'ng2-toastr'

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
        /*if (currentUser && currentUserId) {
            this.userService.getUser(currentUserId).subscribe(
                (response) => {
                    return true
                },
                (error: Error) => {
                    this.toastr.warning('Access Denied')
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                    return false
                }
            )
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return this.toastr.warning('Login first','Access Denied!'), false
        }*/
        if(currentUser && currentUserId){
            return true
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return this.toastr.warning('Login first','Access Denied!'), false
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      return this.canActivate(route, state);
    }
}