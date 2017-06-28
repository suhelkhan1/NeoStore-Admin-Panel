import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../providers/auth/auth.service'
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // logged in so return true
            return true;
            /*this.authService.getUserDetails(currentUser).subscribe(response => {
                console.log('Auth Gaurd', response);
                if(response){
                    return true
                }
            })*/
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return window.confirm("Please Login First"), false
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      return this.canActivate(route, state);
    }
}