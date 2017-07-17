import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './modules/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component'
import { SetPasswordComponent } from './components/set-password/set-password.component'

import { AuthGuard } from './gaurds/auth.guard'

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgotpassword', component: ForgetPasswordComponent},
      { path: 'set-password', component: SetPasswordComponent},
      { path: 'admin', component: AdminComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}